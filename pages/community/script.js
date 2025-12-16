document.addEventListener('DOMContentLoaded', () => {
    const db = JSON.parse(localStorage.getItem('bookCampaignData'));
    if (!db || !db.currentUser) { window.location.href = '../../index.html'; return; }

    const feedContainer = document.getElementById('feedList');
    const btnPost = document.getElementById('btnPost');
    const inputPost = document.getElementById('postInput');

    // Helper para pegar iniciais (Ex: "Ana Silva" -> "AS")
    function getInitials(name) {
        const parts = name.split(' ');
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }

    // Helper para cor aleatória pastel no avatar
    function getRandomColor() {
        const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFF9C4', '#E1BEE7'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function renderFeed() {
        feedContainer.innerHTML = '';
        
        db.feed.forEach(post => {
            const initials = getInitials(post.user);
            const avatarColor = post.user === db.currentUser.name ? 'var(--primary)' : getRandomColor();
            
            // VERIFICAÇÃO SE É ADMIN
            const adminClass = post.isAdmin ? 'admin-highlight' : '';

            const html = `
                <div class="post-card ${adminClass}"> <div class="post-header">
                        <div class="avatar-circle" style="background-color: ${avatarColor}; color: #555">
                            ${initials}
                        </div>
                        <div class="post-user-info">
                            <span class="post-username">${post.user}</span>
                            <span class="post-team">${post.team || 'Staff'}</span>
                        </div>
                        <span class="post-time">${post.time}</span>
                    </div>
                    <div class="post-content">
                        ${post.text}
                    </div>
                </div>
            `;
            feedContainer.innerHTML += html;
        });
    }

    renderFeed();

    // Lógica de Postar
    btnPost.addEventListener('click', () => {
        const text = inputPost.value.trim();
        if (!text) return;

        const newPost = {
            user: db.currentUser.name,
            team: db.currentUser.teamName,
            text: text,
            time: "Agora"
        };

        db.feed.unshift(newPost);
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        inputPost.value = '';
        renderFeed();
    });
});