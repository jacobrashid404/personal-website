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


  // flash key skills when hovering over a project
  let isFlashing = false;

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
  })

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

  //contact form input fields glow when hovering over the eclipse
  // and reset when not hovering
  eclipse.addEventListener("mouseover", () => {
    body.style.borderLeftColor = 'rgba(255, 217, 0, 0.25)';
    body.style.borderBottomColor = 'rgba(206, 120, 77, 0.25)';
    body.style.borderRightColor = 'rgba(158, 28, 152, 0.25)';
    contactText.style.textShadow = '0 0 30px white';
    nameInput.style.borderColor = 'gold';
    emailInput.style.borderColor = 'rgb(206, 120, 77)';
    messageInput.style.borderColor = 'rgb(158, 28, 152)';
  });

  eclipse.addEventListener("mouseout", () => {
    // contactText.style.transform = 'scale(1) translateY(0px)';
    body.style.borderLeftColor = 'gold';
    body.style.borderBottomColor = 'rgb(206, 120, 77)';
    body.style.borderRightColor = 'rgb(158, 28, 152)'
    contactText.style.textShadow = 'none';
    nameInput.style.borderColor = 'rgba(255, 217, 0, 0.25)';
    emailInput.style.borderColor = 'rgba(206, 120, 77, 0.25)';
    messageInput.style.borderColor = 'rgba(158, 28, 152, 0.25)';
  });


  // reset border color when input is focused to allow CSS transition to work
  // otherwise the mouseover eventlistener will override the CSS focus
  nameInput.addEventListener("focus", () => nameInput.style.borderColor = "");
  emailInput.addEventListener("focus", () => emailInput.style.borderColor = "");
  messageInput.addEventListener("focus", () => messageInput.style.borderColor = "");
});



