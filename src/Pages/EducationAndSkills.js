import React from "react";
import "../App/App.css";

import github_png from "../assets/images/git-repos-icon.png";
import html_svg from "../assets/images/html-svg.svg";
import css3_svg from "../assets/images/css-svg.svg";
import mongodb_svg from "../assets/images/mongodb-svg.svg";
import react_svg from "../assets/images/react-svg.svg";
import js_svg from "../assets/images/js-svg.svg";
import ts_svg from "../assets/images/typescript-logo-svg.svg";
import gcp from "../assets/images/google-cloud-seeklogo.com.svg";
import firebase from "../assets/images/firebase-logomark.svg";
import java_svg from "../assets/images/java.svg";
import apu from "../assets/images/apu_white.svg";
import mysql from "../assets/images/logo-mysql.svg";

function SkillsAndExperience() {
  return (
    <header className="Education-Skills-header">
      <div className="academia">
        EDUCATION <br />
        <a href={"https://www.apu.edu/"}>
          <img src={apu} alt="apu" className="education" />
        </a>
        <p className="body">
          B.S. Computer Science ~ Dept. of ECS <br />
          B.S. Honors Humanitites ~ APU Honors College
        </p>
      </div>
      <div className="skillset">
        SKILLS
        <br />
        <a href={"https://www.java.com/en/"}>
          <img src={java_svg} alt="java" className="skill" />
        </a>
        <a href={"https://developer.mozilla.org/en-US/docs/Web/HTML"}>
          <img src={html_svg} alt="html" className="skill" color="eb8300" />
        </a>
        <a href={"https://developer.mozilla.org/en-US/docs/Web/CSS"}>
          <img src={css3_svg} alt="css3" className="skill" color="007df2" />
        </a>
        <a href={"https://www.javascript.com"}>
          <img src={js_svg} alt="javascript" className="skill" color="ffe91f" />
        </a>
        <a href={"https://mongodb.com"}>
          <img
            src={mongodb_svg}
            alt="mongodb"
            className="skill"
            color="0d9e2c"
          />
        </a>
        <a href={"https://www.github.com"}>
          <img src={github_png} alt="github" className="skill" />
        </a>
        <a href={"https://reactjs.org"}>
          <img src={react_svg} alt="react" className="skill" color="61DBFB" />
        </a>
        <a href={"https://www.typescriptlang.org/"}>
          <img src={ts_svg} alt="typescript" className="skill" color="2495ff" />
        </a>
        <a href="https://cloud.google.com">
          <img src={gcp} alt="google cloud platform" className="skill" />
        </a>
        <a href="https://firebase.google.com">
          <img src={firebase} alt="firestore" className="skill" width="75%" />
        </a>
        <a href="https://www.mysql.com/">
          <img src={mysql} alt="mysql" className="skill" />
        </a>
        <p className="body">
          <br />
          <br />
          Deliverables:
          <br />
          <br />
          Full-Stack Web & Mobile Development, Database Management, Software
          Engineering, Programming
        </p>
      </div>
    </header>
  );
}

export default SkillsAndExperience;
