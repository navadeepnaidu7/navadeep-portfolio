<script>
  export let name;

  const socialLinks = {
    email: 'mailto:navadeepnaidu7@protonmail.com',
    github: 'https://github.com/navadeepnaidu7',
    linkedin: 'https://linkedin.com/in/navadeepnaidu',
    twitter: 'https://x.com/Navadeep_naidu7'
  };

  import FloatingIcons from './FloatingIcons.svelte';
</script>

<main>
  <div class="gradient-cloud"></div>
  <div class="left-section">
    <div class="pill-container">
      <span class="pill">Code · Automate · Scale</span>
    </div>
    <div class="introduction">
      <span class="pre-title">Hello👋🏼, I'm</span>
      <h1 class="greeting">Navadeep Naidu</h1>
      <p class="sub-intro">Building scalable backends & automating DevOps workflows, the infrastructure behind great software.</p>
    </div>
    <div class="social-buttons">
      <a href={socialLinks.email} target="_blank" rel="noopener noreferrer" class="social-button email" aria-label="Email">
        <i class="fa-solid fa-envelope"></i>
      </a>
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" class="social-button github" aria-label="GitHub">
        <i class="fab fa-github"></i>
      </a>
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" class="social-button linkedin" aria-label="LinkedIn">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" class="social-button twitter" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </div>

  <div class="right-section">
    <div class="profile-container">
      <FloatingIcons />
      <img src="/src/assets/endurance.jpg" alt="Profile Logo" class="profile-pic" />
    </div>
  </div>
</main>

<style>
  @import url('https://fonts.cdnfonts.com/css/sf-pro-display');

  main {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    position: relative;
    z-index: 1;
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
    transition: transform 0.3s ease, box-shadow 0.3s ease;
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

  .gradient-cloud {
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    background: conic-gradient(
      from 180deg at 50% 50%,
      #e9325d 0deg,
      #2C1B80 120deg,
      #140D40 240deg,
      #5732e9 360deg
    );
    pointer-events: none;
    z-index: 0;
    filter: blur(250px);
    opacity: 0.22;
    animation: rotate 35s linear infinite;
  }

  .pill-container {
    margin-bottom: 3rem;
    animation: fadeInSlide 0.8s ease-out;
    margin-left: -0.2rem;
  }

  .pill {
    background: rgba(87, 50, 233, 0.1);
    border: 1px solid rgba(87, 50, 233, 0.2);
    padding: 0.8rem 1.8rem; 
    border-radius: 50px;
    font-size: 1rem;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    letter-spacing: 0.8px;
  }

  .pre-title {
    font-family: 'SF Pro Display', serif;
    font-size: 1.6rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 400;
    animation: fadeInSlide 0.8s ease-out 0.1s backwards;
  }

  .greeting {
    font-family: 'SF Pro Display', sans-serif;
    font-style: initial;
    font-size: 4rem;
    font-weight: 700;
    margin: 0.5rem 0 1.2rem 0;
    background: linear-gradient(45deg, #fff, #5732e9);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.02em;
    animation: fadeInSlide 0.8s ease-out 0.2s backwards;
  }

  .sub-intro {
    font-family: 'SF Pro Display', sans-serif;
    font-style: italic;
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.6;
    font-weight: 300;
    margin-top: 0.8rem;
    animation: fadeInSlide 0.8s ease-out 0.4s backwards;
  }

  .social-buttons {
    display: flex;
    gap: 1.2rem;
    margin-top: 1rem;
    justify-content: flex-start;
    margin-right: auto;
    max-width: 100%;
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
    content: '';
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
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }

  .social-button:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 15px rgba(0, 0, 0, 0.2),
      0 4px 6px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }

  .social-button i {
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
  }

  .email:hover i { color: #5732e9; text-shadow: 0 0 15px rgba(87, 50, 233, 0.5); }
  .github:hover i { color: #ffffff; text-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
  .linkedin:hover i { color: #0077b5; text-shadow: 0 0 15px rgba(0, 119, 181, 0.5); }
  .twitter:hover i { color: #1DA1F2; text-shadow: 0 0 15px rgba(29, 161, 242, 0.5); }

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0px); }
  }

  @keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  @keyframes fadeInSlide {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    main {
      flex-direction: column;
      text-align: center;
    }

    .left-section {
      padding: 20px;
      margin-right: 0;
    }

    .right-section {
      padding-right: 0;
      justify-content: center;
    }

    .greeting {
      font-size: 3rem;
    }

    .sub-intro {
      font-size: 1rem;
    }

    .pill-container {
      margin-left: 0;
      margin-bottom: 2rem;
    }

    .social-buttons {
      justify-content: center;
    }

    .profile-pic {
      margin-left: 0;
    }
  }
</style>
