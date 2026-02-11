import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';

const PriceChart = ({ data, detectedDate }) => {
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between bg-white">
                <h6 className="m-0 font-weight-bold text-primary">Brent Oil Price Analysis (2019-2021)</h6>
            </div>
            <div className="card-body" style={{ height: '400px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis
                            dataKey="Date"
                            tick={{ fontSize: 12 }}
                            minTickGap={50}
                        />
                        <YAxis />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", border: "none", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Price"
                            stroke="#4e73df"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                            name="Oil Price (USD)"
                        />
                        {detectedDate && (
                            <ReferenceLine
                                x={detectedDate}
                                stroke="#e74a3b"
                                strokeDasharray="4 4"
                                label={{ position: 'top', value: 'Structural Break', fill: '#e74a3b', fontSize: 12 }}
                            />
                        )}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PriceChart;