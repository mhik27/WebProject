// MENU PANEL TOGGLE
function loadTutorials() {
  document.getElementById("menuPanel").classList.toggle("open");
}

function scrollToSection() {
  document.getElementById("startBtn").scrollIntoView({ behavior: "smooth" });
  loadTutorials();
}

// VIDEO LINKS
const videoLinks = {
  "Introduction to JavaScript": "https://www.youtube.com/embed/W6NZfCO5SIk",
  "Variables and Data Types": "https://www.youtube.com/embed/Bv_5Zv5c-Ts",
  "Functions and Scope": "https://www.youtube.com/embed/6oFfqNpFGWI",
  "DOM Manipulation": "https://www.youtube.com/embed/0ik6X4DJKCc",
  "Events and Listeners": "https://www.youtube.com/embed/NNiTxUEnmKI",
  "ES6 Features": "https://www.youtube.com/embed/NCwa_xi0Uuc",
  "Asynchronous JavaScript": "https://www.youtube.com/embed/V_Kr9OSfDeU",
  "JavaScript Projects": "https://www.youtube.com/embed/3PHXvlpOkf4"
};

// LOAD TUTORIALS ON BUTTON CLICK
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "";

      Object.entries(videoLinks).forEach(([title, link], index) => {
        const div = document.createElement("div");
        div.className = "tutorial";

        const heading = document.createElement("h3");
        heading.textContent = title;

        const startButton = document.createElement("button");
        startButton.textContent = "Start";
        startButton.className = "tutorial-button";

        startButton.addEventListener("click", () => {
          if (!div.querySelector("iframe")) {
            const iframe = document.createElement("iframe");
            iframe.src = link;
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            const exitButton = document.createElement("button");
            exitButton.textContent = "Exit";
            exitButton.className = "exit-button";

            exitButton.addEventListener("click", () => {
              iframe.remove();
              exitButton.remove();
              const quiz = div.querySelector('.quiz');
              if (quiz) quiz.style.display = 'none';
            });

            div.appendChild(iframe);
            div.appendChild(exitButton);

            // QUIZ SECTION
            const quizDiv = document.createElement("div");
            quizDiv.className = "quiz";
            quizDiv.style.display = 'none';

            const quizQuestion = document.createElement("h4");
            quizQuestion.textContent = "What does JavaScript do?";
            quizDiv.appendChild(quizQuestion);

            const optionsDiv = document.createElement("div");
            optionsDiv.className = "quiz-options";
            optionsDiv.innerHTML = `
              <label><input type="radio" name="quiz${index}" value="0"> Styling web pages</label><br>
              <label><input type="radio" name="quiz${index}" value="1"> Structuring content</label><br>
              <label><input type="radio" name="quiz${index}" value="2"> Adding interactivity</label><br>
              <label><input type="radio" name="quiz${index}" value="3"> Managing databases</label>
            `;
            quizDiv.appendChild(optionsDiv);

            const quizButton = document.createElement("button");
            quizButton.textContent = "Submit Answer";
            quizButton.className = "quiz-btn";

            const feedbackDiv = document.createElement("div");
            feedbackDiv.className = "quiz-feedback";
            quizDiv.appendChild(feedbackDiv);

            quizButton.addEventListener("click", () => {
              const selectedOption = document.querySelector(`input[name="quiz${index}"]:checked`);
              if (selectedOption) {
                if (selectedOption.value == "2") {
                  feedbackDiv.textContent = "Correct!";
                  feedbackDiv.className = "quiz-feedback correct";
                } else {
                  feedbackDiv.textContent = "Incorrect! Try again.";
                  feedbackDiv.className = "quiz-feedback incorrect";
                }
              } else {
                feedbackDiv.textContent = "Please select an option.";
                feedbackDiv.className = "quiz-feedback incorrect";
              }
            });

            quizDiv.appendChild(quizButton);
            div.appendChild(quizDiv);

            quizDiv.style.display = 'block';
          }
        });

        div.appendChild(heading);
        div.appendChild(startButton);
        contentDiv.appendChild(div);
      });
    });
  }

  // LOGIN TOGGLE PASSWORD
  const togglePassword = document.getElementById("togglePassword");
  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passwordInput = document.getElementById("password");
      const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
      passwordInput.setAttribute("type", type);
      this.classList.toggle("fa-eye-slash");
    });
  }
});

// LOGIN FORM HANDLING
function handleSubmit() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  document.getElementById("errorusername").innerHTML = "";
  document.getElementById("errorpassword").innerHTML = "";

  let isValid = true;

  if (username === "") {
    document.getElementById("errorusername").innerHTML = "Please enter a username.";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("errorpassword").innerHTML = "Please enter a password.";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("errorpassword").innerHTML = "Password must be at least 6 characters.";
    isValid = false;
  }

  if (!isValid) return;

  if (username === "RosaFalla" && password === "12345678") {
    alert("Login Successfully!");
    window.location.href = "Home.html";
  } else {
    alert("Invalid Username or Password!");
  }
}

function closeLoginForm() {
  document.getElementById("loginForm").style.display = "none";
}
