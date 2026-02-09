# 📈 Brent Oil Price Change Point Analysis

![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Interim-orange)

**Author:** Eyu Birhanu  
**Organization:** Birhan Energies  
**Date:** February 2026

---

## 📌 Project Overview

As a data scientist at **Birhan Energies**, this project focuses on analyzing how major political and economic events affect Brent oil prices. The oil market is volatile, and understanding the correlation between geopolitical events (like conflicts, sanctions, and OPEC decisions) and price fluctuations is crucial for investors and policymakers.

The core objective is to use **Bayesian Change Point Analysis** to statistically detect when significant price shifts occurred and associate them with known historical events.

## 🎯 Objectives

1.  **Event Analysis**: Identify key geopolitical and economic events over the past decade.
2.  **Change Point Detection**: Use PyMC (Bayesian inference) to statistically detect structural breaks in the time series data.
3.  **Quantify Impact**: Measure the magnitude of price changes before and after specific events.
4.  **Dashboarding**: Build an interactive dashboard (Flask + React) to visualize the results for stakeholders.

## 📂 Project Structure

The repository is organized as follows:

```bash
Brent-Oil-Analysis/
├── data/                   # Raw and processed data
│   ├── BrentOilPrices.csv  # Historical daily oil prices (1987-2022)
│   └── key_events.csv      # Compiled list of major geopolitical events
├── notebooks/              # Jupyter notebooks for analysis
│   ├── 01_interim_eda.ipynb      # Exploratory Data Analysis & Preprocessing
│   └── 02_change_point_model.ipynb # Bayesian Change Point Detection (PyMC)
├── src/                    # Source scripts for modular code
├── dashboard/              # Interactive Dashboard
│   ├── backend/            # Flask API
│   └── frontend/           # React Frontend
├── reports/                # Documentation and analysis reports
│   └── Interim_Report.md   # Initial analysis plan and findings
├── README.md               # Project documentation
└── requirements.txt        # Python dependencies
```

## 📊 Data Description

The analysis uses historical Brent oil prices from **May 20, 1987** to **September 30, 2022**.

- **Date**: The recorded date of the price.
- **Price**: Price in USD per barrel.
- **Data Source**: U.S. Energy Information Administration (EIA) / Kaggle.

## 🛠️ Methodology

### 1. Exploratory Data Analysis (EDA)
- Visualizing trends and volatility using Log Returns.
- Testing for stationarity (ADF Test).

### 2. Bayesian Modeling (PyMC)
- Modeling the price as a Normal distribution with changing parameters.
- Using MCMC (Markov Chain Monte Carlo) to sample the posterior distribution of the "switch point" ($\tau$).

### 3. Event Correlation
- Mapping detected change points to real-world events (e.g., 2008 Crisis, COVID-19, Russia-Ukraine War).

## 🚀 How to Run the Analysis

### Prerequisites
- Python 3.8+
- Anaconda or Miniconda (Recommended)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eyubirhanu/Brent-Oil-Analysis.git
   cd Brent-Oil-Analysis
   ```

2. **Install dependencies:**
   ```bash
   pip install pandas numpy matplotlib seaborn pymc arviz flask
   ```

3. **Run the EDA Notebook:**
   - Open `notebooks/01_interim_eda.ipynb` in Jupyter Lab or VS Code.
   - Run all cells to see the initial analysis.

## 📈 Key Findings (Interim)

- The time series is **non-stationary** (it has a trend).
- **High volatility clusters** are observed around 2008 (Financial Crisis) and 2020 (COVID-19 Pandemic).
- Preliminary analysis suggests that major price shifts align with global economic shocks rather than minor policy changes.