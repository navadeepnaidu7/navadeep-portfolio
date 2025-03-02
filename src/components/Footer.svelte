<script>
  const currentYear = new Date().getFullYear();
  const socialLinks = {
    github: 'https://github.com/navadeepnaidu7',
    linkedin: 'https://linkedin.com/in/navadeepnaidu',
    twitter: 'https://x.com/Navadeep_naidu7'
  };
</script>

<footer>
  <div class="footer-underline"></div>
  <div class="footer-content">
    <div class="copyright">
      © {currentYear} Navadeep Naidu. All rights reserved.
    </div>
    <div class="social-links">
      <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
        <i class="fab fa-github"></i>
      </a>
      <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <i class="fab fa-twitter"></i>
      </a>
    </div>
  </div>
</footer>

<style>
  footer {
    width: 100%;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(10px);
    margin-top: auto;
    position: relative;
  }

  .footer-underline {
    position: absolute;
    top: 0;
    left: 0%;
    right: 0%;
    height: 3px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.059) 10%,
      rgba(255, 255, 255, 0.059) 90%,
      transparent 100%
    );
    border-radius: 26px;
  }

  .footer-content {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
  }

  .copyright {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1rem;
    font-weight: 300;
    font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  .social-links {
    display: flex;
    gap: 20px;
  }

  .social-links a {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1.4rem;
    transition: all 0.3s ease;
  }

  .social-links a:hover {
    color: rgba(255, 255, 255, 0.9);
    transform: scale(1); 
  }

  @media (max-width: 600px) {
    .footer-content {
      flex-direction: column;
      gap: 10px;
      text-align: center;
      padding: 15px 20px;
    }

    .copyright {
      font-size: 0.9rem;
    }

    .social-links {
      gap: 15px;
    }
  }
</style>