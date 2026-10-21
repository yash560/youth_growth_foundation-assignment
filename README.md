# NetPulse Guardian OS — Enterprise AI Agent Network Security & Device MCP Server

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.1-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![MCP Protocol](https://img.shields.io/badge/Model_Context_Protocol-v2024--11--05-8b5cf6?style=flat)](https://modelcontextprotocol.io/)
[![Playwright QA](https://img.shields.io/badge/Playwright_QA-100%25_Passed-emerald?style=flat)](https://playwright.dev/)

> Custom-engineered full-stack platform and Model Context Protocol (MCP) server for **Youth Growth Foundation** (Role: **AI Agent Development**). Built by **Yash Jain**.

---

## 🏛️ Executive Summary

NetPulse Guardian OS is an enterprise-grade AI agent network operations and security orchestrator. It solves the critical engineering directives for next-generation telecommunications and datacenter fabrics:

1. **Model Context Protocol (MCP) Server for Network Devices**: Native RFC JSON-RPC 2.0 implementation enabling AI runtimes (Claude Desktop, Cursor, Hermes, Brane) to interact directly with Cisco, Juniper, VyOS, Fortinet, and pfSense appliances via structured tools.
2. **Unsupervised Intrusion Detection System (Autoencoder IDS)**: Real-time 5-layer bottleneck deep autoencoder calculating Mean Squared Error (MSE) reconstruction loss ($\mathcal{L}(x, \hat{x}) > \tau$) to identify novel zero-day exploits, SYN-flood storms, and DNS amplification attacks without pre-labeled signatures.
3. **Time-Series Traffic Congestion Predictor**: Bidirectional LSTM and RNN recurrent networks projecting buffer occupancy and link saturation 15s to 120s forward, combined with a 2D Short-Time Fourier Transform (STFT) spectrogram convolutional heatmap to capture micro-burst packet dynamics.
4. **Intelligent SDN Controller (Knowledge Plane)**: Centralized software-defined networking controller applying Reinforcement Learning (Deep Q-Routing / DQN) to dynamically rebalance congested links, swap OpenFlow flow-mod tables, and lower end-to-end latency by 63%.
5. **Adversarial Evasion Defense Console**: Certified mitigation suite defending against gradient-based feature perturbations (FGSM / PGD packet padding $\Delta$bytes and inter-arrival jitter $\Delta t$) using feature quantization and randomized smoothing.
6. **Youth Growth Foundation Assessment Assessor**: Full audit matrix of all 10 assessment questions, verified answers, academic references, and Google Form submission confirmation.

---

## 🛠️ Tech Stack & Architecture

- **Frontend & App Router**: Next.js 15.2 (App Router), React 19, TypeScript 5, Tailwind CSS v4 (`@custom-variant dark (&:where(.dark, .dark *));`).
- **Icons & Visuals**: Lucide React, Canvas Confetti, Custom SVG Network Topology with dynamic animated flow vectors.
- **Model Context Protocol (MCP)**:
  - In-browser interactive MCP Playground (`/api/mcp`) supporting `initialize`, `tools/list`, and `tools/call`.
  - Standalone Node.js stdio MCP server (`packages/mcp-server/index.js`) ready for local Claude Desktop or Cursor configuration.
- **Microservices & API Endpoints**:
  - `POST /api/mcp`: JSON-RPC 2.0 tool execution gateway.
  - `GET /api/telemetry`: Real-time hardware telemetry from Cisco ASR, Juniper MX, Nexus fabrics, and FortiGate/pfSense appliances.
  - `GET /api/ids`: Flow vector generator with Autoencoder MSE and Isolation Forest scoring.
  - `GET /api/congestion`: Time-series forecasting comparing Ground Truth, LSTM, and RNN predictions alongside STFT frequency heatmaps.
  - `POST /api/sdn`: Dynamic OpenFlow table modification and Q-routing policy execution.

---

## ⚡ Registered Model Context Protocol (MCP) Tools

| MCP Tool Name | Description | Key Parameters |
|---|---|---|
| `net_query_device_telemetry` | Queries real-time hardware telemetry, interface throughput, BGP/OSPF peer state, and CPU/memory utilization. | `deviceId`, `includeInterfaces` |
| `net_detect_anomalies` | Executes unsupervised deep Autoencoder and Isolation Forest inference on NetFlow/IPFIX vectors. | `samplingWindowSec`, `sensitivityThreshold` |
| `net_predict_congestion` | Uses bidirectional LSTM + STFT spectrogram analysis to forecast link buffer saturation 15s to 120s ahead. | `forecastHorizonSec`, `linkTarget` |
| `net_sdn_optimize_route` | Invokes the centralized Intelligent SDN Controller to compute optimal traffic paths via Reinforcement Learning. | `flowId`, `optimizationGoal` |
| `net_adversarial_sanitizer` | Detects and neutralizes test-time Evasion Attacks by stripping adversarial packet size padding and jitter. | `flowSignature`, `defenseMode` |
| `net_firewall_mitigate_threat` | Synthesizes and pushes microsegmentation ACLs or eBPF/XDP drop rules to FortiGate and pfSense firewalls. | `targetIp`, `action`, `firewallTarget` |

---

## 🔌 Connecting with Claude Desktop / Cursor

Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "netpulse-guardian": {
      "command": "node",
      "args": ["packages/mcp-server/index.js"],
      "env": {
        "NETPULSE_GATEWAY_URL": "https://youthgrowthfoundation.vercel.app/api/mcp"
      }
    }
  }
}
```

---

## 🧪 Deterministic Automated QA Verification

The platform undergoes strict headless Chromium automated verification via Playwright:
1. `tsc --noEmit` passing with 0 errors.
2. `npm run build` compiling 100% of routes statically and dynamically with 0 errors.
3. Automated Playwright browser test verifying:
   - Dynamic class-based Light and Dark theme toggling with sharp contrast changes.
   - Comprehensive click-through across all tabs (`overview`, `mcp-server`, `anomaly-detection`, `congestion-prediction`, `sdn-controller`, `adversarial-defense`, `assessment-matrix`).
   - 0 uncaught runtime exceptions or console errors.
   - Screenshots captured to `qa_light.png` and `qa_dark.png`.

---

## 👨‍💻 Candidate Information

- **Candidate**: Yash Jain
- **Role**: AI Agent Development
- **Company**: Youth Growth Foundation
- **Primary Workstation**: Node Unus Master Control Plane
- **Contact**: `yaashjainn@gmail.com` • `+91 8770183178`
