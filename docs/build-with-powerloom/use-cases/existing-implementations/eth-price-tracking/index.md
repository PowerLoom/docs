---
sidebar_position: 0
---
# Introduction and Setup

## Introduction
This guide provides a detailed walkthrough on setting up an Eth price tracker. We'll capture Ethereum price snapshots directly from the Mainnet, building upon the setup we previously established for the Devnet. 

:::tip
Prerequisites: Before we dive into the implementation of Eth price tracker, you must follow all the steps in this link. 
[Set up your Devnet Node](/docs/build-with-powerloom/devnet/getting-started)

Once you are done, you can follow the instructions below. 


:::
### Scenario: ETH Price Tracking

We aim to capture real-time changes in Ethereum's price. We will focus on processing and capturing Ethereum price snapshots in 3 simple steps. 

Watch the tutorial below for a detailed walk-through of how to build this use case.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wn4zK8ONLt4?start=40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Steps to Implement this Use Case

#### 1: Cloning the Deploy Repository
Clone the repository against the respective branch (main by default). Open the terminal and run the below command to clone the deploy repo in a directory named `powerloom_deploy`.

#### 2: Froking the Computes and Config templates
For an optimized development process, it's recommended to fork the templates [snapshotter-computes](https://github.com/PowerLoom/snapshotter-computes/tree/eth_price_monitor) and [snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/tree/eth_price_monitor). 

#### 3:Configuring The Node - Copy env.example to .env.


:::info 
Unless it is a customized need or instructed by us, the below need not be changed or modified.

:::


- Ensure the following required variables are filled:
    - `SOURCE_RPC_URL` : The URL for the Ethereum RPC (Local node/Infura/Alchemy) service.Set the RPC URL to Ethereum mainnet to snapshot the data source contracts on it.
    - `SIGNER_ACCOUNT_ADDRESS` : The address of the signer account. This should be an unused "burner" address that does not need to have any token balance. You can create a new burner wallet from our [tool](https://devnet-mint.powerloom.dev/burner).
    - `SIGNER_ACCOUNT_PRIVATE_KEY` : The private key corresponding to the signer account address.
    - `SNAPSHOT_CONFIG_REPO`=[https://github.com/powerloom/snapshotter-configs](https://github.com/PowerLoom/snapshotter-configs/tree/eth_price_monitor)
    - `SNAPSHOT_CONFIG_REPO_BRANCH`=eth_price_monitor
    - `SNAPSHOTTER_COMPUTE_REPO`=[https://github.com/powerloom/snapshotter-computes](https://github.com/powerloom/snapshotter-computes/tree/eth_price_monitor)
    - `SNAPSHOTTER_COMPUTE_REPO_BRANCH`=eth_price_monitor
    - `SLOT_ID` : Enter your Devnet Slot ID. 
    - `PROST_RPC_URL` : The URL for the PROST RPC service.
    - `PROTOCOL_STATE_CONTRACT` : The contract address for the protocol state.
    - `RELAYER_HOST`: The host address for the relayer.
    - `NAMESPACE` : The unique key used to identify your project namespace.
    - `PROST_CHAIN_ID` : The Devnet chain ID.
    - Optionally, you may also set the following variables: around which all consensus activity takes place.
        - `POWERLOOM_REPORTING_URL` : The URL for reporting to Powerloom.
        - `IPFS URL` : The URL for the IPFS (InterPlanetary File System) service in HTTPS(s) (e.g. `https://ipfs.infura.io:5001`) multiaddr format (e.g. `/dns/ipfs.infura.io/tcp/5001/https`)
        - `IPFS_API_KEY`: The API key for the IPFS service (if required).
        - `IPFS_API_SECRET`: The API secret for the IPFS service (if required).
        - `SLACK_REPORTING_URL`: The URL for reporting to Slack.
        - `WEB3_STORAGE_TOKEN`: The token for Web3 Storage. You can generate or retrieve this token from your [API token page]((https://web3.storage/)) after signing up for a free plan at web3.storage.

#### 4. Snapshot Building

:::info
Before you dive into this section, please make sure you take a look into the [Snapshot Generation Section](/docs/protocol/specifications/snapshotter/snapshot-build#base-snapshots).
:::

Snapshotter node has several interfaces defined to handle the heavy lifting so that you can focus on just writing computes modules.
For example, `EthPriceProcessor` located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py) is one of the base Processor computes for ETH price tracking. This class uses the `GenericProcessorSnapshot` structure found in [`snapshotter/utils/callback_helpers.py`](https://github.com/Powerloom/pooler/blob/main/snapshotter/utils/callback_helpers.py).

Any compute for base snapshots basically needs to implement the `compute` function.

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py#L22-L26
```

The `compute` function is the main part where we create and process snapshots. It uses these inputs:

  - `epoch`: Epoch details for which the snapshot is being generated.
  - `redis`: Redis connection object.
  - `rpc_helper`: RPC Helper object. 

The `EthPriceProcessor` capture Ethereum price snapshots directly from the Mainnet, building upon the setup we previously established for the Devnet. 

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py#L1-L45
```
`get_eth_price_usd` is located in [`snapshotter/modules/computes`](https://github.com/PowerLoom/snapshotter-computes/blob/eth_price_monitor/eth_price_tracking.py).
The `get_eth_price_usd` is a utility function that calculates the price of ETH with respect to DAI, USDC and USDT. Then, it takes the average of all the above values with respect to the total liquidity of ETH. This is called the weighted average. This gives us the most accurate price of ETH.  
```python reference
https://github.com/PowerLoom/pooler/blob/main/snapshotter/utils/snapshot_utils.py#L140-L154
```

#### 5. Set Up the Codebase
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
