import React from 'react';
import '../App/App.css';

import { DiCss3, IoLogoJavascript, FaReact, DiMongodb, SiTypescript, FaGithubSquare, AiFillHtml5} from 'react-icons/all';
import gcp from "../assets/images/google-cloud-seeklogo.com.svg";
import firebase from '../assets/images/firebase-logomark.svg';
import java from '../assets/images/java.svg';
import apu from '../assets/images/apu_white.svg';
import mysql from '../assets/images/logo-mysql.svg';

function SkillsAndExperience() {

    return(
      <header className="Skills-header"> 
          <div className="academia">
          EDUCATION <br/>
          <a href={"https://www.apu.edu/"}><img src={apu} alt="apu" className="education"/></a>
          <p className="body">
          B.S. Computer Science ~ Dept. of ECS <br />
          B.S. Honors Humanitites ~ APU Honors College
          </p>
          
          </div>
        <div className="skillset">
          SKILLS<br />
          <a href={"https://www.java.com/en/"}><img src={java} alt="java" className="skill"/></a>
          <a href={"https://developer.mozilla.org/en-US/docs/Web/HTML"}><AiFillHtml5 alt="html" className="skill" color="eb8300"/></a>
          <a href={"https://developer.mozilla.org/en-US/docs/Web/CSS"}><DiCss3 alt="css3" className="skill" color="007df2"/></a>
          <a href={"https://www.javascript.com"}><IoLogoJavascript alt="javascript" className="skill" color="ffe91f"/></a>
          <a href={"https://mongodb.com"}><DiMongodb alt="mongodb" className="skill" color="0d9e2c"/></a>
          <a href={"https://www.github.com"}><FaGithubSquare alt="github" className="skill" color="9192ed"/></a>    
          <a href={"https://reactjs.org"}><FaReact alt="react" className="skill" color ="61DBFB"/></a>    
          <a href={"https://www.typescriptlang.org/"}><SiTypescript alt="typescript" className="skill" color="2495ff"/></a>
          <a href="https://cloud.google.com"><img src={gcp} alt="google cloud platform" className="skill"/></a>
          <a href="https://firebase.google.com"><img src={firebase} alt="firestore" className="skill" width="75%"/></a>
          <a href="https://www.mysql.com/"><img src={mysql} alt="mysql" className="skill"/></a>
          <p className="body">
          <br/>
          <br/>
          Deliverables: 
          <br/>
          <br/>
          Full-Stack Web & Mobile Development, Database Management, Software Engineering, Programming</p>
          </div>

    
</header>
)
}

export default SkillsAndExperience;
