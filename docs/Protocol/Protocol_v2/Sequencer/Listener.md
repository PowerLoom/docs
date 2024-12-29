---
sidebar_position: 1
---
# Sequencer: Listener

## Overview

![Libp2p Listener](/images/listener-architecture.png)

The **Libp2p Submission Sequencer Listener** serves as the first step within the **Submission Sequencer** system. It is specifically designed to listen for and process snapshot submissions efficiently in a decentralized network. This component leverages the libp2p networking library to provide robust and scalable peer-to-peer functionality and integrates with the Distributed Hash Table (DHT) for decentralized peer discovery. Additionally, it also integrates with Redis, ensuring submission data is marshalled and pushed to Submission Queue for further processing.

Key functionalities:

- **Efficient Snapshot Submission Handling:** Listens for and processes snapshot submissions in a decentralized network, ensuring timely and accurate handling of incoming data.
- **Peer-to-Peer Networking:** Utilizes the libp2p library to establish and maintain robust and scalable peer-to-peer connections, enabling seamless communication between nodes.
- **Decentralized Peer Discovery:** Leverages a Distributed Hash Table (DHT) for dynamic and decentralized peer discovery, ensuring high availability and network resilience.
- **Redis Integration:** Seamlessly integrates with Redis to marshal submission data and push it to the Submission Queue for subsequent processing. This ensures data persistence and efficient queue management.