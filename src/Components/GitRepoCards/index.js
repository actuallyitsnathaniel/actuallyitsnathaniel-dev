import React, { Component } from "react";

import './GitRepoCardSet.css';
import githubLogo from '../../assets/images/git-repos-icon.png';
import gitHubRepos from "../../assets/files/repos.json";

// TODO: DYNAMICALLY RENDER JSON
// SIMPLE TUTORIAL TO MAKE THIS HAPPEN https://www.youtube.com/watch?v=9C85o8jIgUU

// NOTE!!! This only works 60 times per hour. See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

// the parsing is in ./GitRepoCardSet.js

function GitRepoCard() {

    return (
            <div className="git-repo-card-set">{gitHubRepos.map((parsedDetails, index) => {
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

// Dynamically propagated based on number of repositories
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