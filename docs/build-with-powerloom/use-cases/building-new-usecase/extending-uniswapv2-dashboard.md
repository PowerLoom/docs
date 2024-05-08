---
sidebar_position: 0
---
# Extending Uniswap V2 dashboard usecase

This documentation provides a step-by-step guide for developers looking to extend the functionality of the UniswapV2 Dashboard use case, specifically focusing on implementing new data points. The goal is to empower developers to enhance the dashboard with custom features, making it a valuable tool in hackathons and blockchain analytics.

## Extending with New Data Points

:::tip
Prerequisites: Before we dive into the implementation of new data points, you may want to look at the concept of how the pooler functions and how it retrieves and processes the data. 

[Closer look into the Snapshot Datasets](/docs/build-with-powerloom/use-cases/existing-implementations/uniswap-dashboard/closer-look-at-snapshots)
:::

### Scenario: 2-Hour Aggregate of Swap Events

We'll use the example of creating a new data point that aggregates only Swap events over a 2-hour period. This involves capturing snapshots of Swap event logs and trade volumes within this timeframe.

### Steps to Implement this New Data Point

1. **Getting Started**:
   You can follow [this guide](/docs/build-with-powerloom/snapshotter-node/full-node/getting-started#for-code-contributors) to get started with the node setup for custom implementations.

2. **Configure Aggregation Worker**:
   In the `config/aggregator.json` file of your forked repository, add a new entry for your aggregation worker class. This class will be responsible for handling the new data aggregation task.
   - Define the `project_type` as something like `"aggregate_swap_events_2h"`.
   - Set `"aggregate_on"` to `"SingleProject"` or `"MultiProject"` depending on your aggregation logic.
   - Under `"processor"`, specify the module and class name of your new processor.
```json 
{
  "config": [
    // ... existing configurations ...
    {
      "project_type": "aggregate_swap_events_2h",
      "aggregate_on": "SingleProject",
      "processor": {
        "module": "snapshotter.modules.computes.aggregate.swap_event_2h",
        "class_name": "AggregateSwapEventProcessor"
      }
    }
    // ... additional configurations ...
  ]
}
```

1. **Create a New Data Model**:
   Develop a new data model in [`utils/message_models.py`](https://github.com/Powerloom/snapshotter-computes/blob/eth_uniswapv2/utils/models/message_models.py). Use existing models like `UniswapTradesAggregateSnapshot` and `UniswapTradesSnapshot` as references. Your model should be tailored to capture and represent data specific to the 2-hour Swap event aggregation.

2. **Focus on 2-Hour Time Span and Swap Events**:
   Modify the data collection logic to concentrate on a 2-hour time span (`epochId`). Ensure that your implementation is set to extract only Swap event logs and their associated trade volumes. Refer to the existing 24-hour aggregation example for guidance on structuring your logic.

3. **Testing and Validation**:
   After implementation, rigorously test your new feature to ensure accuracy and efficiency. Validate that the data collected aligns with your intended 2-hour aggregation of Swap events.

4. **Commit and Share Your Work**:
   Once your implementation is complete and tested, commit your changes to your implementation branch. Share your work with the community by creating a pull request to the main Computes repository, if desired.

## Why Extend the UniswapV2 Dashboard?

Extending the UniswapV2 Dashboard is an excellent opportunity for developers to:

- **Contribute to Open Source**: Enhance a widely-used tool and give back to the community.
- **Learn and Experiment**: Gain hands-on experience with blockchain data and smart contract interactions.
- **Create Custom Analytics**: Tailor the dashboard to specific analytical needs, making it more versatile and useful.
- **Showcase Skills**: Use the extended dashboard as a portfolio piece in hackathons and professional settings.

Extending the UniswapV2 Dashboard with new data points like a 2-hour aggregate of Swap events is an exciting thing to work on. It requires a good understanding of blockchain data, smart contract events, and data modeling. By following the steps outlined in this guide, developers can successfully enhance the dashboard, making it a more powerful tool for blockchain analytics and research.

If you have any questions while building / integrating, you can reach us out on our [discord](https://powerloom.io/discord).
