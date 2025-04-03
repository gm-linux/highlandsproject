async function handleContactForm(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById('form-status').innerText = result.message || 'Message sent!';
}

async function loadProjects() {
    try {
        const res = await fetch('/projects');
        const projects = await res.json();
        const grid = document.getElementById('project-grid');
        grid.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ''}
                ${project.url ? `<a href="${project.url}" target="_blank">Live Demo</a>` : ''}
            `;
            grid.appendChild(card);
        });

    } catch (err) {
        console.error('Failed to load projects:', err);
    }
}

// Call this on page load
window.addEventListener('DOMContentLoaded', loadProjects);


