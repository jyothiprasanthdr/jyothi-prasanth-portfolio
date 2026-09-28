---
title: AI Financial News Agent
summary: A LangGraph agent that answers questions about a stock by retrieving related news from Qdrant, pulling the latest price, and summarizing both.
repo: https://github.com/jyothiprasanthdr/AI-Financial-News-agent-with-RAG
stack: [Python, LangGraph, Qdrant, OpenAI and Gemini embeddings, Yahoo Finance, Streamlit, Docker]
started: Nov 2025
order: 1
---

## What it does

You ask about a company in plain language. The agent pulls the ticker out of the question, searches a Qdrant vector store of financial articles for relevant coverage, fetches the latest market price, summarizes what it found, and returns one answer. A Streamlit app wraps the whole flow.

## How the graph is built

The workflow is a LangGraph graph of five nodes, run in order:

1. `extract_ticker` finds the ticker in the question.
2. `semantic_search` retrieves related articles from Qdrant.
3. `yahoo_fetch_with_fallback` gets the latest price, with fallback logic when the first source fails.
4. `summarize_articles` condenses the retrieved coverage.
5. `summarize` writes the final response from the graph's state.

## Structure

Clients (Qdrant, Yahoo data), pipeline nodes, and the UI live in separate modules. The repo includes a script runner for programmatic use and a Dockerfile.
