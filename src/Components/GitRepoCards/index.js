import React, { useEffect, useState } from "react";

import './GitRepoCardSet.css';
import githubLogo from '../../assets/images/git-repos-icon.png';


// Dynamically propagated based on number of repositories
function GitRepoCard() {
    
    const [repos, setRepos] = useState([]);

    // TODO: Push, Build, Deploy. I think what I'm looking for is a script to build and then deplopy via SSH
    // https://www.youtube.com/watch?v=18tXFctuqQ0

    // Deploy from cPanel. learn the .yml file requirements and commands.
    // https://docs.cpanel.net/knowledge-base/web-services/guide-to-git-deployment/
    // Requirements: Auto-PULL, BUILD, then DEPLOY from remote branch when remote branch is PUSHed

    // fetch HERE
    const GetData=()=>
        useEffect(()=>{
            // It's rude not to remember what you just asked for. USE LOCAL STORAGE TO REDUCE API CALLS!!!
            // https://felixgerschau.com/react-localstorage/

            if (localStorage.length === 0) {
                fetch(`https://api.github.com/users/actuallyitsnathaniel/repos`, {
                headers: {
                //    'Authorization': `token ${token}`,
                }
            }).then((response) => {
                if (response.status === 401) {
                    console.error("Ah. good ol' 401 error. How many API calls have you made??");
                    alert("Ah. good ol' 401 error. How many API calls have you made??");
                }
                else if (response.status === 200) return response.json();
            }).then((json => {
                setRepos(json);

                localStorage.setItem('repos', JSON.stringify(json));

                console.log("Repos fetched to localStorage!")
            }))
            .catch((err) => {
                console.log(err);
                return err;
            });
            } else {
                console.log("Repos already in localStorage.")

                setRepos(Array.from(JSON.parse(localStorage.getItem('repos'))));
                console.log(JSON.parse(localStorage.getItem('repos')));
            }

            
        
        }, [])

        
        GetData();

        // THIS LOG PROVES REPOS WORKS  
        // console.log(repos);      
        
    return(
        <div>
            <img src={githubLogo} alt="GitHub" className="github-text github-logo"/>
            <div>Total Repositories: {repos.length}</div>
            <div className="git-repo-card-set">{
                repos.map((details, i) => {
                return (
                    <a className="git-repo-card" href={details.html_url} key={details.id}>
                        <div className="git-repo-card-title" >{details.name}</div>
                        <div className="git-repo-card-desc" >{details.description}</div>
                        <div className="git-repo-card-codeType" >{details.language}</div>
                    </a>
                    )
            })}</div>
        </div>
    );
        
}

export default GitRepoCard;