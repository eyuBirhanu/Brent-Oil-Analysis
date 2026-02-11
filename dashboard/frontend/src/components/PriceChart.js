import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ReferenceArea, Brush
} from 'recharts';

const PriceChart = ({ data, detectedDate }) => {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-white">
                <h6 className="m-0 font-weight-bold text-primary">Price History & Market Shocks (Zoomable)</h6>
            </div>
            <div className="card-body" style={{ height: '500px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="Date"
                            tick={{ fontSize: 11 }}
                            minTickGap={50}
                        />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#1a1a1a", color: "#fff", borderRadius: "8px", border: "none" }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Legend verticalAlign="top" height={36} />

                        {/* 1. The Zoom Slider (Requirement: Date Range Selector) */}
                        <Brush dataKey="Date" height={30} stroke="#4e73df" />

                        {/* 2. Highlight the Crash Zone (Creative Touch) */}
                        <ReferenceArea x1="2020-03-01" x2="2020-05-01" strokeOpacity={0.3} fill="red" fillOpacity={0.1} label="COVID Crash" />

                        <Line
                            type="monotone"
                            dataKey="Price"
                            stroke="#2c3e50"
                            strokeWidth={2}
                            dot={false}
                            name="Brent Oil Price"
                        />

                        {/* 3. The Structural Break Line */}
                        {detectedDate && (
                            <ReferenceLine
                                x={detectedDate}
                                stroke="#e74a3b"
                                strokeDasharray="5 5"
                                strokeWidth={2}
                                label={{ position: 'top', value: 'Regime Change', fill: '#e74a3b', fontSize: 13, fontWeight: 'bold' }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceChart;