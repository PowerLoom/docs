---
sidebar_position: 3
---

# All About Data

So far, we've discussed a lot about the verifiability and decentralization of data. Now, let's delve into the details of how data is stored, verified, and accessed.

## Data Storage

Data is stored in a decentralized manner using IPFS, a peer-to-peer network for storing and sharing data in a distributed file system. IPFS aims to replace HTTP and build a better web for all of us. It is a peer-to-peer distributed file system that connects all computing devices with the same system of files. In some ways, IPFS is similar to the Web, but it could be seen as a single BitTorrent swarm, exchanging objects within one Git repository.

In other words, IPFS provides a high-throughput content-addressed block storage model, with content-addressed hyperlinks. This forms a generalized Merkle DAG, a data structure upon which one can build versioned file systems, blockchains, and even a Permanent Web. IPFS combines a distributed hashtable, an incentivized block exchange, and a self-certifying namespace. IPFS has no single point of failure, and nodes do not need to trust each other.

Every file and every block of data on the network has a unique hash associated with it, called a CID (Content Identifier), used to identify and retrieve the data.

## Fetching CID and Verifying it On-Chain

![API Calls for a certain CID](/images/uniswap-inspect.png)

For instance, the Powerloom Uniswap V2 dashboard (https://uniswapv2.powerloom.io/) connects to a snapshotter node hosted by the Powerloom Foundation. The frontend interacts with the [Snapshotter Core API](/docs/category/snapshotter-core-api) to access the data. Internally, the Core API interacts with the Protocol State Contract deployed on Powerloom Prost chain to fetch the data.

### Verifying Data

To verify the data, you need the Prost chain RPC Url and the address of the deployed protocol state contract. Find these details in the `env.example` file in the Powerloom [deploy](https://github.com/Powerloom/deploy/) repository.

#### Adding the Chain to the Wallet

Once you have these details:

1. Open MetaMask or any web3 plugin in your browser.
2. Go to the network selection area.
3. Choose to add a new network.
4. Enter the RPC URL and contract address found in the `env.example` file.

This allows you to connect to the Powerloom Prost chain. The MetaMask example is shown in the screenshot below.

Note: The RPC URL and the contract address in the screenshot below are for reference. You need to use the ones from the `env.example` file.

![Chain Details](/images/Chain-details.png)

#### Accessing the ABI of the Protocol State Contract

To access the ABI of the protocol state contract from the Powerloom project, follow these steps:

1. Visit the Powerloom 'pooler' repository on GitHub at this URL: [Powerloom pooler repository - ProtocolContract.json](https://github.com/Powerloom/pooler/blob/main/snapshotter/static/abis/ProtocolContract.json).
2. Locate the `ProtocolContract.json` file.
3. Copy the contents of the file.
4. Open the Remix IDE.
5. Create a new file with a `.abi` extension.
6. Paste the contents of the `ProtocolContract.json` file into this new file.
7. Save the file in Remix.

This process makes the protocol state contract’s ABI available in the Remix editor for further development or interaction.

![ABI Interaction](/images/abi-interaction.png)

**Verifying Datasets**

To verify data for any Project ID, follow these steps:

1. Identify the last finalized epoch associated with the project ID, e.g., `aggregate_24h_top_pairs_lite:10ecae2f52160690abffff26efeb45568e5d67ea0bc7d4485d9ffb10ef437f33:UNISWAPV2`.
2. Retrieve the finalized CID (Content Identifier) for this epoch.
3. Access the dataset linked to this CID either through your local IPFS node or by using a public IPFS gateway (Public gateway link: https://ipfs.io/ipfs/{IPFS-CID})

The logic to retrieve the CID from the protocol state contract can be extracted from the [Snapshotter Core API](/docs/category/snapshotter-core-api) codebase.

Here's the code to find the last finalized epoch for a project ID:
```python reference
https://github.com/Powerloom/pooler/blob/d8b7be32ad329e8dcf0a7e5c1b27862894bc990a/snapshotter/core_api.py#L248-L339
```

Call the relevant functions in the loaded Protocol state contract ABI in the Remix IDE to fetch the data.

:::tip
Sometimes, the IPFS gateway can be overloaded or data might not be peer-to-peer replicated, resulting in no output. In that case, you can tunnel into your node and verify the data.

```bash
ssh -nNTv -L 5001:127.0.0.1:5001 root@yourServerIP
```

```bash
ipfs cat bafkreifc33xiuqaf5nxqad2syn7j5x27j2pujzr7hhsxgtsr7zor4svqie --api /ip4/127.0.0.1/tcp/5001
```
:::