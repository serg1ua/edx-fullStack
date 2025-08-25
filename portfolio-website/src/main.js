import "./style.css";
import email from "/email-svgrepo.svg";
import phone from "/phone-svgrepo.svg";
import arrowUp from "/arrow-up.svg";
import {
  aboutMe,
  handleAbout,
  handleSkills,
  handleProjects,
  handleRecommendations,
} from "./handlers.js";

document.querySelector("#app").innerHTML = `
  <div>
    <nav>
      <div class="home name">
        <h2>John Doe</h2>
        <div class="address"><img src="${email}" alt="Email Icon" width="20px" height="20px" /><p>example@gmail.com</p></div>
        <div class="address"><img src="${phone}" alt="Phone Icon" width="20px" height="20px" /><p>555-43-24</p></div>
      </div>
      <div class=navigation>
        <div id="about" class="home nav-item"><p>About Me</p></div>
        <div id="skills" class="nav-item"><p>Skills</p></div>
        <div id="projects" class="nav-item"><p>Projects</p></div>
        <div id="recommendations" class="nav-item"><p>Recommendations</p></div>
      </div>
    </nav>
    <hr width="80%" size="3px" color="black" />
    <div class="go-home home"><img src="${arrowUp}" alter="Go Home Icon" width="40px" height="40px" /></div>
    <main id="main">${aboutMe}</main>
  </div>
`;

handleAbout(document.getElementsByClassName("home"));
handleSkills(document.getElementById("skills"));
handleProjects(document.getElementById("projects"));
handleRecommendations(document.getElementById("recommendations"));
