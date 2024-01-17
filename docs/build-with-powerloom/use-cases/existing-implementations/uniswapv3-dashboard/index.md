---
sidebar_position: 0
---

# Pooler - UniswapV3 Implementation Details

:::tip
Many of the details regarding architechture, extensability, and data points are the same for UniswapV3 and UniswapV2. Please refer to the [UniswapV2 documentation](docs/use-cases/existing-implementations/uniswapv2-dashboard/index) for this information. 
:::

There are several key functionalities required to power our UniswapV3 Dashboard. 
1. Pricing Token Assets
2. Tick Retreival
3. Token Reserves Calculation

## Pricing Token Assets

In order to accurately price tokens held in UniswapV3 pools, we use three methodologies. The relevant function to retreive a tokens price attempts each of these methodologies in the order presented to provide a robust token price retreival method. 

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/980451a6da104ca3f8bc3880df82bdad2ef37da1/utils/helpers.py#L266-L273
```

### 1inch OffchainOracle

Our primary token pricing method is the open source 1inch [OffchainOracle](https://github.com/1inch/spot-price-aggregator/blob/92ecd690dcd5b6c90fc413af2902d8c98bcfbabf/contracts/OffchainOracle.sol#L314-L316). We use the getRateToEthWithThreshold function to accurately aggregate prices from a number of on chain sources. 

### UniswapV3 WETH Pairs
Some tokens cannot be priced using the OffchainOracle. For these tokens, we look for a UniswapV3 WETH pair and retreive the current price of the token in terms of WETH. This is then converted to a human readable price and used for data point calculations

### UniswapV3 Stable Pairs
If no UniswapV3 WETH pair exists for a given token, we fallback to UniswapV3 Stable pairs. As above, we retreive the current price of the token and convert it to a human readable price for calculations. The stable coins supported are USDC, USDT, and DAI. 

## Tick Retreival

In order to calculate our Total Value Locked data point, we must retreive every populated tick in a given pool. We accomplish this by batching RPC state overload calls to a modified [1inch UniV3Helper](https://github.com/PowerLoom/evm-helpers/tree/pooler). Once we have retreived all populated ticks for a pool, we store this information in a redis cache. This functionality is implemented in the get_tick_info function:

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/980451a6da104ca3f8bc3880df82bdad2ef37da1/total_value_locked.py#L198-L206
```

## Token Reserves Calculation

Once we have retreived the relevant tick information, we then calculate an initial token reserves for the pool according to the formulas found [here](https://atiselsts.github.io/pdfs/uniswap-v3-liquidity-math.pdf). Once these initial reserves are calculated for the starting block in an epoch, we listen for liquidity events for all other blocks in an epoch and update reserves for each block as necessary. Once again, we store this information in redis. After the initial reserves have been calculated, we switch to only listening for liquidity events in future epochs to prevent unnecessary RPC calls. Our token reserves calculation implementation can be found in the calculate_tvl_from_ticks function: 

```python reference
https://github.com/PowerLoom/snapshotter-computes/blob/980451a6da104ca3f8bc3880df82bdad2ef37da1/total_value_locked.py#L46
```


For further questions and support, please reach out to us in [discord](https://powerloom.io/discord)!







