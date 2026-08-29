document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device is ready. Initializing app...');
    fetchIncidents();

    const form = document.getElementById('incidentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            submitIncident();
        });
    }
}

// Fetch and display incidents from WordPress REST API
function fetchIncidents() {
    const wpApiUrl = 'https://your-wordpress-site.com/wp-json/wp/v2/posts?_embed';
    
    fetch(wpApiUrl)
        .then(response => response.json())
        .then(posts => {
            const listContainer = document.getElementById('incident-list');
            if (!listContainer) return;
            
            listContainer.innerHTML = '';
            
            posts.forEach(post => {
                const card = document.createElement('div');
                card.className = 'incident-card';
                card.innerHTML = `
                    <h3>${post.title.rendered}</h3>
                    <div>${post.content.rendered}</div>
                `;
                listContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching incidents:', error));
}

// Submit incident to WordPress backend
function submitIncident() {
    const title = document.getElementById('incident-title').value;
    const description = document.getElementById('incident-desc').value;
    const category = document.getElementById('category').value;

    console.log('Submitting Incident:', { title, description, category });
    alert('Incident ready for submission. Make sure your WordPress endpoint and authentication tokens are configured.');
}
