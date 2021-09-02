import React from 'react';
import "../App/App.css";
import GitRepoCardSet from "../Components/GitRepoCards/GitRepoCardSet";

function Projects() {

    return(
      <header className="Projects-header">
        PROJECTS <br/>
      <p className="body"> 
      My projects are currently displayed on Github, but I will be showcasing them here soon!
      </p>     
        <GitRepoCardSet className="git-repo-set"/>{/** Should be shown 3 per line */}
      </header>
      
    )
}

export default Projects;