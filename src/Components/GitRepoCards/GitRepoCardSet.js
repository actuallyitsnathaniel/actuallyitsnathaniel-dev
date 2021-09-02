import React from "react";
import './GitRepoCardSet.css';

// import { parsedGitRepos } from './getGitHubRepos';

import parsedGitRepos from '../../assets/files/repos.json';

// TODO: DYNAMICALLY RENDER JSON
// SIMPLE TUTORIAL TO MAKE THIS HAPPEN https://www.youtube.com/watch?v=9C85o8jIgUU


function GitRepoCard(props) {

    console.log(parsedGitRepos);

    return (
        <div className="git-repo-card">
            <div className="git-repo-card-title">{props.name}</div>
            <div className="git-repo-card-desc">{props.description}</div>
            <div className="git-repo-card-codeType">{props.code}</div>
        </div>
    );
}

// TODO: dynamically propagate based on number of repositories
// https://www.storyblok.com/tp/react-dynamic-component-from-json
function GitRepoCardSet() {

    // Placeholder until all is dynamically allocated
    return(
       <GitRepoCard/>
    );
}

export default GitRepoCardSet;