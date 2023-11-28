---
sidebar_position: 2
---

# Fetching higher order datapoints

Higher-order data points in Pooler are aggregated metrics based on basic data captured from Uniswap V2 pair contracts. These aggregations provide insights into market trends and asset performance.

### Project IDs and Aggregation

- **Project IDs:** Unique identifiers for each pair contract, used to fetch and aggregate data.
- **Aggregates:** Summarized data like total trade volume, calculated over a specified time frame.

### Configurations and Project ID Generation

- **Projects Configuration (`projects.json`):** Defines the data to be captured and processed. Includes project types, smart contract addresses, and processing modules.
- **Project ID Generation:** IDs are generated based on project types and specific configuration details in `projects.json`.

### Interaction with Core API

- **Core API Usage:** Pooler's Core API provides access to aggregated data stored on the protocol state smart contract.
- **Fetching Data:** API endpoints enable retrieval of final aggregated data for specific project IDs.

### Implementation References

- **Protocol State and Data Sources:** Refers to how data is sourced and stored on the blockchain.
- **Snapshotter Component Core API:** Part of Pooler's architecture, crucial for data fetches and aggregation.
- **Pooler API Documentation:** Detailed information available in Pooler's Docusaurus documentation.
