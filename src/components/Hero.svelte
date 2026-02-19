<script>
  import { onMount, onDestroy } from "svelte";
  import profileImage from "../assets/endurance.jpg";
  import StarField from "./StarField.svelte";

  const socialLinks = {
    email: "mailto:navadeepnaidu7@protonmail.com",
    github: "https://github.com/navadeepnaidu7",
    linkedin: "https://linkedin.com/in/navadeepnaidu",
    twitter: "https://x.com/Navadeep_naidu7",
    medium: "https://medium.com/@navadeepnaidu7",
  };

  let latestPost = null;

  async function fetchLatestPost() {
    try {
      const res = await fetch("https://blog.navadeepnaidu.com/rss.xml");
      const text = await res.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const firstItem = xml.querySelector("item");
      if (firstItem) {
        latestPost = {
          title: firstItem.querySelector("title")?.textContent ?? "",
          link: firstItem.querySelector("link")?.textContent ?? "#",
        };
      }
    } catch (e) {
      console.warn("Could not fetch RSS feed:", e);
    }
  }

  /* Scramble/Decrypt Effect Logic */
  const greetings = ["HELLO", "HOLA", "NAMASTE", "BONJOUR", "CIAO"];
  let displayedText = "HELLO";
  let interval;
  let cycleInterval;

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function scrambleText(targetText) {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      displayedText = targetText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= targetText.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  }

  onMount(() => {
    fetchLatestPost();

    let index = 0;
    cycleInterval = setInterval(() => {
      index = (index + 1) % greetings.length;
      scrambleText(greetings[index]);
    }, 4000);
  });

  onDestroy(() => {
    clearInterval(interval);
    clearInterval(cycleInterval);
  });
</script>

