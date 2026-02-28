export const projects = [
  {
    id: "localaid-backend",
    slug: "localaid-backend",
    title: "Localaid Backend",
    shortDescription: "A robust API service layer for a hyper-local delivery platform, handling thousands of concurrent geographic queries. Designed with fault-tolerant patterns including circuit breakers and graceful degradation to maintain sub-50ms p99 latency under heavy load.",
    hasDeepDive: true,
    tags: ["Backend Services", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-08-15",
    image: "/assets/projects/localaid.webp"
  },
  {
    id: "distributed-id-generator",
    slug: "distributed-id-generator",
    title: "Snowflake ID Service",
    shortDescription: "A high-throughput, time-ordered unique ID generator inspired by Twitter Snowflake, built for distributed microservices. Generates 4M+ IDs/sec per node with zero coordination, guaranteeing k-sortable uniqueness across data centers.",
    hasDeepDive: true,
    tags: ["Distributed Systems", "Go", "gRPC", "Kubernetes"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-06-30",
    image: ""
  },
  {
    id: "infra-as-code-templates",
    slug: "terraform-aws-modules",
    title: "AWS Infrastructure Modules",
    shortDescription: "A collection of production-ready Terraform modules for provisioning secure VPCs, EKS clusters, and RDS instances. Follows AWS Well-Architected principles with built-in security guardrails and cost optimization.",
    hasDeepDive: false,
    tags: ["Cloud Infrastructure", "Terraform", "AWS", "GitHub Actions"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-01-20",
    image: ""
  },
  {
    id: "realtime-metrics",
    slug: "realtime-metrics-pipeline",
    title: "Real-time Metrics Pipeline",
    shortDescription: "An event-driven pipeline for ingesting, processing, and visualizing application telemetry data in real-time. Handles 500K events/sec with sub-second dashboard refresh using materialized views and streaming aggregations.",
    hasDeepDive: false,
    tags: ["Data Engineering", "Apache Kafka", "ClickHouse", "Grafana"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2024-11-10",
    image: "/assets/projects/metrics.webp"
  }
];
