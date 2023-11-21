---
sidebar_position: 0
---

# Pooler - UniswapV2 Data Market

Pooler is a Uniswap specific implementation of what is known as a 'snapshotter' in the PowerLoom Protocol ecosystem. It synchronizes with other snapshotter peers over a smart contract running on the present version of the PowerLoom Protocol testnet. 

It follows an architecture that is driven by state transitions which makes it easy to understand and modify. 

This present release ultimately provide access to rich aggregates that can power a Uniswap v2 dashboard with the following data points:

-   Total Value Locked (TVL)
-   Trade Volume, Liquidity reserves, Fees earned
    -   grouped by
        -   Pair contracts
        -   Individual tokens participating in pair contract
    -   aggregated over time periods
        -   24 hours
        -   7 days
-   Transactions containing  `Swap`,  `Mint`, and  `Burn`  events