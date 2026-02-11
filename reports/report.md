# Analysis of Brent Oil Prices: Detecting Structural Breaks (2019–2021)

**Prepared For:** Birhan Energies Stakeholders  
**Prepared By:** Eyu Birhanu, Data Scientist  
**Date:** February 11, 2026

## 1. Executive Summary

This report details a statistical analysis of Brent Oil price volatility, specifically focusing on the detection of structural market changes. Using **Bayesian Change Point Analysis**, we investigated price behaviors over the last decade, with a specific focus on the tumultuous 2019–2021 period.

**Key Finding:** The analysis identified a statistically significant structural break in the oil market on **March 9, 2020**. This regime change coincides with the onset of the COVID-19 pandemic and the breakdown of OPEC+ negotiations, resulting in a **~37.6% decrease** in the average price of Brent Crude ($64.32 \to $40.15).

---

## 2. Introduction

The global oil market is highly sensitive to geopolitical events, supply chain disruptions, and macroeconomic shifts. For stakeholders at **Birhan Energies**, understanding these dynamics is critical for risk management and strategic planning.

The objective of this study was to move beyond simple trend analysis and scientifically quantify "regime changes"—points in time where the underlying statistical properties of the market shifted fundamentally.

---

## 3. Methodology

### 3.1 Data Sourcing & Preprocessing
Historical daily Brent Oil price data (1987–2022) was sourced for this analysis. Preprocessing steps included:
*   **Stationarity Testing:** Augmented Dickey-Fuller (ADF) tests confirmed non-stationarity ($p > 0.05$), necessitating advanced modeling techniques over simple linear regression.
*   **Time Filtering:** The study focused on the 2019–2021 window to isolate the specific volatility surrounding the global lockdown period.

### 3.2 Statistical Approach: Bayesian Inference
We employed a **Bayesian Switchpoint Model** using the **PyMC** probabilistic programming library.
*   **Model:** We assumed prices followed a Normal distribution $N(\mu, \sigma)$ where the parameters ($\mu$) change abruptly at an unknown time point $\tau$.
*   **Inference:** Markov Chain Monte Carlo (MCMC) sampling (N=1000) was used to generate a posterior distribution for $\tau$, allowing us to quantify the uncertainty of the change point date.

---

## 4. Analysis & Findings

### 4.1 The Structural Break
The model converged with high confidence (R-hat $\approx$ 1.0), identifying a precise date for the market shift.

| Statistic | Pre-Change | Post-Change |
| :--- | :--- | :--- |
| **Mean Price** | **$64.32** | **$40.15** |
| **Standard Deviation** | Low | High (Increased Volatility) |

**Detected Change Point:** March 9, 2020

### 4.2 Event Correlation & Causality
The identified date aligns perfectly with two major global events, creating a "perfect storm" for oil prices:
1.  **Supply Shock:** On March 8, 2020, Saudi Arabia initiated a price war with Russia, flooding the market with supply.
2.  **Demand Shock:** Simultaneous global lockdowns due to COVID-19 drastically reduced demand for transportation fuel.

This confluence of events caused the largest single-day price drop since 1991.

---

## 5. Dashboard Implementation

To operationalize these findings, a full-stack interactive dashboard was developed:
*   **Backend (Flask):** Serves the processed time-series data and Bayesian model results via REST API.
*   **Frontend (React):** Visualizes the price trend, overlaying the detected change point and calculating real-time Key Performance Indicators (KPIs) for the difference in price levels.

![Dashboard Preview](../reports/dashboard_screenshot.png)

---

## 6. Conclusion & Recommendations

The analysis confirms that market regimes can shift instantaneously due to exogenous shocks.

**Recommendations:**
1.  **Adaptive Risk Models:** Risk management frameworks must account for "fat-tail" events and regime jumps, rather than relying solely on continuous Gaussian models.
2.  **Real-time Monitoring:** The deployed dashboard should be integrated with live data feeds to act as an "Early Warning System" for future structural breaks.

---

## 7. References
*   **Data Source:** U.S. Energy Information Administration (EIA).
*   **Libraries:** PyMC, ArviZ, Pandas, Scikit-learn.