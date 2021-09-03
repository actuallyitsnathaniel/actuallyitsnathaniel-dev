import React from 'react';
import './App.css';

import EducationAndSkills from '../Pages/EducationAndSkills';
import AboutMe from "../Pages/AboutMe";
import ContactMe from '../Pages/ContactMe';
import Projects from '../Pages/Projects';

import '../fonts/vcr_osd_mono.ttf';
import backgroundVideo from '../assets/videos/node_background.mp4';
import profilePic from '../assets/images/profile_pic.png';
import resume from '../assets/files/resume.pdf';


// for social links
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import {AiOutlineMail} from 'react-icons/ai';
import resumeIcon from '../assets/images/resume-icon.svg';


function App() {
  return (
    
    <div className="App">
      <video autoPlay loop muted id='video'>
        <source src={backgroundVideo} type='video/mp4'/>
        Sorry, your browser does not support HTML5 video.
      </video>
    {/** STATIC EXTERNAL LINKS*/}
      <div className="links-div">
        <a href={"mailto:nathanielrbowman@gmail.com"}><AiOutlineMail className="link" alt="email" /></a>
        <a href={"https://linkedin.com/in/actuallyitsnathaniel"}><FaLinkedin className="link" alt="linkedin" /></a>
        <a href={"https://github.com/actuallyitsnathaniel"}> <FaGithub className="link" alt="github" /> </a>
        <a href={resume} rel="noopener noreferrer" type="application/pdf"  download="nathaniel-bowman_resume" >
        <img src={resumeIcon} className="link" alt="resume" /></a>
      </div>


      
      {/** TOP DIV */}
      <header className="Top-header">
      <img src={profilePic} alt="profile_pic" className="profile-pic"/>
      NATHANIEL BOWMAN
      <p className="bio">B.S. Computer Science, looking for work! <br/>
      I'm a motivated software engineer who reads the documentation and checks the features before an update.
      I think critically to look for creative solutions. I love collaboration, problem-solving, and Agile Development.
      
      </p>
      <div className="arrow">
        ⬇
      </div> 
      <p/>
      </header>
          
      <EducationAndSkills/>
      <div className="arrow">
      ⬇
      </div>
      <p/>
      <p/>
      <Projects />

      <AboutMe className="about-me"/>
      <ContactMe />

      <footer className="footer"> © NATHANIEL BOWMAN 2021. Built exclusively with React, HTML, and CSS. Deployed on Bluehost®.</footer>
    </div>
  );
}

export default App;