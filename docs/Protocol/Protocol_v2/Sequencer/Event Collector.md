# Event Collector

## Overview

![Event Collector](/images/event-collector-architecture.png)

The Event Collector is a key component of the **Sequencer** system, responsible for interacting with the blockchain, processing events from detected blocks, and preparing data for downstream processing. Its primary role is to detect and parse critical events, aggregate event data into batches, and send these batches to the [**Finalizer**](/docs/Protocol/Protocol_v2/Sequencer/Finalizer.md) component for further actions.

By operating seamlessly within the broader system, the **Event Collector** ensures timely and reliable processing of blockchain data, which is critical for maintaining the integrity and accuracy of the Submission Sequencer.

Key functionalities:

- **Block Detection:** Continuously monitors the blockchain to fetch the latest blocks and process them sequentially.
- **Event Processing:** Extracts and processes logs from the detected blocks, focusing on parsing and storing specific event details such as details from the `EpochReleased` event.
- **Batch Preparation:** Aggregates the event data collected during event processing and organises it into structured batches for submission.
- **Batch Submission:** After batch preparation, the system constructs submission details and pushes these batches into the finalizer queue for further processing.

### Block Detection
The Event Collector actively monitors the blockchain to detect new blocks, maintaining real-time synchronization with the network. It begins by identifying the latest block and processes subsequent blocks in sequential order. Key details, such as block numbers and block hashes, are captured and stored in Redis, enabling efficient event processing and reliable data validation.

### Event Processing
Once a block is detected, the Event Collector extracts and processes the events emitted from the block, focusing on those critical to the Submission Sequencer system. These events include: 
- `EpochReleased`: Signals the release of a new epoch, triggering the start of batch submission for that epoch
- `SnapshotBatchSubmitted`: Signals that the sequencer has submitted a batch of snapshot submissions, including their claimed finalizations, for a specific epochID and data market
- `EndBatchSubmissions`: This event is emitted when the sequencer has completed submitting all snapshot batches for a specific epochID and data market

Using a filter query applied during block detection, the system retrieves logs associated with specific smart contract events. 

These logs are then parsed to extract event parameters, such as the epoch release block number, which is then used to calculate the submission limit block number by adding the submission window. 

```
submissionLimitBlockNumber := epochReleaseBlockNumber + submissionWindow
```

These epoch marker details are then stored in Redis for quick and efficient retrieval.

### Batch Preparation
This process involves monitoring stored epoch marker details to track progress toward submission limits. The Event Collector periodically checks these markers to identify when the current block number aligns with the calculated submission limit block number for a given epoch.

When a match is identified, it indicates the end of the submission window, prompting the system to initiate the batch preparation process. During this stage, collected event data is organized into structured batches, ensuring it is properly formatted and ready to be sent to the finalizer queue for further processing.

### Batch Submission
After the batches are organized, they are iterated over, and the relevant data is transformed into submission details. These details are then placed into the Finalizer Queue for further processing.

The [**Finalizer**](https://github.com/PowerLoom/submission-sequencer-finalizer), an auto-scaled component that follows, retrieves and processes data from the Finalizer Queue, completing the batch processing pipeline. This architecture enables the system to scale effectively, managing submission tasks in parallel and optimizing both performance and throughput.

## On-Chain Updates via Relayer

The Event Collector facilitates updates to the Protocol State Contract by sending critical data through the [**Relayer**](/docs/Protocol/Protocol_v2/relay.md). These updates ensure that the protocol's on-chain state remains consistent and synchronized:

### Reward Management
- **Intraday Updates:** Periodic updates containing slotIDs and eligible submission counts are transmitted to the Protocol State Contract via the relayer throughout the day.
- **Day Transition Updates:** At the end of the day, a final update is sent, including slotIDs, eligible submission counts, and the total number of eligible nodes, ensuring the protocol reflects the current state accurately.



