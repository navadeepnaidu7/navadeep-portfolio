export const projects = [
  {
    id: "localaid-backend",
    slug: "localaid-backend",
    title: "Localaid Backend",
    category: "Backend Services",
    shortDescription: "A robust API service layer for a hyper-local delivery platform, handling thousands of concurrent geographic queries.",
    hasDeepDive: true,
    techStack: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-08-15",
    image: "/assets/projects/localaid.webp" // Replace with actual image path
  },
  {
    id: "distributed-id-generator",
    slug: "distributed-id-generator",
    title: "Snowflake ID Service",
    category: "Distributed Systems",
    shortDescription: "A high-throughput, time-ordered unique ID generator inspired by Twitter Snowflake, built for distributed microservices.",
    hasDeepDive: true,
    techStack: ["Go", "gRPC", "Kubernetes"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-06-30",
    image: "/assets/projects/snowflake.webp" // Replace with actual image path
  },
  {
    id: "infra-as-code-templates",
    slug: "terraform-aws-modules",
    title: "AWS Infrastructure Modules",
    category: "Cloud Infrastructure",
    shortDescription: "A collection of production-ready Terraform modules for provisioning secure VPCs, EKS clusters, and RDS instances.",
    hasDeepDive: false,
    techStack: ["Terraform", "AWS", "GitHub Actions"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-01-20",
    image: "/assets/projects/infrastructure.webp" // Replace with actual image path
  },
  {
    id: "realtime-metrics",
    slug: "realtime-metrics-pipeline",
    title: "Real-time Metrics Pipeline",
    category: "Data Engineering",
    shortDescription: "An event-driven pipeline for ingesting, processing, and visualizing application telemetry data in real-time.",
    hasDeepDive: false,
    techStack: ["Apache Kafka", "ClickHouse", "Grafana"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2024-11-10",
    image: "/assets/projects/metrics.webp" // Replace with actual image path
  }
];
