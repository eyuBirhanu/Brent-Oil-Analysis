import React from 'react';

const events = [
    { date: "2020-01-01", event: "COVID-19 Outbreak Begins", type: "Health" },
    { date: "2020-03-08", event: "Saudi-Russia Price War", type: "Geopolitical" },
    { date: "2020-03-09", event: "Black Monday (Oil Crash)", type: "Market" },
    { date: "2020-04-20", event: "Negative Oil Prices (WTI)", type: "Market" },
    { date: "2021-02-24", event: "Russia Invades Ukraine", type: "Conflict" }
];

const EventList = () => {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 bg-white">
                <h6 className="m-0 font-weight-bold text-primary">Key Historical Events</h6>
            </div>
            <div className="card-body p-0">
                <ul className="list-group list-group-flush">
                    {events.map((e, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <small className="text-muted d-block">{e.date}</small>
                                <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{e.event}</span>
                            </div>
                            <span className={`badge rounded-pill ${e.type === 'Conflict' ? 'bg-danger' :
                                    e.type === 'Market' ? 'bg-warning text-dark' : 'bg-info'
                                }`}>
                                {e.type}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventList;