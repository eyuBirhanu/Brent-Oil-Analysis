import React from 'react';

const KpiCard = ({ title, value, isPercentage = false }) => {
    // Determine color for percentages (Green for up, Red for down)
    let textColor = "text-dark";
    if (isPercentage) {
        textColor = value < 0 ? "text-danger" : "text-success";
    }

    return (
        <div className="col-md-3 mb-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                    <h6 className="text-muted text-uppercase small fw-bold">{title}</h6>
                    <h3 className={`fw-bold ${textColor}`}>
                        {value}
                        {isPercentage ? "%" : ""}
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default KpiCard;