import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Components
import KpiCard from './components/KpiCard';
import PriceChart from './components/PriceChart';
import EventList from './components/EventList';

function App() {
  const [prices, setPrices] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [priceRes, metricRes] = await Promise.all([
          axios.get('http://127.0.0.1:5000/api/data'),
          axios.get('http://127.0.0.1:5000/api/metrics')
        ]);
        setPrices(priceRes.data);
        setMetrics(metricRes.data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to load analysis. Check Flask server.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-5 text-primary">Loading Birhan Energies Analytics...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;

  return (
    <div className="d-flex" style={{ backgroundColor: "#f8f9fc", minHeight: "100vh" }}>

      {/* Sidebar (Visual only) */}
      <div className="d-none d-md-block bg-dark text-white p-3" style={{ width: "250px" }}>
        <h4 className="fw-bold mb-4 text-primary">Birhan<span className="text-white">Energies</span></h4>
        <ul className="nav flex-column gap-2">
          <li className="nav-item p-2 bg-primary rounded">📊 Dashboard</li>
          <li className="nav-item p-2 text-white-50">📁 Data Sources</li>
          <li className="nav-item p-2 text-white-50">⚙️ Settings</li>
        </ul>
        <div className="mt-5 p-3 bg-secondary rounded bg-opacity-25">
          <small className="text-white-50">Analyst Mode</small>
          <div className="fw-bold">Eyu Birhanu</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-dark fw-bold">Market Intelligence Dashboard</h2>
          <button className="btn btn-primary shadow-sm">📥 Export Report</button>
        </div>

        {/* KPI Cards */}
        {metrics && (
          <div className="row mb-4">
            <KpiCard title="Detected Change Date" value={metrics.detected_date} />
            <KpiCard title="Avg Price (Pre-Shock)" value={`$${metrics.price_before.toFixed(2)}`} />
            <KpiCard title="Avg Price (Post-Shock)" value={`$${metrics.price_after.toFixed(2)}`} />
            <KpiCard title="Market Volatility Impact" value={metrics.percent_change.toFixed(2)} isPercentage={true} />
          </div>
        )}

        {/* Main Grid: Chart + Events */}
        <div className="row">
          <div className="col-lg-8">
            {/* The Pro Chart */}
            <PriceChart data={prices} detectedDate={metrics?.detected_date} />

            {/* Automated Insight */}
            <div className="alert alert-light border-left-primary shadow-sm">
              <h5 className="alert-heading text-primary fw-bold">🤖 Model Insight</h5>
              <p className="mb-0">
                The Bayesian model detected a structural break on <strong>{metrics?.detected_date}</strong>.
                This indicates a shift from a stable regime (Mean: ${metrics?.price_before.toFixed(2)})
                to a volatile regime (Mean: ${metrics?.price_after.toFixed(2)}), driven by external shocks.
              </p>
            </div>
          </div>

          <div className="col-lg-4">
            {/* The Event List */}
            <EventList />

            {/* Extra Widget */}
            <div className="card shadow mt-4">
              <div className="card-body">
                <h6 className="fw-bold text-uppercase text-muted small">Recommendation</h6>
                <h4 className="text-danger fw-bold">High Risk</h4>
                <p className="small text-muted">Current volatility suggests holding off on long-term futures contracts until stability returns.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;