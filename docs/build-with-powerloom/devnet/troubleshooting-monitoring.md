---
sidebar_position: 2
title: Monitoring and Troubleshooting
---

# Monitoring and Troubleshooting

This section will guide you through the process of Monitoring and Troubleshooting the status of your node's snapshotting process on devnet.

## 1. Confirming and Monitoring Node Snapshotting Process
---

### 1.1 Monitoring Node Activity with the Snapshotter Dashboard
   - #### Snapshotter Dashboard
      The devnet dashboard at https://devnet-mint.powerloom.dev enables you to verify if your node slot is actively submitting snapshots. This same dashboard is used for both minting slots and monitoring your nodes.

      ![Snapshotter-node-dashboard](/images/node-status-dashboard-devnet.png)
   
   - #### Telegram Reporting Bot
      Snapshotter Nodes have the capability to send Telegram messages directly to you if any issues arise during the snapshotting process. See the [Telegram Bot Setup](/build-with-powerloom/snapshotter-node/lite-node-v2/telegram-bot-setup) page for instructions on how to enable this feature.

### 1.2 Simulation run logs

   While running this node for the first time, it performs a couple of simulation submissions to test its connections to the sequencer network. If you notice logs similar to the lines below in the node run logs, your node's simulation run was successful.

   ![Snapshotter-First-Simulation](/images/SimulationSubmission.png)

### 1.3 Terminal Status Check
- The primary method to verify node status is through the terminal, which displays log responses from the node.

- Monitor these logs to assess the health and activity of your node. 

- A healthy snapshotter node will produce logs similar to the provided example screenshot. These logs indicate normal operation and successful snapshotting.

![Snapshotter-node-running](/images/RegularSubmission.png)



## 2. Troubleshooting and Support
---

This section provides guidance on troubleshooting your node in case of encountered issues. The steps outlined below are designed to help identify and resolve common problems efficiently.

### 2.1. Diagnostic and cleanup script

The diagnostic and cleanup script will check for any previous instances of the lite node, local collector, stale images and networks.

```bash
./diagnose.sh
```

### 2.2 Check status of running Docker containers

If you have launched your node using the `./build.sh --devnet` script, you can check the status of your running Docker containers using the following command.

```bash
docker ps
```

Containers with the name patterns 
* `snapshotter-lite-v2-<slot-id>-devnet-<data-market>-<data-source-chain>` 
* `snapshotter-collector-v2-<slot-id>-devnet-<data-market>-<data-source-chain>`

For example, if you are participating with 
* slot ID 1234
* on Powerloom Devnet 
* in the UniswapV2 data market that lives on Ethereum mainnet, 

you should see the following containers:

* `snapshotter-lite-v2-1234-devnet-UNISWAPV2-ETH` -- this corresponds to the snapshotter lite node that computes and generates the snapshot
* `snapshotter-collector-v2-1234-devnet-UNISWAPV2-ETH` -- this corresponds to the local collector that collects the snapshot and submits it to the sequencer

Unless something has gone severely wrong, you should see the status of `healthy` for both such containers.

#### 2.2.1 Check the logs of the running containers

You can check the logs of the running containers using the following command:

```bash
docker logs <container-name>
```

Continuing the example from the previous section, you can check the logs of the `snapshotter-lite-v2-1234-devnet-UNISWAPV2-ETH` container using the following command:

```bash
docker logs snapshotter-lite-v2-1234-devnet-UNISWAPV2-ETH -n 500
```

This will show you the last 500 lines of the snapshotter lite node container's logs.

### 2.3 Check the status of the `screen` session

If you have followed the instructions to run the node from the ['Getting Started'](./getting-started.md) section, you will have a `screen` session running with the name `snapshotter-devnet-node`.

Verify that the `screen` session is running using the following command:

```bash
screen -ls
```

If you see the `snapshotter-devnet-node` session running, you can attach to it using the following command:

```bash
screen -r snapshotter-devnet-node
```

If everything is working correctly, you should see at least one submission log in the terminal within 3 - 5 minutes, at the most. 

![Regular submissions](/images/RegularSubmission.png)

:::tip
`screen -R snapshotter-devnet-node` will also attach you to the `snapshotter-devnet-node` session, or create a new one if it doesn't exist.

This is the first step in the getting started section.
:::

### 2.4 Stop, kill and cleanup specific slots' runtimes


