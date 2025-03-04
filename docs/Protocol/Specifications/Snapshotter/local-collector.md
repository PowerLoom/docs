---
sidebar_position: 2
---

# Local Collector

The local collector service is a critical component responsible for reliably submitting snapshots generated at scale to the sequencer. It comes bundled with the snapshotter node distributions and is built with Go for optimal performance.

## Evolution from Legacy System

The local collector represents a significant evolution from the legacy payload commit service. While the previous system relied on HTTP submissions to relayers, the new architecture leverages libp2p for peer-to-peer communication with the sequencer.

:::info
The [legacy payload commit service](/Protocol/Specifications/Snapshotter/payload-commit-service.md) has been deprecated in favor of this more efficient and scalable solution.
:::

## Key Features

### 1. Reliable P2P Communication
- Uses libp2p for robust peer-to-peer communication
- Maintains persistent connections with sequencers
- Automatic connection recovery and retry mechanisms
- Support for multiple sequencer environments (production/staging)

### 2. Stream Management
- Implements a sophisticated stream pool for efficient message handling
- Configurable stream pool size and health checks
- Automatic stream recovery and cleanup
- Backoff strategies for connection retries

### 3. Performance Monitoring
- Detailed per-epoch metrics tracking
- Success rate monitoring
- Comprehensive logging with configurable levels
- Real-time health checks

### 4. Configuration Flexibility
- Environment-based configuration
- Customizable ports and connection parameters
- Support for different network environments
- Dynamic sequencer selection based on data market contract

## Architecture

### Stream Pool Management
The local collector maintains a pool of libp2p streams for efficient communication. The stream pool is designed to:
- Maintain multiple concurrent connections
- Handle automatic stream recovery
- Implement connection pooling for performance
- Manage stream lifecycle and cleanup

### Health Monitoring
The service includes comprehensive health monitoring:
- Stream health checks at configurable intervals
- Automatic recovery from connection failures
- Metrics collection for monitoring submission success rates
- Per-epoch performance tracking

### Security
- Supports private key-based authentication
- Secure communication channels
- Trusted relayer verification
- Environment-specific sequencer selection

## Configuration

Key configuration parameters include:

- `MAX_STREAM_POOL_SIZE`: Controls concurrent stream capacity (default: 2)
- `STREAM_POOL_HEALTH_CHECK_INTERVAL`: Defines health check frequency (default: 30s)
- `LOCAL_COLLECTOR_PORT`: Service port configuration (default: 50051)
- `DATA_MARKET_CONTRACT`: Target market contract address
- `DATA_MARKET_IN_REQUEST`: Controls market data inclusion in requests

## Deployment

The service is containerized and can be deployed using Docker. The image is optimized for performance using a multi-stage build process and minimal base image.

Environment variables can be configured through:
- `.env` file
- Docker environment variables
- Kubernetes configmaps
- Direct environment configuration

## Metrics and Monitoring

The local collector provides detailed metrics for monitoring:
- Submission success rates per epoch
- Connection health statistics
- Stream pool utilization
- Error rates and types
- Detailed per-epoch logging with success percentages

## Best Practices

1. **Configuration**
   - Set appropriate stream pool size based on load
   - Configure reasonable health check intervals
   - Use environment-specific sequencer endpoints
   - Monitor and adjust write timeouts as needed

2. **Monitoring**
   - Monitor success rates regularly
   - Watch for connection stability
   - Track epoch-specific metrics
   - Review log levels for appropriate visibility

3. **Maintenance**
   - Regular health check monitoring
   - Log analysis for potential issues
   - Periodic connection resets if needed
   - Keep configurations updated

## Future Enhancements

The local collector continues to evolve with planned improvements:
- Enhanced metric collection
- Advanced retry strategies
- Additional sequencer support
- Improved error handling mechanisms
- Dynamic stream pool sizing

:::tip
For optimal performance, ensure proper configuration of stream pool size and health check intervals based on your specific deployment requirements.
:::


