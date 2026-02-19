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
      title: "What I build with",
      description: "Frameworks, languages & the full stack.",
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
      title: "How I ship it",
      description: "Infrastructure, pipelines & the cloud.",
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
      title: "Where I store it",
      description: "Databases, ORMs & data tools.",
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
    {
      id: "projects",
      title: "Currently building",
      description: "What I'm working on right now.",
      span: 2,
      projects: [
        { name: "Project Alpha", url: "#" },
        { name: "Project Beta", url: "#" },
        { name: "Project Gamma", url: "#" },
      ],
    },
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
  let rafId = null;

  function handleMouseMove(e) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const cards = document.querySelectorAll(".bento-card");
      for (const card of cards) {
        if (card instanceof HTMLElement) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      }
      rafId = null;
    });
  }

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
      <h2 class="section-title">My Tech Stack</h2>
    </div>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="bento-grid" role="presentation" on:mousemove={handleMouseMove}>
      {#each skillsCategories as category, i}
        <div
          class="bento-card {category.span === 2 ? 'span-2' : ''}"
          style="--delay: {i * 0.1}s"
        >
          <div
            class="card-content {category.id === 'projects'
              ? 'project-content'
              : ''}"
          >
            <div class="card-header">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
            {#if category.id === "projects"}
              <div class="project-links">
                {#each category.projects as project}
                  <a
                    href={project.url}
                    class="project-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{project.name}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 12L12 4M12 4H5M12 4V11"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                {/each}
              </div>
            {:else}
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
            {/if}
          </div>
        </div>
      {/each}
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
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 3.2rem;
    font-weight: 300;
    color: #fff;
    margin: 0 0 12px 0;
    letter-spacing: 0.02em;
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
    position: relative;
    background: rgba(15, 15, 15, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 24px;
    backdrop-filter: blur(12px);
    transition:
      transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
      border-color 0.3s ease,
      opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1);
    opacity: 0;
    transform: translateY(30px);
    transition-delay: var(--delay);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    --mouse-x: -1000px;
    --mouse-y: -1000px;
  }

  /* Glowing Border – soft, wide radial that only shows through the 1px border ring */
  .bento-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.35),
      rgba(255, 255, 255, 0.08) 25%,
      transparent 50%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  .bento-grid:hover .bento-card::before {
    opacity: 1;
  }

  .card-content {
    position: relative;
    border-radius: inherit;
    padding: 32px;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .bento-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .span-2 {
    grid-column: span 2;
  }

  .card-header h3 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 1.55rem;
    font-weight: 300;
    color: #fff;
    margin: 0 0 8px 0;
    letter-spacing: 0.02em;
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

  /* Projects card – horizontal bar with links */
  .project-content {
    flex-direction: row;
    align-items: center;
    gap: 32px;
  }

  .project-content .card-header {
    white-space: nowrap;
    flex-shrink: 0;
  }

  .project-links {
    display: flex;
    align-items: center;
    gap: 16px;
    flex: 1;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .project-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 18px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 100px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.25s ease;
    white-space: nowrap;
  }

  .project-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
    transform: translateY(-2px);
  }

  .project-link svg {
    opacity: 0.5;
    transition: all 0.25s ease;
  }

  .project-link:hover svg {
    opacity: 1;
    transform: translate(2px, -2px);
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

    .card-content {
      padding: 24px;
    }

    .project-content {
      flex-direction: column;
      gap: 20px;
    }

    .project-content .card-header {
      white-space: normal;
      text-align: center;
    }
  }
</style>