<main>
  <div class="tech-landscape">
    <StarField />
    <div class="fog-layer layer-1"></div>
    <div class="fog-layer layer-2"></div>
    <div class="fog-layer layer-3"></div>
  </div>
  <div class="left-section">
    <div class="introduction">
      <span class="pre-title reveal" style="--i: 0">
        <span class="scramble-text">{displayedText}</span>
      </span>
      <div class="name-wrapper reveal" style="--i: 1">
        <span class="small-im">I'm</span>
        <h1 class="greeting">Navadeep Naidu</h1>
      </div>
      <p class="sub-intro reveal" style="--i: 2">
        Building scalable backends & automating DevOps workflows, powering the
        infrastructure behind great software.
      </p>
    </div>
    <div class="social-buttons">
      <a
        href={socialLinks.email}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button email reveal"
        aria-label="Email"
        style="--i: 3"
      >
        <i class="fa-solid fa-envelope"></i>
      </a>
      <a
        href={socialLinks.github}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button github reveal"
        aria-label="GitHub"
        style="--i: 3.1"
      >
        <i class="fab fa-github"></i>
      </a>
      <a
        href={socialLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button linkedin reveal"
        aria-label="LinkedIn"
        style="--i: 3.2"
      >
        <i class="fab fa-linkedin"></i>
      </a>
      <a
        href={socialLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button twitter reveal"
        aria-label="Twitter"
        style="--i: 3.3"
      >
        <i class="fab fa-twitter"></i>
      </a>
      <a
        href={socialLinks.medium}
        target="_blank"
        rel="noopener noreferrer"
        class="social-button medium reveal"
        aria-label="Medium"
        style="--i: 3.4"
      >
        <i class="fab fa-medium"></i>
      </a>
    </div>
  </div>

  <div class="right-section">
    <div class="profile-container">
      <img src={profileImage} alt="Profile Logo" class="profile-pic" />
    </div>
  </div>

  {#if latestPost}
    <p class="latest-article">
      Read my latest article: <a
        href={latestPost.link}
        target="_blank"
        rel="noopener noreferrer">{latestPost.title}</a
      >
    </p>
  {/if}
</main>

<style>
  @import url("https://fonts.cdnfonts.com/css/sf-pro-display");

  main {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    padding-bottom: 80px;
    position: relative;
    z-index: 0;
    max-width: 100%;
  }

  .left-section {
    flex: 1;
    padding: 40px;
    text-align: left;
    margin-right: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 5;
    max-width: 100%;
  }

  .right-section {
    flex: 0.9;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    margin-left: auto;
    position: relative;
    z-index: 5;
    max-width: 50%;
  }

  .profile-container {
    position: relative;
    width: 280px;
    height: 280px;
    z-index: 2;
  }

  .right-section img {
    max-width: 280px;
    width: 100%;
    height: auto;
    border-radius: 50%;
    box-shadow:
      0 4px 20px rgba(0, 157, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    background-color: #ffffff;
    animation: floating 3s ease-in-out infinite;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    position: relative;
    z-index: 3;
  }

  .right-section img:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow:
      0 8px 40px rgba(0, 157, 255, 0.4),
      0 0 20px rgba(0, 157, 255, 0.3),
      0 0 0 2px rgba(255, 255, 255, 0.2);
  }

  .tech-landscape {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -50px; /* Subtle bleed into next section */
    pointer-events: none;
    z-index: 0;
  }

  .fog-layer {
    position: absolute;
    filter: blur(100px);
    opacity: 0.6;
    animation: nebulaFlow 20s infinite alternate ease-in-out;
    border-radius: 50%;
    will-change: transform;
    transform: translateZ(0); /* Force GPU acceleration */
  }

  /* Deep Blue Base - mimic the "ground" or deep space */
  .layer-1 {
    bottom: -20%;
    left: -10%;
    width: 80%;
    height: 60%;
    background: radial-gradient(
      circle at center,
      #1b1b42 0%,
      #0a0a2a 70%,
      transparent 100%
    );
    opacity: 0.7;
    animation-duration: 25s;
    filter: blur(80px);
  }

  /* Purple "Mountain" - main feature */
  .layer-2 {
    bottom: -10%;
    right: -10%;
    width: 70%;
    height: 70%;
    background: conic-gradient(
      from 180deg at 50% 50%,
      #2d1b4e 0deg,
      #5732e9 120deg,
      transparent 240deg
    );
    opacity: 0.5;
    animation-delay: -5s;
    filter: blur(120px);
    transform: rotate(-15deg);
  }

  /* Cyan Highlight - the "mist" or data stream */
  .layer-3 {
    bottom: 10%;
    left: 20%;
    width: 40%;
    height: 40%;
    background: radial-gradient(circle at center, #4cc9f0 0%, transparent 60%);
    opacity: 0.25;
    animation-duration: 18s;
    animation-delay: -10s;
    filter: blur(90px);
    mix-blend-mode: screen;
  }

  @keyframes nebulaFlow {
    0% {
      transform: scale(1) translate(0, 0) rotate(0deg);
    }
    100% {
      transform: scale(1.1) translate(20px, -10px) rotate(2deg);
    }
  }

  /* Fluid reveal – Apple-style staggered entrance */
  .reveal {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(24px);
    animation: fluidReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: calc(0.15s + var(--i) * 0.15s);
  }

  @keyframes fluidReveal {
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }

  .pre-title {
    font-family: "Inter", sans-serif;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.55);
    font-weight: 400;
    letter-spacing: -0.01em;
    display: block;
  }

  .scramble-text {
    color: #fff;
    font-family: "Space Mono", monospace;
    font-weight: 500;
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .name-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 8px; /* Tighter gap */
    margin: 0.5rem 0 1.2rem -4px; /* Slight negative margin for optical alignment */
  }

  .small-im {
    font-family: "Cormorant Garamond", serif;
    font-style: italic;
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 400;
    margin-top: 0.6rem; /* Push down to align with top of H1 */
    line-height: 1;
  }

  .greeting {
    font-family: "SF Pro Display", sans-serif;
    font-style: initial;
    font-size: 4rem;
    font-weight: 700;
    margin: 0;
    color: #ffffff;
    letter-spacing: 0.02em;
  }

  .sub-intro {
    font-family: "SF Pro Display", sans-serif;
    font-style: italic;
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    font-weight: 300;
    margin-top: 0.8rem;
  }

  .social-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
    justify-content: flex-start;
    margin-right: auto;
    max-width: 100%;
    flex-wrap: wrap;
  }

  .social-button {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    color: rgba(255, 255, 255, 0.9);
    position: relative;
    background: rgba(18, 18, 18, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .social-button::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 1px;
    background: linear-gradient(
      45deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  /* .social-button:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 15px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  } */

  .social-button i {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .email:hover i {
    color: #5732e9;
    text-shadow: 0 0 15px rgba(87, 50, 233, 0.5);
  }
  .github:hover i {
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  .linkedin:hover i {
    color: #0077b5;
    text-shadow: 0 0 15px rgba(0, 119, 181, 0.5);
  }
  .twitter:hover i {
    color: #1da1f2;
    text-shadow: 0 0 15px rgba(29, 161, 242, 0.5);
  }
  .medium:hover i {
    color: #ffffff;
    text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }

  .latest-article {
    position: absolute;
    bottom: 53px;
    left: 0;
    right: 0;
    text-align: center;
    font-family: "Inter", sans-serif;
    font-size: 0.82rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
    z-index: 5;
    animation: placeOnWall 1.2s cubic-bezier(0.22, 1, 0.36, 1) 1s backwards;
  }

  .latest-article a {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: rgba(255, 255, 255, 0.25);
    transition: all 0.2s ease;
  }

  .latest-article a:hover {
    color: #fff;
    text-decoration-color: rgba(255, 255, 255, 0.6);
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-4px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  @keyframes placeOnWall {
    0% {
      opacity: 0;
      transform: scale(1.15);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0);
    }
  }

  @media (max-width: 1024px) {
    main {
      padding: 15px;
      overflow-x: hidden;
    }

    .left-section {
      padding: 30px 20px;
      margin-right: 20px;
    }

    .right-section {
      flex: 0.8;
      padding-right: 20px;
      max-width: 45%;
    }

    .greeting {
      font-size: 3.5rem;
    }

    .sub-intro {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
      text-align: center;
      padding: 80px 20px 20px;
      min-height: auto;
      overflow-x: hidden;
    }

    .left-section {
      padding: 20px;
      margin-right: 0;
      margin-bottom: 30px;
      max-width: 100%;
    }

    .right-section {
      padding-right: 0;
      justify-content: center;
      margin-left: 0;
      order: -1;
      margin-bottom: 30px;
      max-width: 100%;
    }

    .profile-container {
      width: 220px;
      height: 220px;
    }

    .right-section img {
      max-width: 220px;
    }

    .name-wrapper {
      justify-content: center;
      gap: 6px;
      margin-bottom: 0.5rem;
    }

    .small-im {
      font-size: 0.9rem;
      margin-top: 0.7rem; /* Adjusted for smaller H1 */
    }

    .greeting {
      font-size: 2.8rem;
      margin: 0;
    }

    .pre-title {
      font-size: 1.4rem;
    }

    .sub-intro {
      font-size: 1.1rem;
    }

    .social-buttons {
      justify-content: center;
      gap: 1rem;
    }

    .social-button {
      width: 3rem;
      height: 3rem;
      font-size: 1.2rem;
    }

    .gradient-cloud {
      width: 120%;
      height: 120%;
    }
  }

  @media (max-width: 480px) {
    main {
      padding: 70px 15px 15px;
    }

    .left-section {
      padding: 15px;
    }

    .profile-container {
      width: 180px;
      height: 180px;
    }

    .right-section img {
      max-width: 180px;
    }

    .greeting {
      font-size: 2.2rem;
      margin: 0.4rem 0 1rem 0;
    }

    .pre-title {
      font-size: 1.2rem;
    }

    .sub-intro {
      font-size: 1rem;
      line-height: 1.5;
    }

    .social-buttons {
      gap: 0.8rem;
      flex-wrap: wrap;
      justify-content: center;
    }

    .social-button {
      width: 2.8rem;
      height: 2.8rem;
      font-size: 1.1rem;
    }
  }
</style>
