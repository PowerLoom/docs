---
sidebar_position: 5
---

# Health Tracking

All the snapshotter implementations include internal APIs that offer a detailed view on the state of processing of projects as configured by data sources, per epoch.

You can tunnel into port `8002` of an instance running the snapshotter and right away try out the internal APIs among others by visting the FastAPI generated SwaggerUI.

## `GET /internal/snapshotter/epochProcessingStatus`

As detailed out in the section on [epoch processing state transitions](protocol/specifications/epoch#state-transitions), this internal API endpoint offers the most detailed insight into each epoch's processing status as it passes through the snapshot builders and is sent out for consensus.

> NOTE: The endpoint, though paginated and cached, serves a raw dump of insights into an epoch's state transitions and the payloads are significantly large enough for requests to timeout or to clog the internal API's limited resource. Hence it is advisable to query somewhere between 1 to 5 epochs. The same can be specified as the size query parameter.

### Sample request

```bash
curl -X 'GET' \
  'http://localhost:8002/internal/snapshotter/epochProcessingStatus?page=1&size=3' \
  -H 'accept: application/json'
```

### Sample response

```json
{
    "items": [
      {
        "epochId": 43523,
        "transitionStatus": {
          "EPOCH_RELEASED": {
            "status": "success",
            "error": null,
            "extra": null,
            "timestamp": 1692530595
          },
          "PRELOAD": {
            "pairContract_pair_total_reserves": {
              "status": "success",
              "error": null,
              "extra": null,
              "timestamp": 1692530595
            },
          },
          "SNAPSHOT_BUILD": {
            "aggregate_24h_stats_lite:35ee1886fa4665255a0d0486c6079c4719c82f0f62ef9e96a98f26fde2e8a106:UNISWAPV2": {
              "status": "success",
              "error": null,
              "extra": null,
              "timestamp": 1692530596
            },
          },
          "SNAPSHOT_SUBMIT_PAYLOAD_COMMIT": {

          },
         "RELAYER_SEND": {

         },
        "SNAPSHOT_FINALIZE": {

        },
      },
    }
   ],
   "total": 3,
   "page": 1,
   "size": 3,
   "pages": 1
}
```

## `GET /internal/snapshotter/status`

Returns the overall status of all the projects

### Sample request

```bash
curl -X 'GET' \
  'http://localhost:8002/internal/snapshotter/status' \
  -H 'accept: application/json'
```

### Sample response

```json
{
  "totalSuccessfulSubmissions": 10,
  "totalMissedSubmissions": 5,
  "totalIncorrectSubmissions": 1,
  "projects":[
    {
      "projectId": "projectid"
      "successfulSubmissions": 3,
      "missedSubmissions": 2,
      "incorrectSubmissions": 1
    },
  ]
}
```

## `GET /internal/snapshotter/status/{project_id}`

Returns project specific detailed status report with snapshot data

### Sample request

```bash
curl -X 'GET' \
  'http://localhost:8002/internal/snapshotter/status/project1122' \
  -H 'accept: application/json'
```

### Sample response

```json
{
  "missedSubmissions": [
    {
      "epochId": 10,
      "finalizedSnapshotCid": "cid",
      "reason": "error/exception/trace"
    }
  ],
  "incorrectSubmissions": [
    {
      "epochId": 12,
      "submittedSnapshotCid": "snapshotcid",
      "submittedSnapshot": {}
      "finalizedSnapshotCid": "finalizedsnapshotcid",
      "finalizedSnapshot": {},
      "reason": "reason for incorrect submission"
    }
  ]
}
```