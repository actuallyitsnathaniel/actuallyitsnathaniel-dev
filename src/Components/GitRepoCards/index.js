import React, { Component } from "react";
import './GitRepoCardSet.css';

// import { parsedGitRepos } from './getGitHubRepos';

import parsedGitRepos from '../../assets/files/repos.json';
import githubLogo from '../../assets/images/git-repos-icon.png';

// TODO: DYNAMICALLY RENDER JSON
// SIMPLE TUTORIAL TO MAKE THIS HAPPEN https://www.youtube.com/watch?v=9C85o8jIgUU


function GitRepoCard() {

    console.log(parsedGitRepos);

    return (
            <div className="git-repo-card-set">{parsedGitRepos.map((parsedDetails, index) => {
                return (
                    <a className="git-repo-card" href={parsedDetails.html_url}>
                        <div className="git-repo-card-title">{parsedDetails.name}</div>
                        <div className="git-repo-card-desc">{parsedDetails.description}</div>
                        <div className="git-repo-card-codeType">{parsedDetails.language}</div>
                    </a>
                    )
            })}</div>
    );
}

// TODO: dynamically propagate based on number of repositories
// https://www.storyblok.com/tp/react-dynamic-component-from-json
class GitRepoCardSet extends Component {

    // Placeholder until all is dynamically allocated
    render() {
        return(
            <div>
            <img src={githubLogo} alt="GitHub" className="github-text github-logo"></img>
                <GitRepoCard/>
            </div>
      
    );
    }
}

export default GitRepoCardSet;