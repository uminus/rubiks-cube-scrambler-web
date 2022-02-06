# Rubik's Cube Scrambler
[DEMO](https://uminus-scrambler.herokuapp.com/)

## Overview
Send a scramble every 30 seconds using WebSocket.
And the scramble sent is the same for all clients.

## Requirements
- nodejs v17+
- npm v7+
- pnpm v5+ (Only required for development.)

## Usage
```shell
npm install
npm build
npm run start
```

## API
TBD
### WebSocket /ws
Message format: `EpochTime|SCRAMBLE`

```
1643452860006|R F2 B R D' B2 R2 D' F' L2 U L' F L F U
```

## Licence
MIT