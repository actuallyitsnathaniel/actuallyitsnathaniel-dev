import React from 'react';
import './App.css';

import EducationAndSkills from '../Components/EducationAndSkills';
import AboutMe from "../Components/AboutMe";
import ContactMe from '../Components/ContactMe';
import Projects from '../Components/Projects';

import '../fonts/vcr_osd_mono.ttf';
import backgroundVideo from '../assets/videos/node_background.webm';
import profilePic from '../assets/images/profile_pic.png';


// for social links
import {FaGithub, FaLinkedin} from 'react-icons/fa';
import {AiOutlineMail} from 'react-icons/ai';
import resumeIcon from '../assets/images/resume-icon.svg';


function App() {
  return (
    
    <div className="App">

    {/** STATIC EXTERNAL LINKS*/}
      <div className="links-div">
        <a href={"mailto:nathanielrbowman@gmail.com"}><AiOutlineMail className="link" alt="email" /></a>
        <a href={"https://linkedin.com/in/actuallyitsnathaniel"}><FaLinkedin className="link" alt="linkedin" /></a>
        <a href={"https://github.com/actuallyitsnathaniel"}> <FaGithub className="link" alt="github" /> </a>
        <a href={"/resume/resume.pdf"} rel="noopener noreferrer" download><img src={resumeIcon} className="link" alt="resume" /></a>
      </div>

      <video autoPlay loop muted id='video'>
        <source src={backgroundVideo} type='video/webm'/>
        Sorry, your browser does not support HTML5 video.
      </video>
      
      {/** TOP DIV */}
      <header className="Top-header">
      <img src={profilePic} alt="profile_pic" className="profile-pic"/>
      NATHANIEL BOWMAN
      <p className="bio">B.S. Computer Science, looking for work! <br/>
      I'm a motivated developer who reads the documentation and checks the features before an update. 
      I love collaboration, problem-solving, and Agile Development. 
      I think critically to look for creative solutions.
      </p>
      <div className="arrow">
        ⬇
      </div> 
      <p/>
      </header>
          
      <EducationAndSkills />
      <Projects />
      <AboutMe />
      <ContactMe />

      <footer className="footer"> © NATHANIEL BOWMAN 2021. Built exclusively with React, HTML, and CSS. Deployed on Bluehost®.</footer>
    </div>
  );
}

export default App;