---
title: BiasRadar
summary: A staged ML pipeline that looks for bias in how 311 service requests were handled, across 2010 to 2025.
repo: https://github.com/jyothiprasanthdr/BiasRadar
stack: [Python, ZenML, MLflow, scikit-learn, XGBoost, LightGBM, pandas, Polars, Docker]
started: Jul 2025
order: 2
---

## What it does

BiasRadar analyzes 311 service data from 2010 to 2025 to detect and study bias in how requests are handled, starting with exploratory analysis of response-time distributions.

## How it is built

The work runs as a pipeline of separate steps instead of one notebook:

1. Ingest the raw 311 data.
2. Clean it.
3. Train models (scikit-learn, XGBoost, LightGBM).
4. Evaluate them.

ZenML orchestrates the steps and MLflow tracks the runs. Exploratory notebooks sit alongside the pipeline, and a Dockerfile packages it.
