<script>
  import { onMount } from "svelte";
  import expressjsIcon from "../assets/skills-logos/expressjs.svg";
  import flaskIcon from "../assets/skills-logos/flask.svg";
  import awsIcon from "../assets/skills-logos/aws.svg";
  import githubActionsIcon from "../assets/skills-logos/GitHub Actions.svg";
  import prismaIcon from "../assets/skills-logos/prisma.svg";
  import pandasIcon from "../assets/skills-logos/pandas.svg";

  // Reorganized for better visual balance if needed, but keeping keys
  const skillsCategories = [
    {
      id: "backend",
      title: "Backend & Web Systems",
      description: "High-performance architectures & scalable APIs.",
      span: 2,
      skills: [
        {
          name: "Node.js",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        { name: "Express.js", icon: expressjsIcon },
        {
          name: "FastAPI",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
        },
        { name: "Flask", icon: flaskIcon },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Svelte",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
        },
        {
          name: "HTML5",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        },
      ],
    },
    {
      id: "devops",
      title: "Cloud & DevOps",
      description: "Orchestration & CI/CD pipelines.",
      skills: [
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
        {
          name: "Kubernetes",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
        },
        { name: "AWS", icon: awsIcon },
        {
          name: "Terraform",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
        },
        { name: "GitHub Actions", icon: githubActionsIcon },
        {
          name: "Ansible",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
        },
      ],
    },
    {
      id: "databases",
      title: "Data & Persistence",
      description: "Optimized storage & complex queries.",
      skills: [
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        },
        { name: "Prisma", icon: prismaIcon },
        {
          name: "GraphQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        },
        { name: "Pandas", icon: pandasIcon },
      ],
    },
  ];

  const workflowTools = [
    {
      name: "VS Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Postman",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    },
    {
      name: "Vite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    },
    {
      name: "Claude Code",
      icon: "https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg",
    },
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    }, // Placeholder for 'Workflow' vibe
  ];

  function handleImageError(event, techName) {
    event.target.onerror = null;
    const initials = techName
      .split(" ")
      .map((w) => w[0])
      .join("");
    event.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40"><rect width="100" height="100" rx="20" fill="rgba(255,255,255,0.1)"/><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">${initials}</text></svg>`;
  }

  let skillsSection;
  let visible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          }
        });
      },
      { threshold: 0.1 },
    );

    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  });
</script>

<section id="skills" bind:this={skillsSection} class:visible>
  <div class="content-wrapper">
    <div class="header-group">
      <h2 class="section-title">Skills</h2>
      <p class="section-subtitle">My tech stack & tools.</p>
    </div>

    <div class="bento-grid">
      {#each skillsCategories as category, i}
        <div
          class="bento-card {category.span === 2 ? 'span-2' : ''}"
          style="--delay: {i * 0.1}s"
        >
          <div class="card-header">
            <h3>{category.title}</h3>
            <p>{category.description}</p>
          </div>
          <div class="skills-cluster">
            {#each category.skills as skill}
              <div class="skill-pill">
                <div class="icon-wrapper">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    on:error={(e) => handleImageError(e, skill.name)}
                  />
                </div>
                <span>{skill.name}</span>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Minimal Workflow Strip -->
    <div class="workflow-strip">
      <span class="workflow-label">Workflow:</span>
      <div class="workflow-icons">
        {#each workflowTools as tool}
          <div class="workflow-item" title={tool.name}>
            <img
              src={tool.icon}
              alt={tool.name}
              on:error={(e) => handleImageError(e, tool.name)}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  #skills {
    padding: 100px 20px;
    position: relative;
    overflow: hidden;
  }

  .content-wrapper {
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Header */
  .header-group {
    margin-bottom: 60px;
    text-align: center;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #fff;
    margin: 0 0 16px 0;
    background: linear-gradient(to right, #fff, #a5a5a5);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  .section-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.6);
    margin: 0 auto;
    max-width: 500px;
    line-height: 1.5;
  }

  /* Bento Grid */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    perspective: 1000px;
  }

  .bento-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 24px;
    padding: 32px;
    backdrop-filter: blur(10px);
    transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    opacity: 0;
    transform: translateY(30px);
    transition-delay: var(--delay);
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .bento-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
  }

  .span-2 {
    grid-column: span 2;
  }

  .card-header h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 8px 0;
    letter-spacing: -0.01em;
  }

  .card-header p {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
  }

  /* Skills Cluster */
  .skills-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .skill-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: all 0.2s ease;
    user-select: none;
  }

  .skill-pill:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .icon-wrapper {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .skill-pill span {
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.85);
  }

  /* Animation States */
  #skills.visible .header-group {
    opacity: 1;
    transform: translateY(0);
  }

  #skills.visible .bento-card {
    opacity: 1;
    transform: translateY(0);
  }

  /* Workflow Strip */
  .workflow-strip {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: 0.4s;
    padding: 20px 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 100px;
    width: 100%;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  #skills.visible .workflow-strip {
    opacity: 1;
    transform: translateY(0);
  }

  .workflow-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    text-transform: none;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .workflow-icons {
    display: flex;
    gap: 24px;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }

  .workflow-item {
    width: 32px;
    height: 32px;
    opacity: 0.7;
    transition: all 0.2s ease;
    filter: grayscale(100%);
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .workflow-item:hover {
    opacity: 1;
    filter: grayscale(0%);
    transform: scale(1.1);
  }

  .workflow-item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .bento-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .span-2 {
      grid-column: span 1;
    }

    .section-title {
      font-size: 2rem;
    }

    .bento-card {
      padding: 24px;
    }

    .workflow-strip {
      flex-direction: column;
      gap: 12px;
      border-radius: 20px;
      width: 100%;
    }
  }
</style>
