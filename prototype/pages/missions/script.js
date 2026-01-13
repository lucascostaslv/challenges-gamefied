document.addEventListener('DOMContentLoaded', () => {
    // 1. Recuperar dados do LocalStorage
    const db = JSON.parse(localStorage.getItem('bookCampaignData'));

    // Segurança: Se não estiver logado, volta pro login
    if (!db || !db.currentUser) {
        window.location.href = '../../index.html';
        return;
    }

    // 2. Preencher Header com dados do usuário
    document.getElementById('userName').innerText = `Olá, ${db.currentUser.name}`;
    document.getElementById('userTeam').innerText = db.currentUser.teamName;
    // (Num sistema real, buscaríamos os pontos atuais do usuário aqui)
    document.getElementById('userPoints').innerText = "150"; 

    // 3. Renderizar Lista de Missões
    const missionsContainer = document.getElementById('missionsList');
    
    // Limpa lista (caso tenha algo)
    missionsContainer.innerHTML = '';

    db.missions.forEach(mission => {
        // Define classe CSS baseada no status
        let statusClass = '';
        let statusText = '';
        
        switch(mission.status) {
            case 'completed':
                statusClass = 'status-completed';
                statusText = 'Concluída';
                break;
            case 'in_progress':
                statusClass = 'status-in_progress';
                statusText = 'Em andamento';
                break;
            default:
                statusClass = 'status-locked';
                statusText = 'Bloqueada';
        }

        // Template string do Card
        const cardHTML = `
            <div class="mission-card">
                <div class="mission-header">
                    <span class="mission-title">${mission.title}</span>
                    <span class="mission-points">+${mission.points} pts</span>
                </div>
                <p class="mission-desc">${mission.description}</p>
                <div class="mission-footer">
                    <span class="status-badge ${statusClass}">${statusText}</span>
                    ${mission.status === 'in_progress' ? `<small style="float:right">${mission.progress}%</small>` : ''}
                </div>
            </div>
        `;

        missionsContainer.innerHTML += cardHTML;
    });
});