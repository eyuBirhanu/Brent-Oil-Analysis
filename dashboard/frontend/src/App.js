import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import our new components
import KpiCard from './components/KpiCard';
import PriceChart from './components/PriceChart';

function App() {
  const [prices, setPrices] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both endpoints in parallel
        const [priceRes, metricRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/data'),
          axios.get('http://127.0.0.1:5000/api/metrics')
        ]);

        setPrices(priceRes.data);
        setMetrics(metricRes.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load analysis data. Is the Flask server running?");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading State
  if (loading) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  // Error State
  if (error) return (
    <div className="alert alert-danger m-5 text-center">
      {error}
    </div>
  );

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Header */}
      <div className="row mb-5">
        <div className="col-12">
          <h2 className="text-dark fw-bold border-bottom pb-3">
            Birhan Energies <span className="text-primary">Dashboard</span>
          </h2>
        </div>
      </div>

      {/* KPI Section - Using our new Component! */}
      {metrics && (
        <div className="row">
          <KpiCard title="Detected Change Date" value={metrics.detected_date} />
          <KpiCard title="Avg Price Before" value={`$${metrics.price_before.toFixed(2)}`} />
          <KpiCard title="Avg Price After" value={`$${metrics.price_after.toFixed(2)}`} />
          <KpiCard title="Market Impact" value={metrics.percent_change.toFixed(2)} isPercentage={true} />
        </div>
      )}

      {/* Chart Section - Using our new Component! */}
      <div className="row">
        <div className="col-12">
          <PriceChart data={prices} detectedDate={metrics?.detected_date} />
        </div>
      </div>

      {/* Insight Section */}
      <div className="row mt-3">
        <div className="col-12">
          <div className="card border-left-info shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-info">💡 Executive Summary</h5>
              <p className="card-text text-secondary">
                The Bayesian Change Point analysis has identified a statistically significant structural break
                on <strong>{metrics?.detected_date}</strong>. This event correlates with a
                <strong> {metrics?.percent_change.toFixed(1)}%</strong> shift in market valuation,
                suggesting a fundamental regime change rather than transient volatility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;