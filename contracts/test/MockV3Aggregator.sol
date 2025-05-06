// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Changed to 0.8.0 to match your project

import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MockV3Aggregator is AggregatorV3Interface {
    uint8 public immutable override decimals;
    int256 private s_answer;
    uint256 private s_version = 4;
    
    constructor(uint8 _decimals, int256 _initialAnswer) {
        decimals = _decimals;
        s_answer = _initialAnswer;
    }

    function description() external pure override returns (string memory) {
        return "Mock V3 Aggregator";
    }

    function version() external view override returns (uint256) {
        return s_version;
    }

    function getRoundData(uint80)
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, s_answer, block.timestamp, block.timestamp, 0);
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (0, s_answer, block.timestamp, block.timestamp, 0);
    }

    function updateAnswer(int256 newAnswer) external {
        s_answer = newAnswer;
    }
}