import React, { useEffect, useState } from "react";

import githubLogo from "../../assets/images/git-repos-icon.png";

var username = process.env.REACT_APP_GIT_USERNAME;
var token = process.env.REACT_APP_GIT_TOKEN;

// Dynamically propagated based on number of repositories
export const GitRepoCard = () => {
  const [repos, setRepos] = useState([]);

  // fetch and map the repositories HERE
  const GetData = () =>
    useEffect(() => {
      // It's rude not to remember what you just asked for.
      // USE LOCAL STORAGE TO REDUCE API CALLS!!!
      // https://felixgerschau.com/react-localstorage/

      if (!localStorage.getItem("repos")) {
        fetch(`https://api.github.com/users/${username}/repos`, {
          headers: {
            Authorization: `${token}`, // TODO: implement auth token as ENV variable
          },
        })
          .then((response) => {
            if (response.status === 401) {
              console.error(
                "Ah. good ol' 401 error. How many API calls have you made??"
              );
              alert(
                "Ah. good ol' 401 error. How many API calls have you made??"
              );
            } else if (response.status === 200) return response.json();
          })
          .then((json) => {
            setRepos(json);

            localStorage.setItem("repos", JSON.stringify(json));

            console.log("Repos fetched to localStorage!");
          })
          .catch((err) => {
            console.log(err);
            return err;
          });
      } else {
        console.log("Repos already in localStorage.");
        setRepos(Array.from(JSON.parse(localStorage.getItem("repos"))));
        console.log(JSON.parse(localStorage.getItem("repos")));
      }
    }, []);

  GetData(); // run GetData

  return (
    <div className="flex flex-wrap flex-col">
      <img src={githubLogo} alt="GitHub" className="p-3 object-contain" />
      <p className="text-center font-medium">
        Total Repositories: {repos.length}
      </p>
      <div className="flex flex-wrap justify-center">
        {repos.map((details, i) => {
          return (
            <a
              className="relative text-left duration-100 ease-in-out h-48 min-w-[330px] w-1/4 bg-gray-900 outline outline-gray-600 font-medium rounded-md m-4 hover:brightness-125 hover:scale-105"
              href={details.html_url}
              key={details.id}
            >
              <div className="text-[#4987d8] text-sm p-1.5">{details.name}</div>
              <div className="text-[#7f7f7f] text-xs px-1 break-words hyphens-auto">
                {details.description}
              </div>
              <div className="text-[#aaa] text-xs p-1 absolute bottom-0.5">
                {details.language}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default GitRepoCard;
