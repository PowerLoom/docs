---
sidebar_position: 0
---
# Protocol State

## State overview

Every [data market](/docs/protocol/data-sources) has a final state that includes, but is not limited to the following:

* Epoch size 
* Epochs released in the past
* Present epoch
* Allowed snapshotter identities
* To be implemented:
  * allowed validator identities
* Snapshot submission window
* Snapshot submissions from allowed snapshotters
* Project IDs on which submissions are accepted
* Snapshot submissions as content identifiers(CIDs) per epoch
  * occurrence count of their submissions
  * mapping between allowed snapshotter identities and the CIDs they submitted

## Implementation of the protocol state

Presently the protocol state is implemented as a smart contract on an EVM compatible chain that is affectionately referred to internally as the Prost Chain.

### Chain and contract address

Depending on the network being joined from the [`deploy`](https://github.com/Powerloom/deploy/) repository, you can find the details of the network RPC as well as the deployed contract address from the example [`env.example`](https://github.com/PowerLoom/deploy/blob/eth_india/env.example) file.

```bash reference
https://github.com/PowerLoom/deploy/blob/7708906fc606df2eff84642fe54d2c47bd9137ab/env.example#L10-L14
```

### ABI

The [Application Binary Interface(ABI) to interact with the smart contract](https://github.com/PowerLoom/pooler/blob/main/snapshotter/static/abis/ProtocolContract.json) can be found within the snapshotter repository.

### State modification functions
---

#### `function updateProjects(string[] calldata _projects, bool[] calldata _status) external onlyOwnerOrValidator`

Used by signalers and other actors in the [dynamic data market ecosystem](/docs/protocol/data-sources#dynamic-data-sources).

#### `function updateSnapshotters(address[] calldata _snapshotters, bool[] calldata _status) external onlyOwner`

Presently used to allow authorized snapshotters on our experimental testnets. To be deprecated soon with decentralized data markets.

#### `function updateValidators(address[] calldata _validators, bool[] calldata _status) external onlyOwner`

Self explanatory

#### `function forceSkipEpoch(uint256 begin, uint256 end) public onlyOwner`

Optional usage for an [additional trusted service](/docs/protocol/specifications/epoch#force-consensus-service) to ensure consensus is reached in case of unstable peers or actors in a data market.

#### `function releaseEpoch(uint256 begin, uint256 end) public onlyOwnerOrValidator`

Used by the [epoch generator service](/docs/protocol/specifications/epoch#epoch-generator).

#### `function submitSnapshot(string memory snapshotCid, uint256 epochId, string memory projectId, Request calldata request, bytes calldata signature) public`

Used to submit snapshots by the allowed [snapshotter](/docs/category/snapshotter) identities.

### State view functions
---

#### Self-explanatory

```solidity
uint8 public EPOCH_SIZE; // Number of Blocks in each Epoch
uint256 public SOURCE_CHAIN_ID;
uint256 public SOURCE_CHAIN_BLOCK_TIME; // Block time in seconds * 1e4 (to allow decimals)
uint256 public DeploymentBlockNumber;
bool public USE_BLOCK_NUMBER_AS_EPOCH_ID;
uint256 public snapshotSubmissionWindow = 1; // Number of blocks to wait before finalizing epoch

uint256 public minSubmissionsForConsensus = 2; // Minimium number of snapshots for consensus
```

#### Epoch Information

```solidity
mapping(uint256 => EpochInfo) public epochInfo;

struct EpochInfo {
    uint256 timestamp;
    uint256 blocknumber;
    uint256 epochEnd;
}
```

#### Snapshot submission information

```solidity
mapping(string => mapping(uint256 => uint256)) public maxSnapshotsCount;
mapping(string => mapping(uint256 => string)) public maxSnapshotsCid;
mapping(string => mapping(uint256 => ConsensusStatus)) public snapshotStatus;
```

#### Allowed projects and snapshotters

```solidity
mapping(string => bool) public projects;
mapping(address => bool) public snapshotters;
```

#### Events

```solidity
event SnapshottersUpdated(address snapshotterAddress, bool allowed);
event ProjectsUpdated(string projectId, bool allowed, uint256 enableEpochId);
event ValidatorsUpdated(address validatorAddress, bool allowed);

// snapshotters listen to this event, generate snapshots and submit to contract
event EpochReleased(uint256 indexed epochId, uint256 begin, uint256 end, uint256 timestamp);

event SnapshotSubmitted(address indexed snapshotterAddr, string snapshotCid, uint256 indexed epochId, string projectId, uint256 timestamp);

event DelayedSnapshotSubmitted(address indexed snapshotterAddr, string snapshotCid, uint256 indexed epochId, string projectId, uint256 timestamp);

event SnapshotFinalized(uint256 indexed epochId, uint256 epochEnd, string projectId, string snapshotCid, uint256 timestamp);
```

## See Also
---

* [Build with Powerloom – All about data](/docs/build-with-powerloom/snapshotter-node/data.md#verifying-data)
