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
  document.addEventListener("mouseover", (event) => {
    if (event.target.classList.contains("project")) {
      if (!flashInterval) {
        flashInterval = setInterval(() => {
          flashWords(event.target);
        }, 500);
      }
    }
  });

  document.addEventListener("mouseout", (event) => {
    if (event.target.classList.contains("project")) {
      clearInterval(flashInterval);
      flashInterval = null;
    }
  });



  // adds animation classes to a list of elements
  const oberserverNormal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        return;
      }
    });
  });

  // animation delay 1
  const oberserverDelayOne = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-delay-1');
        return;
      }
    });
  });

  // animation delay 2
  const oberserverDelayTwo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-delay-2');
        return;
      }
    });
  });

  // observe all elements that need to be animated
  const skillRowOne = document.querySelectorAll('.skill-row-1');
  skillRowOne.forEach((element) => oberserverNormal.observe(element));

  const skillRowTwo = document.querySelectorAll('.skill-row-2');
  skillRowTwo.forEach((element) => oberserverDelayOne.observe(element));

  const skillRowThree = document.querySelectorAll('.skill-row-3');
  skillRowThree.forEach((element) => oberserverDelayTwo.observe(element));

  const projectRowOne = document.querySelectorAll('.project-row-1');
  projectRowOne.forEach((element) => oberserverNormal.observe(element));

  const projectRowTwo = document.querySelectorAll('.project-row-2');
  projectRowTwo.forEach((element) => oberserverDelayOne.observe(element));

  const contactRowOne = document.querySelectorAll('.contact-row-1');
  contactRowOne.forEach((element) => oberserverNormal.observe(element));

  const contactRowTwo = document.querySelectorAll('.contact-row-2');
  contactRowTwo.forEach((element) => oberserverDelayOne.observe(element));

  const contactRowThree = document.querySelectorAll('.contact-row-3');
  contactRowThree.forEach((element) => oberserverDelayTwo.observe(element));


  // handle brightness change when hovering over eclipse
  const eclipse = document.querySelector('.eclipse');
  const contactSection = document.getElementById('contact');
  const nameInput = contactSection.querySelector('input[name="name"]');
  const emailInput = contactSection.querySelector('input[name="email"]');
  const messageInput = contactSection.querySelector('textarea[name="message"]');

  console.log(nameInput, emailInput, messageInput);

  eclipse.addEventListener('mouseover', () => {
    nameInput.style.borderColor = 'gold';
    emailInput.style.borderColor = 'rgb(206, 120, 77)';
    messageInput.style.borderColor = 'rgb(158, 28, 152)';
  });

  eclipse.addEventListener('mouseout', () => {
    nameInput.style.borderColor = 'rgba(255, 217, 0, 0.25)';
    emailInput.style.borderColor = 'rgba(206, 120, 77, 0.25)';
    messageInput.style.borderColor = 'rgba(158, 28, 152, 0.25)';
  });
});