#### 2.4.1 Docker stop and remove containers
You can stop either the snapshotter lite node or the local collector container for specific slots using the following commands. Substitute your slot ID, the following examples are for slot ID `1234`.

```bash
docker ps --format '{{.Names}}' | grep '1234-devnet-UNISWAPV2-ETH' | xargs docker kill
docker ps --format '{{.Names}}' | grep '1234-devnet-UNISWAPV2-ETH' | xargs docker rm
```

To kill all containers running on Powerloom Devnet for a specific data market like UniswapV2 on Ethereum mainnet, you can use the following command:

```bash
docker ps --format '{{.Names}}' | grep 'devnet-UNISWAPV2-ETH' | xargs docker kill
docker ps --format '{{.Names}}' | grep 'devnet-UNISWAPV2-ETH' | xargs docker rm
```

#### 2.4.2 Remove screens

If you are using a single node setup, you can kill the screen session using the following command:

```bash
screen -X -S snapshotter-devnet-node quit
```

### 2.4 Editing the environment file

The environment file required to participate in a datamarket is located in the `powerloom-devnet` directory. It will contain the namespace `devnet` along with

* the data market name, for eg `UNISWAPV2` or `AAVEV3`
* the data market's data source chain, for eg `ETH` to determine whether the UniswapV2 data being captured is on Ethereum mainnet.

For the section below, we will assume the `.env-devnet-UNISWAPV2-ETH ` file. You can see the same file name showing up during the first few steps of running `./build.sh --devnet` if you have already completed the configuration.


:::note
Please be advised that the env file is named as `.env-devnet-<data-market-name>-<data-source-chain>` for nodes participating in the devnet. 

If this was the Aave V3 data market, for example, the env file would be named `.env-devnet-AAVEV3-ETH`.
:::

The `.env` file contains essential configuration details such as `SOURCE_RPC_URL`, `SIGNER_WALLET_ADDRESS`, `SIGNER_PRIVATE_KEY`, and `SLOT_ID`. Should you need to modify any of these variables, follow the steps below:


1. **Navigating to the Node Directory:**
   Change to the directory where your Powerloom Snapshotter Node is located:

```bash
   cd powerloom-devnet
```

3. **Editing the `.env-devnet-UNISWAPV2-ETH` File:**
   Open the `.env-devnet-UNISWAPV2-ETH` file for editing:

```bash
   nano .env-devnet-UNISWAPV2-ETH
```

1. **Modifying Variables:**
   Update the variables as needed. To save and exit, press `CTRL+X`.

2. **Rebuilding the Node:**
   In the same directory, rerun the `build.sh` script with the devnet flag to apply the changes. Execute the following command in the terminal:

```bash
   ./build.sh --devnet
```

This process allows you to easily update your node's configuration settings directly on the server.

---

### 2.5 Using the `build.sh --devnet` script to reconfigure the node

The `build.sh` script with the `--devnet` flag is a powerful tool that allows you to reconfigure the node with a single command. It will re-run the setup process, including the environment file update, and rebuild the node.

```bash
./build.sh --devnet
```

When it asks you whether you want to update the existing env file, select `y` to proceed.

:::warning Important
Always remember to use the `--devnet` flag when running `build.sh` for devnet nodes. This ensures your node connects to the Powerloom devnet chain instead of mainnet.
:::



### 2.6 Data source RPC URLs 
Sometimes, you may encounter errors related to the RPC URL you have configured to snapshot the data source, for eg UniswapV2 or Aave V3 data on Ethereum mainnet. Should this occur, it's important to verify that your RPC URL is accurate. For instructions on changing the RPC URL, please refer to the previously mentioned section.

While we can not recommend any specific RPC provider and would let the community decide on the best provider, there are several reliable and proven options, including:

- **Ankr**: `https://rpc.ankr.com/eth` - This is a public RPC service that does not require signup.
- **Infura**: Requires signup to obtain a key, which is ideal if you wish to monitor your RPC usage.
- **Alchemy**: Similar to Infura, signup is necessary to receive a key, offering the advantage of tracking your RPC usage.

---


## Additional Support

If you have followed these troubleshooting steps and still encounter issues, please contact us on [discord](https://discord.com/invite/powerloom) for further assistance. Our goal is to ensure your node runs smoothly, and we're here to help with any challenges you might face.

:::tip Devnet Tokens
If you need tokens for the Powerloom devnet chain, visit the faucet at https://devnet-faucet.powerloom.dev
:::