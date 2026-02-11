from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import json
import os

app = Flask(__name__)
# Allow CORS for all domains to prevent blocking
CORS(app, resources={r"/*": {"origins": "*"}})

# Get the absolute path to the project root
# This fixes the "File Not Found" errors
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(CURRENT_DIR, '../../data')

print(f"Server starting...")
print(f"Looking for data in: {os.path.abspath(DATA_DIR)}")

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"status": "API is running", "service": "Birhan Energies Analysis"})

@app.route('/api/metrics', methods=['GET'])
def get_metrics():
    try:
        file_path = os.path.join(DATA_DIR, 'model_results.json')
        if not os.path.exists(file_path):
            return jsonify({"error": f"File not found: {file_path}"}), 404
            
        with open(file_path, 'r') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/data', methods=['GET'])
def get_data():
    try:
        file_path = os.path.join(DATA_DIR, 'BrentOilPrices.csv')
        if not os.path.exists(file_path):
            print(f"ERROR: Could not find CSV at {file_path}")
            return jsonify({"error": "CSV file not found"}), 404

        # Read the CSV
        df = pd.read_csv(file_path)
        
        # FIX: Ensure Date parsing works for Mixed formats
        df['Date'] = pd.to_datetime(df['Date'], format='mixed')
        
        # Filter for the 2019-2021 window
        mask = (df['Date'] >= '2019-01-01') & (df['Date'] <= '2021-04-30')
        filtered_df = df.loc[mask].copy()
        
        # Convert date to string for JSON
        filtered_df['Date'] = filtered_df['Date'].dt.strftime('%Y-%m-%d')
        
        # Return records
        return jsonify(filtered_df.to_dict(orient='records'))
    except Exception as e:
        print(f"SERVER ERROR: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # use_reloader=False STOPS the infinite restart loop
    app.run(debug=True, port=5000, use_reloader=False)