function fetchGithubRepos() {
const apiUrl = 'https://api.github.com/users/Bonnie39/repos';

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const filteredRepos = data.filter(repo => !['bonnie39.github.io', 'trollapps-repo', 'Diary15', 'FreeCupHolder', 'Bonnie39'].includes(repo.name));
                    
        const sortedRepos = filteredRepos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                    
        const repoList = document.getElementById('repo-list');
                    
        sortedRepos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <div class="repo-box">
                <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
                <p class="repo-description">${repo.description || 'No description available.'}</p>
                <p class="repo-stats">Stars: ${repo.stargazers_count} Forks: ${repo.forks_count}<br>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</p>
            </div>
            `;
            repoList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error fetching GitHub data:', error));
}

fetchGithubRepos();