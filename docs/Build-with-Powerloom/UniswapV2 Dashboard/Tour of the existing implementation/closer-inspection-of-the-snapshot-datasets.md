---
sidebar_position: 1
---

#
# Closer Inspection to Snapshotter Dataset: Pooler Documentation

## Introduction

Pooler is a Uniswap V2 specific implementation in the PowerLoom Protocol, designed to capture, process, and aggregate blockchain data. This documentation provides an in-depth look at how Pooler operates and how developers can utilize it for building data-rich applications.

### Data Points Overview

Pooler focuses on several key data points:

- **Total Value Locked (TVL):** The cumulative value locked in Uniswap V2.
- **Trade Volume, Liquidity Reserves, and Fees Earned:** These are categorized by:
  - Pair Contracts
  - Individual Tokens within Pair Contracts
- **Time Aggregation:** Data is aggregated over 24-hour and 7-day periods.
- **Transaction Types:** Including Swap, Mint, and Burn events.

### Querying with CIDs

Pooler uses decentralized CIDs (Content Identifiers) to query individual pair contract projects. This is crucial for accessing reliable and decentralized data. The CIDs correspond to specific data sets, making it easier to fetch relevant information.

### Computing Data

The core of Pooler's functionality lies in its `compute()` function. This function processes base snapshot data to generate aggregated insights. For instance, it can sum the trade volumes or liquidity reserves over a specified time frame. Here’s a conceptual example of a `compute()` function:

```python
def compute(base_snapshots):
    # Summing values in base snapshots
    aggregated_data = sum(snapshot['value'] for snapshot in base_snapshots)
    return aggregated_data
```

### Base Data Model

The base data model in Pooler represents the foundational data structure. It typically includes fields like timestamps, transaction counts, and total values. This model can be adapted based on the requirements of the data being analyzed.

```python
class BaseSnapshot(Model):
    timestamp: int
    transaction_count: int
    total_value: float
```

### Aggregating Data

Aggregation in Pooler involves combining and summarizing data from base snapshots. For example, aggregating 24-hour trade data would involve grouping data by date and summing values for each day.

```python
def aggregate_24h_data(base_snapshots):
    daily_data = {}
    for snapshot in base_snapshots:
        date = snapshot['timestamp'].strftime('%Y-%m-%d')
        daily_data[date] = daily_data.get(date, 0) + snapshot['total_value']
    return daily_data
```

This function compiles daily totals from individual snapshots, creating a time-series dataset.
