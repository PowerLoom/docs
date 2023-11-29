---
sidebar_position: 1
---


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

### Fetching CID and Verifying it On-Chain!
![API Calls for the a certain CID](../../../../static/images/uniswap-inspect.png)

The Uniswap v2 dashboard at https://uniswapv2.powerloom.io/ connects to a backend hosted by the Powerloom Foundation. This backend includes a service called `core_api.py` in the 'pooler' section. This service links directly to the protocol's final state as defined in the contract.

When using the dashboard, it sends queries to the backend using project IDs. These IDs represent data summed up over periods of 24 hours and 7 days. These project IDs are also used for checking submission statistics, showing their importance in both the platform's day-to-day operations and in analyzing data.

#### Verifying the data:
To find the RPC URL for the Powerloom Prost 1D Chain and the address of the deployed protocol state contract, you need to check the `env.example` file in the Powerloom deploy repository. This file is available at the following GitHub link: [Powerloom deploy repository - env.example file](https://github.com/PowerLoom/deploy/blob/testnet_5_pairs/env.example).

**Adding the Chain to the Wallet**

Once you have these details:

1. Open MetaMask or any web3 plugin in your browser.
2. Go to the network selection area.
3. Choose to add a new network.
4. Enter the RPC URL and contract address you found in the `env.example` file.

This will allow you to connect to the Powerloom Prost 1D Chain testnet.

![Chain-Details](../../../../static/images/Chain-details.png)

**Accessing the ABI of the protocol state Contract**

To access and utilize the ABI of the protocol state contract from the Powerloom project, follow these steps:

1. Visit the Powerloom 'pooler' repository on GitHub at this URL: [Powerloom pooler repository - ProtocolContract.json](https://github.com/PowerLoom/pooler/blob/testnet_5_pairs/snapshotter/static/abis/ProtocolContract.json).
2. Locate the `ProtocolContract.json` file.
3. Copy the contents of the file.
4. Open the Remix IDE.
5. Create a new file with a `.abi` extension.
6. Paste the contents of the `ProtocolContract.json` file into this new file.
7. Save the file in Remix.

This process will allow you to have the protocol state contract’s ABI available in the Remix editor for further development or interaction.
![ABI Interacting](../../../../static/images/abi-interaction.png)

**Verify Uniswap v2 dashboard datasets**

To verify the top 24-hour aggregation on pair contract activity for the specified project ID in the Uniswap V2 ecosystem, follow these steps:

1. Identify the last finalized epoch associated with the project ID: `aggregate_24h_top_pairs_lite:10ecae2f52160690abffff26efeb45568e5d67ea0bc7d4485d9ffb10ef437f33:UNISWAPV2`.
2. Retrieve the finalized CID (Content Identifier) for this epoch.
3. Access the dataset linked to this CID. You can do this either through your local IPFS node or by using a public IPFS gateway.(Public gateway link: https://ipfs.io/ipfs/{IPFS-CID})

:::tip
Sometimes, the IPFS gateway can be overloaded and it can result in not giving out an output. In that case, you can tunnel into your node and verify the data. 

```bash
ssh -nNTv -L 5001:127.0.0.1:5001 root@yourServerIP
```

```bash
ipfs cat bafkreifc33xiuqaf5nxqad2syn7j5x27j2pujzr7hhsxgtsr7zor4svqie --api /ip4/127.0.0.1/tcp/5001
```
:::

This process will allow you to review the aggregated data for the top pairs on Uniswap V2 over the last 24 hours.


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
