document.addEventListener("DOMContentLoaded", () => {

  // handle active navbar tab behavior
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sectionId = entry.target.id;
      console.log("sectionId", sectionId);
      const currLink = document.querySelector(`nav ul li a[name="${sectionId}"]`);

      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        currLink.classList.add("active");
      }
    });
  }, { threshold: 0.3 });
  sections.forEach((section) => sectionObserver.observe(section));


  // grayscale other experience elements when hovering over a particular element
  const expereinces = document.querySelectorAll(".timeline-item");

  expereinces.forEach((experience) => {
    addGrayscaleColorTrigger(experience);

    experience.addEventListener("mouseenter", (event) => {
      expereinces.forEach((experience) => {
        if (experience != event.target) {
          experience.style.filter = 'grayscale(100%) blur(2px)';
        }
      });
    });

    experience.addEventListener("mouseleave", () => {
      expereinces.forEach((experience) => {
        experience.style.filter = 'grayscale(0%)';
        experience.style.blur = '';
      });
    });
  });


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

  // invert gradient when hovering over the resume link
  const resumeLink = document.querySelector('.resume-link');
  addInvertColorTrigger(resumeLink);


  /** Adds a trigger to the given element which applies an invert color effect over the primary website componenets
   *  Input: HTML Element
   *  Output: None
   *  Result: HTML Element now has the invert trigger on hover
  */
  function addInvertColorTrigger(triggerElement) {
    const gradientElements = document.querySelectorAll('.title, .navbar, .my-name, .city');
    const bodyElement = document.querySelector('body');

    function changeSiteBorder() {
      bodyElement.style.borderLeft = '2px solid rgb(0, 40, 255)';
      bodyElement.style.borderBottom = '2px solid rgb(49, 135, 178)';
      bodyElement.style.borderRight = '2px solid rgb(97, 227, 103)';
    }
    function restoreSiteBorder() {
      bodyElement.style.border= '';
    }

    triggerElement.addEventListener("mouseenter", () => {
      changeSiteBorder();
      gradientElements.forEach(entry => {
        entry.style.filter = 'invert(100%)';
      });
    });

    triggerElement.addEventListener("mouseleave", () => {
      restoreSiteBorder();
      gradientElements.forEach(entry => {
        entry.style.filter = 'invert(0%)';
      });
    });
  }


  /** Adds a trigger to the given element which applies a grayscale effect over the primary website componenets
   *  Input: HTML Element
   *  Output: None
   *  Result: HTML Element now has the grayscale trigger on hover
  */
  function addGrayscaleColorTrigger(triggerElement) {
    const grayscaleElements = document.querySelectorAll('.title, .navbar, .my-name, .city');
    const bodyElement = document.querySelector('body');

    function changeSiteBorder() {
      bodyElement.style.borderLeft = '2px solid grey';
      bodyElement.style.borderBottom = '2px solid grey';
      bodyElement.style.borderRight = '2px solid #333';
    }

    function restoreSiteBorder () {
      bodyElement.style.border = '';
    }

    triggerElement.addEventListener("mouseenter", () => {
      changeSiteBorder();
      grayscaleElements.forEach(entry => {
        entry.style.filter = 'grayscale(100%)';
      });
    });

    triggerElement.addEventListener("mouseleave", () => {
      restoreSiteBorder();
      grayscaleElements.forEach(entry => {
        entry.style.filter = 'grayscale(0%)';
      });
    });
  }



  // display preview when hovering a social link
  const linkPreview = document.querySelector('.link-preview');
  const socialLinks = document.querySelectorAll(".link");

  socialLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
      linkPreview.innerHTML = `${link.getAttribute('name')}`;
      linkPreview.classList.remove('hidden');
    });

    link.addEventListener("mouseleave", () => {
      linkPreview.classList.add('hidden');
    });
  });




  // invert typewriter text gradient when hovering over skills grid
  const typingText = document.querySelector('.typing-text');
  const skillsGrid = document.querySelector('.skills-grid');
  addInvertColorTrigger(skillsGrid);

  skillsGrid.addEventListener("mouseenter", () => {
    typingText.style.filter = 'invert(100%)';
  });

  skillsGrid.addEventListener("mouseleave", () => {
    typingText.style.filter = 'invert(0%)';
  });


  // project section
  const projectElements = document.querySelectorAll(".project");

  // add grayscale trigger for project elements
  projectElements.forEach((element) => {
    addGrayscaleColorTrigger(element);

    element.addEventListener("mouseenter", (event) => {
      projectElements.forEach((project) => {
        if (project != event.target) {
          project.style.filter = 'blur(2px)';
        }
      });
    });

    element.addEventListener("mouseleave", () => {
      projectElements.forEach((project) => {
        project.style.filter = '';
      });
    });
  });


  /** Appends an external link symbol to the end of all external Github and
   *  demo links within the projects section using 'Font Awesome'
   *
   *  Input: none (links automatically selected)
   *  Output: none
   *  Result: all external links in the project section have an external link symbol
   */
  function addExternalLinkSymbols() {
    const externalProjLinks = document.querySelectorAll('.project a');

    externalProjLinks.forEach(link => {
      link.innerHTML += ' <i class="fa-solid fa-square-arrow-up-right">';
    });
  }
  addExternalLinkSymbols();


  //TODO: refactor this code into one function that alternates between the two animation class types (left and right)
  //TODO: refactor homepage animation code to align with overall application conventions

  // adds animate-left class to a list of elements
  const observerNormalLeft = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('animate-left');
        return;
      }
      else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('animate-left');
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
      else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('animate-left-delay-1');
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
      else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('animate-left-delay-2');
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
      else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('animate-right');
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
      else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('animate-right-delay-1');
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
      else {
        entry.target.classList.add('hidden');
        entry.target.classList.remove('animate-right-delay-2');
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

  // experience section
  const experienceRowOne = document.querySelectorAll('.experience-row-one');
  experienceRowOne.forEach((element) => observerNormalLeft.observe(element));

  const experienceRowTwo = document.querySelectorAll('.experience-row-two');
  experienceRowTwo.forEach((element) => observerDelayOneRight.observe(element));

  const experienceRowThree = document.querySelectorAll('.experience-row-three');
  experienceRowThree.forEach((element) => observerDelayTwoLeft.observe(element));


  // project section
  const projectRowZero = document.querySelectorAll('.project-row-0');
  projectRowZero.forEach((element) => observerNormalLeft.observe(element));

  const projectRowOne = document.querySelectorAll('.project-row-1');
  projectRowOne.forEach((element) => observerNormalRight.observe(element));

  const projectRowTwo = document.querySelectorAll('.project-row-2');
  projectRowTwo.forEach((element) => observerDelayOneLeft.observe(element));

  const projectRowThree = document.querySelectorAll('.project-row-3');
  projectRowThree.forEach((element) => observerNormalRight.observe(element));


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
    navBar.style.filter = '';
    body.style.borderLeftColor = '';
    body.style.borderBottomColor = '';
    body.style.borderRightColor = '';
    contactText.style.textShadow = '';
    nameInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    messageInput.style.borderColor = '';
    contactButton.style.background = '';
  });


  // reset style properties when form elements are focused or hovered to allow CSS transitions to work
  // otherwise eventlisteners property assignments will override the CSS focus assignments
  nameInput.addEventListener("focus", () => nameInput.style.borderColor = "");
  emailInput.addEventListener("focus", () => emailInput.style.borderColor = "");
  messageInput.addEventListener("focus", () => messageInput.style.borderColor = "");
  contactButton.addEventListener("mouseenter", () => contactButton.style.background = "");

});


// copy email to user clipboard when they click on email icon
function copyEmailToClipboard(event) {
  event.preventDefault();

  const linkPreview = document.querySelector(".link-preview");
  navigator.clipboard.writeText("jacobrashid404@gmail.com");
  linkPreview.innerHTML = "Copied!"
}
