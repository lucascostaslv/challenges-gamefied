// Funcao global para trocar abas
window.showTab = function(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`tab-${tabName}`).style.display = 'block';
    // Nota: A lógica de classe active no botão poderia ser mais elaborada, mas simplificamos
};

document.addEventListener('DOMContentLoaded', () => {
    const db = JSON.parse(localStorage.getItem('bookCampaignData'));

    // 1. PROTEÇÃO DE ROTA: Só Admin entra
    if (!db || !db.currentUser || !db.currentUser.isAdmin) {
        alert("Acesso Negado. Área restrita a administradores.");
        window.location.href = '../../index.html';
        return;
    }

    // --- Lógica de Missões ---
    const missionsList = document.getElementById('adminMissionsList');
    
    function renderMissions() {
        missionsList.innerHTML = '';
        db.missions.forEach((m, index) => {
            missionsList.innerHTML += `
                <div class="admin-item">
                    <div>
                        <strong>${m.title}</strong><br>
                        <small>${m.points} pts</small>
                    </div>
                    <button class="btn-delete" onclick="deleteMission(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
    }
    renderMissions();

    // Criar Missão
    document.getElementById('btnCreateMission').addEventListener('click', () => {
        const title = document.getElementById('mTitle').value;
        const desc = document.getElementById('mDesc').value;
        const pts = document.getElementById('mPoints').value;

        if(!title || !pts) return alert("Preencha os dados");

        db.missions.push({
            id: Date.now(),
            title: title,
            description: desc,
            points: parseInt(pts),
            status: "in_progress", // Padrão
            progress: 0
        });
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        renderMissions();
        alert("Missão criada!");
    });

    // Deletar Missão (Exposta globalmente para o onclick funcionar)
    window.deleteMission = function(index) {
        if(confirm("Apagar missão?")) {
            db.missions.splice(index, 1);
            localStorage.setItem('bookCampaignData', JSON.stringify(db));
            renderMissions();
        }
    };

    // --- Lógica de Moderação ---
    const feedList = document.getElementById('adminFeedList');
    
    function renderFeed() {
        feedList.innerHTML = '';
        db.feed.forEach((post, index) => {
            feedList.innerHTML += `
                <div class="admin-item">
                    <div>
                        <strong>${post.user}</strong>: ${post.text.substring(0, 40)}...
                    </div>
                    <button class="btn-delete" onclick="deletePost(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
    }
    renderFeed();

    window.deletePost = function(index) {
        if(confirm("Apagar post?")) {
            db.feed.splice(index, 1);
            localStorage.setItem('bookCampaignData', JSON.stringify(db));
            renderFeed();
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    // ... (Código existente de verificação de admin) ...

    // --- LÓGICA DE USUÁRIOS (NOVO) ---
    const usersListContainer = document.getElementById('adminUsersList');
    
    function renderUsers(filter = "") {
        usersListContainer.innerHTML = '';
        
        // Filtra usuários se houver busca
        const filteredUsers = db.users.filter(u => 
            u.email.toLowerCase().includes(filter.toLowerCase()) || 
            u.name.toLowerCase().includes(filter.toLowerCase())
        );

        if(filteredUsers.length === 0) {
            usersListContainer.innerHTML = '<p style="color:#999; text-align:center">Nenhum usuário encontrado.</p>';
            return;
        }

        filteredUsers.forEach((user, index) => {
            // Não permite excluir a si mesmo
            const isMe = user.email === db.currentUser.email;
            
            usersListContainer.innerHTML += `
                <div class="admin-item">
                    <div style="flex-grow:1">
                        <strong>${user.name}</strong> ${user.isAdmin ? '<span style="color:orange; font-size:0.8rem">(Admin)</span>' : ''}<br>
                        <small style="color:#666">${user.email}</small><br>
                        <small style="color:${user.teamName ? '#4a90e2' : '#999'}">
                            ${user.teamName || 'Sem equipe'}
                        </small>
                    </div>
                    ${!isMe ? `
                    <button class="btn-delete" onclick="deleteUser('${user.email}')">
                        <i class="fas fa-trash"></i>
                    </button>` : ''}
                </div>
            `;
        });
    }

    // Inicializa a lista
    renderUsers();

    // Evento de busca
    document.getElementById('searchUser').addEventListener('input', (e) => {
        renderUsers(e.target.value);
    });

    // Função global de deletar usuário
    window.deleteUser = function(emailToDelete) {
        if(confirm(`Tem certeza que deseja remover o usuário ${emailToDelete}?`)) {
            // Encontra o índice no array real
            const realIndex = db.users.findIndex(u => u.email === emailToDelete);
            if(realIndex > -1) {
                db.users.splice(realIndex, 1);
                localStorage.setItem('bookCampaignData', JSON.stringify(db));
                renderUsers(document.getElementById('searchUser').value);
                alert("Usuário removido.");
            }
        }
    };
});