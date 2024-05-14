---
sidebar_position: 3
---
# ETH Price Tracker

## Introduction
This guide provides a detailed walkthrough on setting up a price tracker for the Ethereum token, from hereon referred to as ETH. We'll capture ETH price snapshots on the Ethereunm Mainnet, building upon the setup we previously established for the Devnet. 

:::tip
Prerequisites: Before we dive into the implementation of ETH price tracker, you must follow all the steps to 
[setup your Devnet Node](/docs/build-with-powerloom/devnet/getting-started)
:::
### Scenario: ETH Price Tracking

We aim to capture real-time changes in ETH's price conversion ratio. Watch the tutorial below for a detailed walk through.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wn4zK8ONLt4?start=40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Steps to Implement this Use Case

### 1. Cloning the Deploy Repository
Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom_deploy`.

### 2. Forking the Computes and Config templates
For an optimized development process, it's recommended to fork the templates [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes/tree/eth_price_monitor) and [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/tree/eth_price_monitor). 

### 3. Configuring The Node - Copy env.example to .env

#### Required variables


- `SOURCE_RPC_URL` : The URL for the Ethereum RPC (Local node/Infura/Alchemy) service.Set the RPC URL to Ethereum mainnet to snapshot the data source contracts on it.
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
- `WEB3_STORAGE_TOKEN`: The token for Web3 Storage. You can generate or retrieve this token from your [API token page]((https://web3.storage/)) after signing up for a free plan at web3.storage.

### 4. Snapshot Building

:::info
It is recommended to have a look at the docs on [snapshot generation](/docs/protocol/specifications/snapshotter/snapshot-build).
:::

Snapshotter node has a simple interface as part of `GenericProcessorSnapshot` class that business logic specific computes need to implement. The rest of the heavy lifting around reliable submissions and finalization is taken care of by the rest of the features of the node.

In this case, `EthPriceProcessor` located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py) is the sole compute class for ETH price tracking. This class implements the [`GenericProcessorSnapshot`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/callback_helpers.py) interface, most notably the `compute()` callback.


```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py#L22-L26
```

This callback is where we build the snapshots. It uses these inputs:

- `epoch`: Epoch details for which the snapshot is being generated.
- `redis`: Redis connection object.
- `rpc_helper`: RPC Helper object. 


```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py#L1-L45
```
`get_eth_price_usd` is located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py).
The `get_eth_price_usd` is a utility function that calculates the price of ETH with respect to DAI, USDC and USDT. Then, it takes the average of all the above values with respect to the total liquidity of ETH. This is called the weighted average. This gives us the most accurate price of ETH.  
```python reference
https://github.com/PowerLoom/pooler/blob/main/snapshotter/utils/snapshot_utils.py#L140-L154
```

### 5. Set Up the Codebase
To run our node, Run docker.

Set up the codebase by running the `bootstrap.sh` command in the terminal. Developers may use different shells, such as bash or zsh. Adjust the command accordingly:

For bash:

```bash
bash bootstrap.sh
```
or
```zsh
zsh bootstrap.sh
```

####  Run the Snapshotter Node

Run the command

```bash
bash build.sh
```
or
```zsh
zsh build.sh
```

Once your node is running, node API server will be running on [localhost:8002/docs](http://localhost:8002/docs)

Here, all the endpoints are available that can be used to read generated data, or monitor snapshotter node status. You can use these APIs in any client-side project. 

![endpoints](/images/endpoints.png)

The snapshotted data of ETH is received from  `/data/{epoch_id}/{project_id}` endpoint. It needs two parameters

  - `epoch_id (int)`: The ID of the epoch. This refers to the [epoch](/docs/Protocol/Specifications/Epoch) for which it will fetch the snapshotted data.
  `epoch` is `PowerloomSnapshotProcessMessage` object which contains the following information:
```python reference
https://github.com/PowerLoom/pooler/blob/main/snapshotter/utils/models/message_models.py#L46-L50
```
  - `project_id (str)`:The ID of the project. It is generated in three parts. To know refer [project id generation](docs/Protocol/Specifications/Snapshotter/snapshot-build) to know more.

### Understanding Snapshot Data

In docker, the `epoch_id` and `project_id` is returned in the logs. Copy these values and paste them in their respective endpoints as parameters. 
![endpoints](/images/docker.png)

In this case, 
The `epoch_id` is `100792`. Hit execute. The corresponsing snapshotted data to this specific `epoch_id` displays the price of ETH as `3067.935921`. 
To further check the latest snapshotted data for ETH, enter the latest `epoch_id`. In the screenshot above, the latest value of `epoch_id` is `100793`. It immedietely reflects the latest price captured of ethereum as `3068.034792`

![endpoints](/images/eth-price-one-snapshot.png)
![endpoints](/images/eth-price-two-snapshot.png)







If you have any questions while building / integrating, you can reach out on our [discord](https://powerloom.io/discord).
