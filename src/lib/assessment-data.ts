export interface AssessmentQuestion {
  id: number;
  question: string;
  category: 'Anomaly Detection' | 'Time-Series Congestion' | 'SDN Architecture' | 'AI Taxonomy' | 'Adversarial Security' | 'Hardware & MCP';
  type: 'multiple-choice' | 'multi-select' | 'short-answer' | 'matrix-match';
  points: number;
  submittedAnswer: string | string[] | Record<string, string>;
  options?: string[];
  matrixRows?: { concept: string; application: string }[];
  rationale: string;
  mathFormula?: string;
  citations: string[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "Which machine learning approach is most commonly used for anomaly-based intrusion detection in enterprise networks?",
    category: "Anomaly Detection",
    type: "multiple-choice",
    points: 5,
    submittedAnswer: "Unsupervised learning",
    options: [
      "Unsupervised learning",
      "Supervised learning with static rules",
      "Deterministic routing protocols",
      "Symmetric encryption"
    ],
    rationale: "Enterprise intrusion detection systems (IDS) encounter novel, zero-day attacks with unlabelled traffic distributions. Supervised learning fails when encountering previously unseen malicious patterns, whereas unsupervised approaches (Autoencoders, Isolation Forests, One-Class SVM, k-Means clustering) construct a baseline profile of benign network behavior and flag statistical deviations (reconstruction error threshold excursions) without requiring pre-labeled ground truth.",
    mathFormula: "Reconstruction\\;Error:\\;\\mathcal{L}(x, \\hat{x}) = \\|x - g_\\theta(f_\\phi(x))\\|^2_2 > \\tau",
    citations: [
      "Mirsky et al., 'Kitsune: An Ensemble of Autoencoders for Online Network Intrusion Detection', NDSS 2018",
      "Chandola et al., 'Anomaly Detection: A Survey', ACM Computing Surveys, 2009"
    ]
  },
  {
    id: 2,
    question: "Select all techniques that are applicable for predicting network congestion using time-series traffic data.",
    category: "Time-Series Congestion",
    type: "multi-select",
    points: 5,
    submittedAnswer: [
      "Long Short-Term Memory networks",
      "Recurrent Neural Networks",
      "Convolutional Neural Networks applied to spectrograms"
    ],
    options: [
      "Long Short-Term Memory networks",
      "Recurrent Neural Networks",
      "Static packet filtering",
      "Convolutional Neural Networks applied to spectrograms"
    ],
    rationale: "Time-series network congestion prediction models sequential packet arrival rates, buffer occupancy, and round-trip times (RTT). Recurrent Neural Networks (RNNs) and Long Short-Term Memory (LSTM) units explicitly capture temporal dependencies and vanishing-gradient-resistant memory over long packet queues. Applying Short-Time Fourier Transforms (STFT) or wavelet transforms converts 1D temporal flows into 2D time-frequency spectrogram heatmaps, allowing Convolutional Neural Networks (CNNs) to extract multi-scale micro-burst signatures. Static packet filtering is an ACL rule-matching mechanism, not a predictive model.",
    mathFormula: "f_t = \\sigma(W_f [h_{t-1}, x_t] + b_f), \\quad S(t, \\omega) = \\left|\\int x(\\tau) w(\\tau - t) e^{-j\\omega\\tau} d\\tau\\right|^2",
    citations: [
      "Hochreiter & Schmidhuber, 'Long Short-Term Memory', Neural Computation, 1997",
      "Wang et al., 'End-to-End Encrypted Traffic Classification with One-Dimensional Convolutional Neural Networks', IEEE INFOCOM 2017"
    ]
  },
  {
    id: 3,
    question: "In software-defined networking, what is the term for the centralized controller that uses artificial intelligence to optimize traffic engineering?",
    category: "SDN Architecture",
    type: "short-answer",
    points: 5,
    submittedAnswer: "Intelligent SDN Controller",
    rationale: "In modern Software-Defined Networking (SDN) and Knowledge-Defined Networking (KDN) architectures, the centralized control plane entity that incorporates machine learning and reinforcement learning algorithms to dynamically compute optimal flow tables, allocate bandwidth, and preempt congestion is designated as an Intelligent SDN Controller (also known as a Cognitive SDN Controller or AI-driven SDN Controller). It interfaces with data plane switches via OpenFlow/P4 and ingests telemetry to execute global closed-loop traffic optimization.",
    mathFormula: "\\pi^* = \\arg\\max_\\pi \\mathbb{E}\\left[ \\sum_{t=0}^\\infty \\gamma^t R(s_t, a_t) \\right]",
    citations: [
      "Mestres et al., 'Knowledge-Defined Networking', ACM SIGCOMM CCR, 2017",
      "Al-Tamimi et al., 'Survey of AI-enabled Traffic Engineering in Software-Defined Networks', IEEE Access"
    ]
  },
  {
    id: 4,
    question: "Match the following AI concepts with their primary application in network security and management.",
    category: "AI Taxonomy",
    type: "matrix-match",
    points: 9,
    submittedAnswer: {
      "Reinforcement Learning": "Autonomous routing and path optimization",
      "Federated Learning": "Privacy-preserving threat intelligence sharing",
      "Natural Language Processing": "Parsing firewall logs for threat indicators"
    },
    matrixRows: [
      {
        concept: "Reinforcement Learning",
        application: "Autonomous routing and path optimization"
      },
      {
        concept: "Federated Learning",
        application: "Privacy-preserving threat intelligence sharing"
      },
      {
        concept: "Natural Language Processing",
        application: "Parsing firewall logs for threat indicators"
      }
    ],
    rationale: "1. Reinforcement Learning (RL) maps continuous network states to routing actions by rewarding path latency reduction, jitter minimisation, and link utilization balancing (e.g. Q-routing).\n2. Federated Learning (FL) allows distributed autonomous systems, enterprise datacenters, or telecom operators to train collaborative intrusion detection models without ever uploading raw sensitive packet payloads across organizational boundaries.\n3. Natural Language Processing (NLP) uses tokenizers and sequence models (e.g. BERT/LogBERT) to parse unstructured or semi-structured Syslog, pfSense/FortiGate firewall logs, and CVE alerts into actionable structured security indicators.",
    citations: [
      "McMahan et al., 'Communication-Efficient Learning of Deep Networks from Decentralized Data' (AISTATS 2017)",
      "Nedelkoski et al., 'Self-Attentive Classification-Based Anomaly Detection in Unstructured Logs', IEEE ICDCS 2020"
    ]
  },
  {
    id: 5,
    question: "What type of adversarial attack involves subtly modifying network traffic features to bypass machine learning-based classifiers without detection?",
    category: "Adversarial Security",
    type: "multiple-choice",
    points: 5,
    submittedAnswer: "Evasion attack",
    options: [
      "Evasion attack",
      "Poisoning attack",
      "Denial of service attack",
      "Man-in-the-middle attack"
    ],
    rationale: "An evasion attack (adversarial perturbation at inference time) subtly perturbs traffic metadata (such as packet size padding, inter-packet arrival time jitter, or TCP window manipulation) so that the feature vector crosses the classifier's decision boundary while leaving the malicious payload intact. Unlike poisoning attacks (which compromise training datasets), evasion attacks occur strictly post-deployment against a trained model.",
    mathFormula: "x_{adv} = x + \\delta, \\quad \\text{s.t. } \\|\\delta\\|_p \\le \\epsilon, \\quad f(x_{adv}) \\ne f(x)",
    citations: [
      "Goodfellow et al., 'Explaining and Harnessing Adversarial Examples', ICLR 2015",
      "Sheatsley et al., 'Adversarial Examples for Network Intrusion Detection Systems', ACM CCS"
    ]
  },
  {
    id: 6,
    question: "Have you worked on Networking Devices (Router, Switch, Firewall)?",
    category: "Hardware & MCP",
    type: "multiple-choice",
    points: 0,
    submittedAnswer: "Yes",
    options: ["No", "Yes"],
    rationale: "Hands-on experience configuring, automating, and monitoring enterprise routing protocols (BGP, OSPF, MPLS), multi-chassis switch fabrics (VLANs, LACP, VXLAN, Leaf-Spine), and next-gen stateful packet firewalls (FortiGate, pfSense, iptables, eBPF/XDP) via CLI, Netconf/YANG, and RESTCONF APIs.",
    citations: ["RFC 6241 - Network Configuration Protocol (NETCONF)", "RFC 8040 - RESTCONF Protocol"]
  },
  {
    id: 7,
    question: "Can you setup an MCP (Model Context Protocol) server for Networking Devices?",
    category: "Hardware & MCP",
    type: "multiple-choice",
    points: 0,
    submittedAnswer: "Yes",
    options: ["Yes", "No"],
    rationale: "Full architecture and implementation of an RFC/JSON-RPC 2.0 compliant Model Context Protocol (MCP) server. Exposes structured tools to AI agent runtimes (Claude Desktop, Cursor, Hermes, Brane) enabling LLMs to autonomously query telemetry, parse routing tables, predict congestion, trigger dynamic SDN path re-routing, and inject certified evasion defense ACL rules.",
    citations: ["Anthropic Model Context Protocol (MCP) Specification (v2024-11-05)"]
  }
];
