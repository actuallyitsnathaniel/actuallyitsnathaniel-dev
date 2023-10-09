import React from 'react';
import "../App/App.css";
import GitRepoCardSet from "../Components/GitRepoCards";

function Projects() {

    return(
      <header className="Projects-header">
        <GitRepoCardSet className="git-repo-set"/>{/** Should be shown 3 per line */}
      </header>
      
    )
}

export default Projects;