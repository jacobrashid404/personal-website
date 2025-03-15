document.addEventListener("DOMContentLoaded", () => {
  // handle form submission, transition to thank you message
  document.getElementById("contact-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Send form data to Formspree
    const response = await fetch("https://formspree.io/f/meoebdzb", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // Fade out the form
      form.style.opacity = "0";
      const contactText = document.getElementById("contact-text");

      // Fade out the contact text
      contactText.classList.add("hidden");

      setTimeout(() => {
        contactText.innerHTML = "Thank you for your message. I'll be in touch shortly!";
        contactText.style.marginTop = "400px";
        contactText.classList.remove("hidden");
      }, 1000); // Wait for fade-out animation
    }
    else {
      alert("Oops! Something went wrong, please try again.");
    }
  });



  // change website colors when hovering over the resume link
  const resumeLink = document.querySelector('.resume-link');
  const gradientElements = document.querySelectorAll('.title, .navbar, .my-name');
  const bodyElement = document.querySelector('body');
  function invertBorder() {
    bodyElement.style.borderLeft = '2px solid rgb(0, 40, 255)';
    bodyElement.style.borderBottom = '2px solid rgb(49, 135, 178)';
    bodyElement.style.borderRight = '2px solid rgb(97, 227, 103)';
  }
  function restoreBorder() {
    bodyElement.style.borderLeft = '';
    bodyElement.style.borderBottom = '';
    bodyElement.style.borderRight = '';
  }

  resumeLink.addEventListener("mouseenter", () => {
    invertBorder();
    gradientElements.forEach(entry => {
      entry.style.filter = 'invert(100%)';
    });
  });

  resumeLink.addEventListener("mouseleave", () => {
    restoreBorder();
    gradientElements.forEach(entry => {
      entry.style.filter = 'invert(0%)';
    });
  });



  // change typewriter text color when hovering over skills grid
  const typingText = document.querySelector('.typing-text');
  const skillsGrid = document.querySelector('.skills-grid');

  skillsGrid.addEventListener("mouseenter", () => {
    typingText.style.filter = 'invert(100%)';
  });

  skillsGrid.addEventListener("mouseleave", () => {
    typingText.style.filter = 'invert(0%)';
  });



  let isFlashing = false;

  // highlights a list of words with a slight delay between each element
  function flashWords(parentElement) {
    if (isFlashing) return;

    isFlashing = true;
    const projectWords = parentElement.querySelectorAll("b");

    projectWords.forEach((word, index) => {
      setTimeout(() => {
        word.style.color = "gold"; // color of highlighted skills
      }, index * 500);
    });

    setTimeout(() => {
      projectWords.forEach((word) => {
        word.style.color = "";
      });
      isFlashing = false;
    }, projectWords.length * 500);
  }


  let flashInterval = null;

  // highlight key skills when hovering over a project
  document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("project")) {
      clearInterval(flashInterval);
      flashInterval = null;
    }
  });

  document.addEventListener("mousemove", (event) => {
    if (event.target.classList.contains("project")) {
      if (!flashInterval) {
        flashInterval = setInterval(() => {
          flashWords(event.target);
        }, 500);
      }
    }
  });



  // adds animate-left class to a list of elements
  const observerNormalLeft = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-left');
        return;
      }
    });
  });

  // animation left delay 1
  const observerDelayOneLeft = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-left-delay-1');
        return;
      }
    });
  });

  // animation left delay 2
  const observerDelayTwoLeft = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-left-delay-2');
        return;
      }
    });
  });


  // adds animate-right class to a list of elements
  const observerNormalRight = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-right');
        return;
      }
    });
  });

  // animation right delay 1
  const observerDelayOneRight = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-right-delay-1');
        return;
      }
    });
  });

  // animation right delay 2
  const observerDelayTwoRight = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-right-delay-2');
        return;
      }
    });
  });


  // observe all elements that need to be animated
  // skills section
  const skillRowOne = document.querySelectorAll('.skill-row-1');
  skillRowOne.forEach((element) => observerNormalLeft.observe(element));

  const skillRowTwo = document.querySelectorAll('.skill-row-2');
  skillRowTwo.forEach((element) => observerDelayOneLeft.observe(element));

  const skillRowThree = document.querySelectorAll('.skill-row-3');
  skillRowThree.forEach((element) => observerDelayTwoLeft.observe(element));

  const skillDisplay = document.querySelectorAll('.skill-display');
  skillDisplay.forEach((element) => observerDelayTwoRight.observe(element));


  // project section
  const projectRowZero = document.querySelectorAll('.project-row-0');
  projectRowZero.forEach((element) => observerNormalLeft.observe(element));

  const projectRowOne = document.querySelectorAll('.project-row-1');
  projectRowOne.forEach((element) => observerNormalRight.observe(element));

  const projectRowTwo = document.querySelectorAll('.project-row-2');
  projectRowTwo.forEach((element) => observerDelayOneLeft.observe(element));


  // contact section
  const contactRowOne = document.querySelectorAll('.contact-row-1');
  contactRowOne.forEach((element) => observerNormalRight.observe(element));

  const contactRowTwo = document.querySelectorAll('.contact-row-2');
  contactRowTwo.forEach((element) => observerDelayOneRight.observe(element));

  const contactRowThree = document.querySelectorAll('.contact-row-3');
  contactRowThree.forEach((element) => observerDelayTwoRight.observe(element));

  const contactEclipse = document.querySelectorAll('.eclipse');
  contactEclipse.forEach((element) => observerDelayTwoLeft.observe(element));



  // handle brightness change when hovering over eclipse
  const body = document.querySelector('body');
  const eclipse = document.querySelector('.eclipse');
  const contactSection = document.getElementById('contact');
  const nameInput = contactSection.querySelector('input[name="name"]');
  const emailInput = contactSection.querySelector('input[name="email"]');
  const messageInput = contactSection.querySelector('textarea[name="message"]');
  const contactText = document.getElementById('contact-text');
  const contactButton = contactSection.querySelector('button');
  const navBar = document.querySelector('nav');

  //contact form input fields glow when hovering over the eclipse
  // and reset when not hovering
  eclipse.addEventListener("mouseover", () => {
    navBar.style.filter = 'brightness(0.5)';
    body.style.borderLeftColor = 'rgba(255, 217, 0, 0.25)';
    body.style.borderBottomColor = 'rgba(206, 120, 77, 0.25)';
    body.style.borderRightColor = 'rgba(158, 28, 152, 0.25)';
    contactText.style.textShadow = '0 0 30px white';
    nameInput.style.borderColor = 'gold';
    emailInput.style.borderColor = 'rgb(206, 120, 77)';
    messageInput.style.borderColor = 'rgb(158, 28, 152)';
    contactButton.style.background = 'rgb(158, 28, 152)';
  });

  eclipse.addEventListener("mouseout", () => {
    navBar.style.filter = 'brightness(1)';
    body.style.borderLeftColor = 'gold';
    body.style.borderBottomColor = 'rgb(206, 120, 77)';
    body.style.borderRightColor = 'rgb(158, 28, 152)';
    contactText.style.textShadow = 'none';
    nameInput.style.borderColor = 'rgba(255, 217, 0, 0.25)';
    emailInput.style.borderColor = 'rgba(206, 120, 77, 0.25)';
    messageInput.style.borderColor = 'rgba(158, 28, 152, 0.25)';
    contactButton.style.background = 'rgba(158, 28, 152, 0.25)';
  });


  // reset style properties when form elements are focused or hovered to allow CSS transitions to work
  // otherwise eventlisteners property assignments will override the CSS focus assignments
  nameInput.addEventListener("focus", () => nameInput.style.borderColor = "");
  emailInput.addEventListener("focus", () => emailInput.style.borderColor = "");
  messageInput.addEventListener("focus", () => messageInput.style.borderColor = "");
  contactButton.addEventListener("mouseenter", () => contactButton.style.background = "");

});
