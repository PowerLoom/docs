---
sidebar_position: 3
---
# ETH Price Tracker

## Introduction
This guide provides a detailed walkthrough on setting up a price tracker for the Ethereum token, from hereon referred to as ETH.

:::tip
Prerequisites: Before we dive into the implementation of ETH price tracker, you must follow all the steps to 
[setup your Devnet Node](/docs/build-with-powerloom/devnet/getting-started)
:::
### Scenario: ETH Price Tracking

We aim to capture real-time changes in ETH's price conversion ratio. Watch the tutorial below for a detailed walkthrough.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wn4zK8ONLt4?start=40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Steps to Implement this Use Case

### Cloning the Deploy Repository
Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom_deploy`.


### Configuring The Node - Copy env.example to .env

#### Required variables


- `SOURCE_RPC_URL` : The URL for the Ethereum RPC (Local node/Infura/Alchemy) service. Set the RPC URL to Ethereum mainnet to snapshot the data source contracts on it.
- `SIGNER_ACCOUNT_ADDRESS` : The address of the signer account. This should be an unused "burner" address that does not need to have any token balance. You can create a new burner wallet from our [tool](https://devnet-mint.powerloom.dev/burner).
- `SIGNER_ACCOUNT_PRIVATE_KEY` : The private key corresponding to the signer account address.
- `SLOT_ID` : Enter your Devnet Slot ID. 

:::info 
Unless it is a customized need or instructed by us, the below need not be changed or modified from the values already supplied in `env.example`
:::

- `SNAPSHOT_CONFIG_REPO`=[https://github.com/powerloom/snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/tree/eth_price_monitor)
- `SNAPSHOT_CONFIG_REPO_BRANCH`=eth_price_monitor
- `SNAPSHOTTER_COMPUTE_REPO`=[https://github.com/powerloom/snapshotter-computes](https://github.com/powerloom/snapshotter-computes/tree/eth_price_monitor)
- `SNAPSHOTTER_COMPUTE_REPO_BRANCH`=eth_price_monitor
- `PROTOCOL_STATE_CONTRACT` : The contract address for the protocol state.
- `RELAYER_HOST`: The host address for the relayer.
- `NAMESPACE` : The unique key used to identify your project namespace.
- `PROST_CHAIN_ID` : The Devnet chain ID.
- `PROST_RPC_URL` : The URL for the PROST RPC service.
- `POWERLOOM_REPORTING_URL` : The URL for reporting to Powerloom.

#### Optional

- `IPFS URL` : The URL for the IPFS (InterPlanetary File System) service in HTTPS(s) (e.g. `https://ipfs.infura.io:5001`) multiaddr format (e.g. `/dns/ipfs.infura.io/tcp/5001/https`)
- `IPFS_API_KEY`: The API key for the IPFS service (if required).
- `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
- `SLACK_REPORTING_URL`: The URL for reporting to Slack.
- `WEB3_STORAGE_TOKEN`: The token for Web3 Storage. You can generate or retrieve this token from your [API token page](https://web3.storage/) after signing up for a free plan at web3.storage.

### Snapshot Building

:::info
It is recommended to look at the docs on [snapshot generation](/docs/protocol/specifications/snapshotter/snapshot-build).
:::

Snapshotter node has a simple interface as part of `GenericProcessorSnapshot` class that business logic specific computes need to implement. The rest of the heavy lifting around reliable submissions and finalization is taken care of by the rest of the features of the node.

In this case, `EthPriceProcessor` located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py) is the sole compute class for ETH price tracking. This class implements the [`GenericProcessorSnapshot`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/callback_helpers.py) interface, most notably the `compute()` callback. This callback is where we build the snapshots.


```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py#L1-L45
```

`get_eth_price_usd()` is located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py) and is a utility function that calculates the price of ETH as a weighted average of its price conversion ratios against DAI, USDC and USDT in the corresponding Uniswap V2 pair contracts. The weights assigned are relative to the total liquidity locked against the W(rapped)ETH token across the three pair contracts.

```python reference
https://github.com/PowerLoom/pooler/blob/main/snapshotter/utils/snapshot_utils.py#L140-L154
```

### Set Up the Codebase

Setup the codebase by running the `bootstrap.sh` command in the terminal. Developers may use different shells, such as `bash` or `zsh`. Adjust the command accordingly.

For bash:

```bash
bash bootstrap.sh
```
or
```zsh
zsh bootstrap.sh
```

### Run the Snapshotter Node


```bash
bash build.sh
```
or
```zsh
zsh build.sh
```

Once your node is running, the [core API server](/docs/build-with-powerloom/snapshotter-node/core-api/) can be found on [http://localhost:8002](http://localhost:8002). It comes with an easy to use SwaggerUI to test out the endpoints to retrieve snapshotted data, or monitor the node status among other things.

![endpoints](/images/endpoints.png)

The snapshotted data as generated by the compute module referred above is retrieved from  `/data/{epoch_id}/{project_id}` endpoint. It requires two parameters

- `epoch_id (int)`: the [epoch ID](/docs/Protocol/Specifications/Epoch) against which it will fetch the snapshotted data.
- `project_id (str)`: refer to [project id generation](docs/Protocol/Specifications/Snapshotter/snapshot-build) to know more. In this example, it is the concatenation of the the first element in the tuple [returned from the snapshot compute module's implementation of `compute()`](#snapshot-building) along with the project type prefix as found in the [corresponding config for this snapshotter node](#forking-the-computes-and-config-templates). 

```python reference
https://github.com/PowerLoom/snapshotter-configs/blob/8ed08b19272005f5c45b1af1ff9fd0ab5195bbc6/projects.example.json#L4
```

:::info
To learn more about the details of the first element in the tuple being returned from `compute()` being considered as the data source in project ID generation, refer to the docs on [Data Source Specification: Bulk Mode](/docs/Protocol/Specifications/Snapshotter/snapshot-build#data-source-specification-bulk-mode)
:::

## Verifying snapshotted data

As the node continues snapshotting data, the quickest way to check the snaposhotted data is to check against `epoch_id` and `project_id` returned in the logs. Copy these values and paste them in the endpoint to retrive project data in the [SwaggerUI exposed against the core API](#run-the-snapshotter-node).

![endpoints](/images/docker.png)

For example, in the screenshot, the `epoch_id` is `100792`. Hit execute. The corresponsing snapshotted data to this specific `epoch_id` displays the price of ETH as `3067.935921`. 

As the `epoch_id` moves ahead to `100793`, we find the above endpoint reflects the latest price captured of ethereum as `3068.034792`

![endpoints](/images/eth-price-one-snapshot.png)
![endpoints](/images/eth-price-two-snapshot.png)

### How to program this

1. Define the correct project ID against which data has to be fetched

```python
project_type = "eth:price_tracking"  # from https://github.com/PowerLoom/snapshotter-configs/blob/eth_price_monitor/projects.example.json#L4
project_namespace = "DEVNET"  # from https://github.com/PowerLoom/deploy/blob/95ceb83a97a16279816c406eef484245df483fb1/env.example#L25
data_source = "example"  # from https://github.com/PowerLoom/snapshotter-computes/blob/15059013c6c17327d1c0d413d3885c23a6383305/eth_price_tracking.py#L45
project_id = f'{project_type}:{data_source}:{project_namespace}'
```
2. Fetch the last finalized epoch from the API endpoint `http://localhost:8002/last_finalized_epoch/{project_id}`
3. Fetch the data against this epoch ID from the API endpoint `http://localhost:8002/data/{epoch_id}/{project_id}`

## Reach out to us

For any sort of support or clarification, reach out to us on our [discord developer channel](https://discord.com/channels/777248105636560948/1180479966434054165).
