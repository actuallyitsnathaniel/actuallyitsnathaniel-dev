import React, { Component } from "react";

import './GitRepoCardSet.css';
import { GitRepoCard } from './GitRepoCard';

import githubLogo from '../../assets/images/git-repos-icon.png';


// Dynamically propagated based on number of repositories
class GitRepoCardSet extends Component {

    // Placeholder until all is dynamically allocated
    render() {

        return(
            <div>
            <img src={githubLogo} alt="GitHub" className="github-text github-logo"/>
                <GitRepoCard/>
            </div>
      
    );
    }
}

export default GitRepoCardSet;