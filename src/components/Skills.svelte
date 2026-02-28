<script>
  import { onMount } from "svelte";
  import expressjsIcon from "../assets/skills-logos/expressjs.svg";
  import flaskIcon from "../assets/skills-logos/flask.svg";
  import awsIcon from "../assets/skills-logos/aws.svg";
  import githubActionsIcon from "../assets/skills-logos/GitHub Actions.svg";
  import prismaIcon from "../assets/skills-logos/prisma.svg";
  import pandasIcon from "../assets/skills-logos/pandas.svg";

  const skillsCategories = [
    {
      id: "backend",
      title: "What I build with",
      description: "Frameworks, languages & the full stack.",
      span: 2,
      accent: "#818cf8",
      skills: [
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express.js", icon: expressjsIcon },
        { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
        { name: "Flask", icon: flaskIcon },
        { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Svelte", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" },
        { name: "GoLang", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
      ],
    },
    {
      id: "devops",
      title: "How I ship it",
      description: "Infrastructure, pipelines & the cloud.",
      accent: "#22d3ee",
      skills: [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { name: "AWS", icon: awsIcon },
        { name: "Terraform", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
        { name: "GitHub Actions", icon: githubActionsIcon },
        { name: "Ansible", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg" },
      ],
    },
    {
      id: "databases",
      title: "Where I store it",
      description: "Databases, ORMs & data tools.",
      accent: "#a78bfa",
      skills: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Prisma", icon: prismaIcon },
        { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
        { name: "Pandas", icon: pandasIcon },
      ],
    },
    {
      id: "exploring",
      title: "Currently exploring",
      description: "Technologies on my radar right now.",
      span: 2,
      accent: "#fbbf24",
      skills: [
        { name: "gRPC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grpc/grpc-original.svg" },
        { name: "Redis", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
        { name: "Kafka Streams", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg" },
      ],
    },
  ];

  function handleImageError(event, techName) {
    event.target.onerror = null;
    const initials = techName.split(" ").map((w) => w[0]).join("");
    event.target.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="40" height="40"><rect width="100" height="100" rx="20" fill="rgba(255,255,255,0.1)"/><text y="50%" x="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white">${initials}</text></svg>`;
  }

  let skillsSection;
  let visible = false;
  let rafId = null;

  function handleMouseMove(e) {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const cards = skillsSection?.querySelectorAll(".bento-card");
      if (!cards) return;
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      }
      rafId = null;
    });
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !visible) {
          visible = true;
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.12, rootMargin: "0px" },
    );
    if (skillsSection) observer.observe(skillsSection);
    return () => { if (skillsSection) observer.disconnect(); };
  });
</script>

<section id="skills" bind:this={skillsSection}>
  <!-- Ambient background -->
  <div class="skills-bg">
    <div class="ambient-glow"></div>
    <div class="grid-pattern"></div>
  </div>

  <div class="container" class:animate={visible}>
    <!-- Header — matches Work section pattern -->
    <div class="elegant-intro">
      <div class="line-mask">
        <h2 class="main-line">I Wield.</h2>
      </div>
      <div class="line-mask serif-mask">
        <h2 class="serif-line">The Stack Behind It.</h2>
      </div>
      <p class="sub-text">
        Every framework, platform, and tool I rely on — chosen deliberately,
        wielded to build systems that hold up at scale.
      </p>
    </div>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="bento-grid" role="presentation" on:mousemove={handleMouseMove}>
      {#each skillsCategories as category, i}
        <div
          class="bento-card {category.span === 2 ? 'span-2' : ''}"
          style="--delay: {0.15 + i * 0.1}s; --accent: {category.accent}"
        >
          <div class="card-content">
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
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  /* ══════════════════════════════════════════════════
     SECTION — Background & Layout
     ══════════════════════════════════════════════════ */
  #skills {
    padding: 130px 20px 100px;
    position: relative;
    z-index: 10;
    width: 100%;
    overflow: hidden;
    background: radial-gradient(
      circle at 50% 0%,
      rgba(15, 18, 25, 1) 0%,
      #030207 100%
    );
  }

  .skills-bg {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .ambient-glow {
    position: absolute;
    top: 0;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.08),
      transparent
    );
  }

  /* Subtle dot-grid pattern for depth */
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.03) 1px,
      transparent 1px
    );
    background-size: 40px 40px;
    mask-image: radial-gradient(
      ellipse 70% 60% at 50% 30%,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 70%
    );
    -webkit-mask-image: radial-gradient(
      ellipse 70% 60% at 50% 30%,
      rgba(0, 0, 0, 0.4) 0%,
      transparent 70%
    );
  }

  .container {
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 1;
  }

  /* ══════════════════════════════════════════════════
     HEADER — Matching Work section typography
     ══════════════════════════════════════════════════ */
  .elegant-intro {
    margin-bottom: 64px;
    max-width: 800px;
  }

  .line-mask {
    overflow: hidden;
    display: block;
    margin-bottom: 4px;
  }

  .serif-mask {
    margin-bottom: 24px;
  }

  .main-line {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 4rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: #ffffff;
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .serif-line {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-size: 4.2rem;
    font-weight: 300;
    font-style: italic;
    color: rgba(255, 255, 255, 0.85);
    margin: 0;
    line-height: 1.1;
    transform: translateY(110%);
    transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  }

  .sub-text {
    font-family: "SF Pro Display", sans-serif;
    font-size: 1.15rem;
    color: rgba(255, 255, 255, 0.45);
    line-height: 1.6;
    margin: 0;
    max-width: 580px;
    font-weight: 300;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  .container.animate .main-line,
  .container.animate .serif-line {
    transform: translateY(0);
  }

  .container.animate .sub-text {
    opacity: 1;
    transform: translateY(0);
  }

  /* ══════════════════════════════════════════════════
     BENTO GRID
     ══════════════════════════════════════════════════ */
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .bento-card {
    position: relative;
    background: rgba(12, 12, 16, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    backdrop-filter: blur(12px);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    --mouse-x: -1000px;
    --mouse-y: -1000px;

    /* Entrance animation */
    opacity: 0;
    transform: translateY(28px);
  }

  .container.animate .bento-card {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.65s ease var(--delay),
      transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1) var(--delay);
  }

  .bento-card:hover {
    border-color: rgba(255, 255, 255, 0.1);
  }

  /* Mouse-follow glow border */
  .bento-card::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: radial-gradient(
      500px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.25),
      rgba(255, 255, 255, 0.06) 25%,
      transparent 50%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .bento-grid:hover .bento-card::before {
    opacity: 1;
  }

  .span-2 {
    grid-column: span 2;
  }

  /* ── Card content ── */
  .card-content {
    position: relative;
    padding: 28px 32px 32px;
    height: 100%;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .card-header h3 {
    font-family: "Cormorant Garamond", Georgia, serif;
    font-style: italic;
    font-size: 1.5rem;
    font-weight: 300;
    color: #fff;
    margin: 0 0 6px 0;
    letter-spacing: 0.02em;
  }

  .card-header p {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
    font-weight: 400;
  }

  /* ══════════════════════════════════════════════════
     SKILL PILLS
     ══════════════════════════════════════════════════ */
  .skills-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .skill-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 10px;
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    user-select: none;
  }

  .skill-pill:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: color-mix(in srgb, var(--accent) 40%, rgba(255,255,255,0.15));
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .icon-wrapper {
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .icon-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .skill-pill span {
    font-family: "SF Pro Display", "Inter", sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    white-space: nowrap;
  }

  /* ══════════════════════════════════════════════════
     RESPONSIVE
     ══════════════════════════════════════════════════ */
  @media (max-width: 768px) {
    #skills {
      padding: 100px 16px;
    }

    .main-line {
      font-size: 2.8rem;
    }
    .serif-line {
      font-size: 3rem;
    }
    .sub-text {
      font-size: 1.05rem;
    }

    .bento-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .span-2 {
      grid-column: span 1;
    }

    .card-content {
      padding: 22px 20px 24px;
    }

  }

  @media (max-width: 480px) {
    .main-line {
      font-size: 2.4rem;
    }
    .serif-line {
      font-size: 2.6rem;
    }
  }
</style>
