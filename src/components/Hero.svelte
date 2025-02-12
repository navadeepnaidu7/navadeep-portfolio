<script>
  export let name;

  const socialLinks = {
    email: 'mailto:navadeepnaidu7@protonmail.com',
    github: 'https://github.com/navadeepnaidu7',
    linkedin: 'https://linkedin.com/in/navadeepnaidu',
    twitter: 'https://x.com/Navadeep_naidu7'
  };
</script>

<main>
  <div class="left-section">
    <h1>{name}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    
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
    <img src="/src/assets/endurance.jpg" alt="Profile Logo" class="profile-pic" />
  </div>
</main>

<style>
  main {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }

  .left-section {
    flex: 1;
    padding: 20px;
  }

  .left-section h1 {
    font-size: 3rem;
    margin-bottom: 10px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    .left-section h1 {
      white-space: normal;
    }
  }

  .right-section {
    flex: 1.2;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 80px;
    margin-left: auto;
  }

  @media (max-width: 768px) {
    .right-section {
      flex: 1;
      padding-right: 20px;
    }
  }

  .right-section img {
    max-width: 300px;
    height: auto;
    border-radius: 50%;
    box-shadow: 
      0 4px 20px rgba(0, 157, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    background-color: #ffffff;
    animation: floating 3s ease-in-out infinite;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
  }

  .right-section img:hover {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 
      0 8px 40px rgba(0, 157, 255, 0.4),
      0 0 20px rgba(0, 157, 255, 0.3),
      0 0 0 2px rgba(255, 255, 255, 0.2);
  }

  @keyframes floating {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0px); }
  }

  .profile-pic {
    margin-left: 19rem; 
    margin-top: -4rem;
  }

  .social-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    justify-content: center;
    margin-right: auto;
    max-width: 100%;
  }

  .social-button {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    color: white;
    position: relative;
    box-shadow: 
      0 20px 20px rgba(0, 157, 255, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1);
  }

  .social-button:hover {
    transform: translateY(0px);  /* Removed scale(1.1) */
    box-shadow: 
      0 8px 40px rgba(0, 157, 255, 0.4),
      0 0 20px rgba(0, 157, 255, 0.3),
      0 0 0 2px rgba(255, 255, 255, 0.2);
  }

  .email {
    background: #5732e9;
    border: 1px solid #2f2f2f;
  }
  .email:hover {
    background: #5637D9;
    border-color: rgba(255, 255, 255, 0.2);
  }
  .github {
    background: #24292e;
    border: 1px solid #2f2f2f;
  }
  .github:hover {
    background: #000000;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .linkedin {
    background: #0077b5;
    border: 1px solid #2f2f2f;
  }
  .linkedin:hover {
    background: #005582;
    border-color: rgba(255, 255, 255, 0.2);
  }

  .twitter {
    background: #1DA1F2;
    border: 1px solid #2f2f2f;
  }
  .twitter:hover {
    background: #1a8cd8;
    border-color: rgba(255, 255, 255, 0.2);
  }
</style>
