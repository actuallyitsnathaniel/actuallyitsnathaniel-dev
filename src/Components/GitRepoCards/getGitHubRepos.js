// NOTE!!! This only works 60 times per hour. See https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api
async function getGitHubRepos(url) {
    return fetch(url)
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Well shoot noobs. Something went wrong. Status Code: ' + 
                    response.status);
                return;
            }

            // Text in the SUCCESSFUL response
            response.json().then(function(data) {
                console.log(data);
                // return data;
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
}
// the parsing is in ./GitRepoCardSet.js

export async function parsedGitRepos(){
    var json_obj = getGitHubRepos('https://api.github.com/users/actuallyitsnathaniel/repos');
    return json_obj;
}