import React from 'react';

// NOTE!!! Unauthenticated calls only work 60 times per hour. 
// See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

async function getReps() { 

    const publicKey = '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';    

    return await fetch(`https://api.github.com/users/actuallyitsnathaniel/repos`, {
        headers: {
            Authorization: `token ${publicKey}`
        }
    }) 
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                
                return data; // TODO: figure out why this isn't returning once authorized
            });
    }


export function GitRepoCard() {
    var reps = [getReps()];

    return (
        <div className="git-repo-card-set">{
            reps.map((details, index) => {
            return (
                <a key={details.id} className="git-repo-card" href={details.html_url}>
                    <div className="git-repo-card-title">{details.name}</div>
                    <div className="git-repo-card-desc">{details.description}</div>
                    <div className="git-repo-card-codeType">{details.language}</div>
                </a>
                )
        })}</div>
);
}