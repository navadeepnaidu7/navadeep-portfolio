<script>
  import profileImage from '../assets/endurance.jpg';
  import FloatingIcons from './FloatingIcons.svelte';

  const socialLinks = {
    email: 'mailto:navadeepnaidu7@protonmail.com',
    github: 'https://github.com/navadeepnaidu7',
    linkedin: 'https://linkedin.com/in/navadeepnaidu',
    twitter: 'https://x.com/Navadeep_naidu7',
    medium: 'https://medium.com/@navadeepnaidu7'
  };
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
      <p class="sub-intro">Building scalable backends & automating DevOps workflows, powering the infrastructure behind great software.</p>
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
      <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer" class="social-button medium" aria-label="Medium">
        <i class="fab fa-medium"></i>
    </div>
  </div>

  <div class="right-section">
    <div class="profile-container">
      <FloatingIcons />
      <img src={profileImage} alt="Profile Logo" class="profile-pic" />
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
    max-width: 100%;
    overflow: hidden;
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
    inset: -40% -20% auto -20%;
    height: 80%;
    background: radial-gradient(circle at 30% 30%, rgba(87, 50, 233, 0.35), transparent 60%),
      radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.12), transparent 55%);
    pointer-events: none;
    z-index: 0;
    filter: blur(140px);
    opacity: 0.25;
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
    font-family: 'Roboto', san-serif;
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
    font-size: 1.3rem;
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

  .email:hover i { color: #5732e9; text-shadow: 0 0 15px rgba(87, 50, 233, 0.5); }
  .github:hover i { color: #ffffff; text-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
  .linkedin:hover i { color: #0077b5; text-shadow: 0 0 15px rgba(0, 119, 181, 0.5); }
  .twitter:hover i { color: #1DA1F2; text-shadow: 0 0 15px rgba(29, 161, 242, 0.5); }
  .medium:hover i { color: #ffffff; text-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0px); }
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

    .greeting {
      font-size: 2.8rem;
    }

    .pre-title {
      font-size: 1.4rem;
    }

    .sub-intro {
      font-size: 1.1rem;
    }

    .pill-container {
      margin-left: 0;
      margin-bottom: 2rem;
      display: flex;
      justify-content: center;
    }

    .pill {
      font-size: 0.9rem;
      padding: 0.7rem 1.5rem;
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

    .pill {
      font-size: 0.85rem;
      padding: 0.6rem 1.2rem;
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
