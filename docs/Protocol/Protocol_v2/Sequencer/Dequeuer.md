---
sidebar_position: 1
---
# Sequencer: Dequeuer

## Overview

![Dequeuer](/images/dequeuer-architecture.png)

The **Dequeuer** plays a pivotal role within the **Submission Sequencer** system, serving as the first step in the batch processing pipeline. It is responsible for dequeueing incoming snapshot submissions as accepted by the libp2p listener peer, verifiying and storing the submission data.

Key functionalities:

- **Extract Submissions:** Dequeue incoming snapshot submission details from the Submission Queue, which acts as a buffer for incoming data and process the dequeued details to ensure they are in a suitable format for further operations.
- **Verify Submissions:** Perform validation checks on the snapshot submission details to ensure their authenticity and integrity.
- **Store Submissions:** After verification, the processed data is securely stored in Redis, organized based on their respective submission headers for efficient categorization and retrieval.