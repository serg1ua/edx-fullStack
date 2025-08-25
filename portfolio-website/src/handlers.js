import profileImage from "/anonymous.png";
import javascript from "/javascript.png";
import nodejs from "/node-js.png";
import python from "/python.png";
import react from "/react.png";
import html5 from "/html5.png";
import css3 from "/css3.png";

const main = "main";
const recommendationList = [
  {
    author: "Elon Mars",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    author: "Alfred Novus",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    author: "Major Tom",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    author: "Hannibal Lecter",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export const aboutMe = `
  <div class="main-container">
    <div class="about">
      <div>
        <img src="${profileImage}" alt="User Profile Icon"" width="200px" height="200px" />
      </div>
      <div>
        <h2>Hi, My name is John Doe</h2>
        <p>
          Hi, my name is John Doe, and I am a Software Developer with 6 years of experience in designing, building, and maintaining scalable applications.
          I specialize in JavaScript/TypeScript, Node.js, React, PostgreSQL and have a strong background in solving complex problems, writing clean and efficient code, and collaborating with cross-functional teams.
        </p>
      </div>
    </div>
  </div>
`;

export function handleSkills(element) {
  element.addEventListener("click", () => {
    const mainSection = getElement(main);
    mainSection.innerHTML = `
      <div class="main-container">
        <div class="skills">
          <section>
            <div class="skill-logo">
              <img src="${html5}" alt="HTML5 Logo"" width="50px" height="50px" />
            </div>
            <div>
              <h4>HTML</h4>
              <h3>7 years experience</h3>
            </div>
          </section>
          <section>
            <div class="skill-logo">
              <img src="${css3}" alt="CSS3 Logo"" width="50px" height="50px" />
            </div>
            <div>
              <h4>CSS</h4>
              <h3>7 years experience</h3>
            </div>
          </section>
          <section>
            <div class="skill-logo">
              <img src="${javascript}" alt="JavaScript Logo"" width="50px" height="50px" />
            </div>
            <div>
              <h4>JavaScript</h4>
              <h3>7 years experience</h3>
            </div>
          </section>
          <section>
            <div class="skill-logo">
              <img src="${react}" alt="React Logo"" width="50px" height="50px" />
            </div>
            <div>
              <h4>React</h4>
              <h3>6 years experience</h3>
            </div>
          </section>
          <section>
            <div class="skill-logo">
              <img src="${nodejs}" alt="NodeJS Logo"" width="50px" height="50px" />
            </div>
            <div>
              <h4>Node.js</h4>
              <h3>6 years experience</h3>
            </div>
          </section>
          <section>
            <div class="skill-logo">
              <img src="${python}" alt="Python Logo"" width="50px" height="50px" />
            </div>
            <div>
              <h4>Python</h4>
              <h3>3 years experience</h3>
            </div>
          </section>
        </div>
      </div>
    `;
  });
}

export function handleProjects(element) {
  element.addEventListener("click", () => {
    const mainSection = getElement(main);
    mainSection.innerHTML = `
      <div class="main-container">
        <div class="projects">
          <h2>Projects</h2>
          <ul>
            <h4>Chatbot</h4>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
            <h4>Healthcare</h4>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..</li>
            <h4>E-commerce</h4>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
          </ul>
        </div>
      </div>
    `;
  });
}

export function handleAbout(elements) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", () => {
      const mainSection = getElement(main);
      mainSection.innerHTML = aboutMe;
    });
  }
}

export function handleRecommendations(element) {
  element.addEventListener("click", () => {
    buildRecomendationList(recommendationList);
  });
}

function getElement(element) {
  const mainSection = document.getElementById(element);
  if (mainSection) return mainSection;
}

function handleNewRecommendationButtonClick(btn) {
  if (btn) {
    btn.addEventListener("click", () => {
      const mainSection = getElement(main);
      mainSection.innerHTML = `
        <div class="main-container">
          <div class="new-recommendation">
            <h2>Live a Recommendation</h2>
            <form onsubmit="${submitRecommendation()}">
              <div class="recommendation-form""><label for="reviewer-name">Name (optional)</label></div>
              <input class="recommendation-input" type="text" id="reviewer-name" name="reviewer-name" minLength="2" maxLength="20"><br>
              <div class="recommendation-form""><label for="message">Message</label></div>
              <textarea class="recommendation-input recommendation-textarea" minLength="20" maxLength="200" type="text" id="message" name="message" required></textarea>
              <div class="submit-recommendation">
              <input
                id="submit-recommendation"
                type="submit"
                value="Submit"
              >
              </div>
            </form>
          </div>
        </div>
      `;
    });
  }
}

function buildRecomendationList(recomendations) {
  const mainSection = getElement(main);
  mainSection.innerHTML = `
    <h2 style="color: black">Recommendations</h2>
    <div class="main-container">
      <div class="recommendations">
        ${recomendations
          .map(
            (recomendation) => `
            <section>
              <div>
                <p class="message"><q>${recomendation.message}</q></p>
              </div>
              <div>
                <p class="author">-${recomendation.author}-</p>
              </div>
            </section>
          `
          )
          .join("")}
      </div>
    </div>
    <button id="new-recommendation-btn">New Recommendation</button>
  `;
  handleNewRecommendationButtonClick(document.getElementById("new-recommendation-btn"));
}

function submitRecommendation() {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const author = formData.get("reviewer-name").trim();
    const message = formData.get("message").trim();
    if (message?.length && message !== recommendationList[recommendationList.length - 1].message) {
      recommendationList.push({ author, message });
      buildRecomendationList(recommendationList);
    }
  });
}
