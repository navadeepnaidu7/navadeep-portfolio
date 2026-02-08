<script>
  import { onMount } from "svelte";
  import expressjsIcon from "../assets/skills-logos/expressjs.svg";
  import flaskIcon from "../assets/skills-logos/flask.svg";
  import awsIcon from "../assets/skills-logos/aws.svg";
  import githubActionsIcon from "../assets/skills-logos/GitHub Actions.svg";
  import prismaIcon from "../assets/skills-logos/prisma.svg";
  import pandasIcon from "../assets/skills-logos/pandas.svg";

  const skillsCategories = {
    webdev: {
      title: "Web & Backend Development",
      blurb: "Interfaces, APIs, and scalable server logic.",
      skills: [
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
        {
          name: "CSS3",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
        },
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
      ],
    },
    devops: {
      title: "DevOps & Cloud",
      blurb: "Infrastructure, delivery, and cloud platforms.",
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
      ],
    },
    tools: {
      title: "Tools & Automation",
      blurb: "Workflow boosters and automation kits.",
      skills: [
        {
          name: "VS Code",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        },
        {
          name: "Vite",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
        },
        {
          name: "Webpack",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
        },
        {
          name: "Selenium",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
        },
        {
          name: "Postman",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
        },
        {
          name: "Figma",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
      ],
    },
    databases: {
      title: "Databases & AI",
      blurb: "Data modeling, queries, and analytics.",
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
  };

  // Function to handle rare image loading errors
  function handleImageError(event, techName) {
    console.log(`Failed to load icon for ${techName}`);
    event.target.onerror = null;
    // Create a text-based placeholder with first letters of the tech name
    const initials = techName
      .split(" ")
      .map((word) => word[0])
      .join("");
    event.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40"><rect width="100" height="100" rx="20" fill="rgba(255,255,255,0.1)"/><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">${initials}</text></svg>`;
  }

  // Animation on scroll
  let skillsSection;
  let visible = false;
  let activeCategory = Object.keys(skillsCategories)[0];

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true;
          } else {
            visible = false;
          }
        });
      },
      { threshold: 0.25 },
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
  <div class="skills-shell">
    <div class="section-heading">
      <h2 class="section-title">
        <i class="fas fa-code-branch section-icon"></i>
        <span>Skills</span>
      </h2>
      <p class="section-subtitle">
        Organized stacks that open into the tools I use daily.
      </p>
    </div>

    <div class="skills-layout">
      <nav class="skills-categories" aria-label="Skills categories">
        {#each Object.entries(skillsCategories) as [key, category]}
          <button
            class="category-tab"
            class:active={activeCategory === key}
            on:click={() => (activeCategory = key)}
            aria-expanded={activeCategory === key}
            aria-controls={"skills-panel-" + key}
            type="button"
          >
            <span class="tab-title">{category.title}</span>
          </button>
        {/each}
      </nav>

      <div class="skills-panels">
        {#each Object.entries(skillsCategories) as [key, category]}
          <div
            id={"skills-panel-" + key}
            class="skills-panel"
            class:active={activeCategory === key}
            aria-hidden={activeCategory !== key}
          >
            <div class="panel-header">
              <div>
                <h3 class="panel-title">{category.title}</h3>
                <p class="panel-subtitle">{category.blurb}</p>
              </div>
            </div>

            <div class="skills-list">
              {#each category.skills as skill}
                <div class="skill-tile">
                  <div class="skill-icon">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      on:error={(e) => handleImageError(e, skill.name)}
                    />
                  </div>
                  <span class="skill-label">{skill.name}</span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  #skills {
    position: relative;
    padding: 48px 24px 64px;
    color: rgba(255, 255, 255, 0.92);
    background: transparent;
    border-radius: 0;
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
    overflow: hidden;
    margin-bottom: 96px;
    isolation: isolate;
    border: none;
    min-height: auto;
  }

  #skills.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .skills-shell {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .section-heading {
    text-align: left;
    margin: 0 auto 40px;
    max-width: 1100px;
  }

  .section-title {
    margin: 0 0 12px 0;
    font-size: 2rem;
    font-weight: 600;
    color: rgba(245, 245, 250, 0.95);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 14px;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "Helvetica Neue", Helvetica, Arial, sans-serif;
    letter-spacing: -0.02em;
  }

  .section-icon {
    font-size: 1.75rem;
    color: rgba(255, 255, 255, 0.7);
  }

  .section-subtitle {
    max-width: 560px;
    margin: 0;
    font-size: 0.95rem;
    color: rgba(200, 200, 215, 0.7);
    line-height: 1.65;
    letter-spacing: 0;
  }

  .skills-layout {
    display: grid;
    grid-template-columns: minmax(200px, 240px) 1fr;
    gap: 32px;
    align-items: start;
  }

  .skills-categories {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-right: 1px solid rgba(255, 255, 255, 0.06);
    padding-right: 24px;
  }

  .category-tab {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    border-radius: 8px;
    background: transparent;
    border: none;
    border-left: 2px solid transparent;
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.92rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition:
      color 0.2s ease,
      border-color 0.2s ease,
      background 0.2s ease;
  }

  .category-tab:hover {
    color: rgba(255, 255, 255, 0.85);
    background: rgba(255, 255, 255, 0.03);
  }

  .category-tab.active {
    border-left-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.95);
  }

  .tab-title {
    z-index: 1;
  }

  .skills-panels {
    position: relative;
    min-height: 280px;
  }

  .skills-panel {
    display: none;
    flex-direction: column;
    gap: 24px;
    background: transparent;
    border-radius: 0;
    padding: 0;
    border: none;
    animation: panelReveal 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .skills-panel.active {
    display: flex;
  }

  @keyframes panelReveal {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .panel-header {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .panel-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: -0.01em;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
      "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .panel-subtitle {
    margin: 0;
    font-size: 0.9rem;
    color: rgba(200, 200, 215, 0.6);
    letter-spacing: 0;
  }

  .skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    padding-top: 8px;
  }

  .skill-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 16px 8px;
    border-radius: 10px;
    background: transparent;
    border: 1px solid transparent;
    text-align: center;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
    cursor: default;
  }

  .skill-tile:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
  }

  .skill-icon {
    height: 48px;
    width: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skill-icon img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    filter: none;
    transition: transform 0.2s ease;
  }

  .skill-tile:hover .skill-icon img {
    transform: scale(1.05);
  }

  .skill-label {
    font-size: 0.88rem;
    font-weight: 500;
    color: rgba(230, 230, 240, 0.85);
    letter-spacing: 0;
  }

  /* Responsive design */
  @media (max-width: 992px) {
    .skills-layout {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    .skills-categories {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 6px;
      border-right: none;
      padding-right: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      padding-bottom: 16px;
    }

    .category-tab {
      padding: 10px 14px;
      border-left: none;
      border-bottom: 2px solid transparent;
    }

    .category-tab.active {
      border-left-color: transparent;
      border-bottom-color: rgba(255, 255, 255, 0.5);
    }

    .skills-panels {
      min-height: auto;
    }
  }

  @media (max-width: 768px) {
    #skills {
      padding: 32px 16px 48px;
      margin-bottom: 64px;
    }

    .section-heading {
      margin-bottom: 32px;
    }

    .section-title {
      font-size: 1.75rem;
    }

    .section-subtitle {
      font-size: 0.9rem;
    }

    .skills-categories {
      gap: 4px;
    }

    .category-tab {
      padding: 8px 12px;
      font-size: 0.88rem;
    }

    .panel-title {
      font-size: 1.15rem;
    }

    .skills-list {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 8px;
    }

    .skill-tile {
      padding: 12px 6px;
    }

    .skill-icon img {
      width: 38px;
      height: 38px;
    }

    .skill-label {
      font-size: 0.82rem;
    }
  }

  @media (max-width: 480px) {
    #skills {
      padding: 24px 12px 40px;
    }

    .section-title {
      font-size: 1.5rem;
      gap: 10px;
    }

    .section-icon {
      font-size: 1.5rem;
    }

    .skills-list {
      grid-template-columns: repeat(3, 1fr);
    }

    .skill-tile {
      padding: 10px 4px;
    }

    .skill-icon img {
      width: 32px;
      height: 32px;
    }

    .skill-label {
      font-size: 0.78rem;
    }
  }
</style>
