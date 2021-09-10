import React, { useEffect, useState } from "react";

import './GitRepoCardSet.css';

import githubLogo from '../../assets/images/git-repos-icon.png';


// Dynamically propagated based on number of repositories
function GitRepoCard() {

    // fetch HERE
    const [repos, setRepos] = useState([]);
    
    const GetData=()=>
        useEffect(()=>{
            // It's rude not to remember what you just asked for. USE LOCAL STORAGE TO REDUCE API CALLS!!!
            // https://felixgerschau.com/react-localstorage/
            fetch(`https://api.github.com/users/actuallyitsnathaniel/repos`, {
            headers: {
                // 'Authorization': `token ${token}`,
            }
        }).then((response)=> {
            if (response.status == 401) {
                console.log("Ah. good ol' 401 error. How many API calls have you made??")
            }
            if (response.ok) return response.json();
        }).then((json=>{
            setRepos(json);
        }))
        .catch((err) => {
            console.log(err);
            return err;
        });
        
        }, [])

        
        GetData();

        // THIS LOG PROVES REPOS WORKS  
        // console.log(repos);      
        
    return(
        <div>
            <img src={githubLogo} alt="GitHub" className="github-text github-logo"/>
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