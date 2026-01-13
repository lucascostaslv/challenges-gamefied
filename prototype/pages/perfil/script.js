document.addEventListener('DOMContentLoaded', () => {
    const db = JSON.parse(localStorage.getItem('bookCampaignData'));
    if (!db || !db.currentUser) { window.location.href = '../../index.html'; return; }

    const inputName = document.getElementById('inputName');
    const inputEmail = document.getElementById('inputEmail');
    const hasTeamSection = document.getElementById('hasTeamSection');
    const noTeamSection = document.getElementById('noTeamSection');
    const currentTeamName = document.getElementById('currentTeamName');
    const selectTeam = document.getElementById('selectTeam');

    // 1. Carregar Dados Pessoais
    inputName.value = db.currentUser.name;
    inputEmail.value = db.currentUser.email;

    document.getElementById('btnSaveProfile').addEventListener('click', () => {
        db.currentUser.name = inputName.value;
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        alert('Perfil atualizado!');
    });

    // 2. Renderizar Seção de Equipe
    function renderTeamSection() {
        if (db.currentUser.teamId) {
            // Tem equipe
            hasTeamSection.style.display = 'block';
            noTeamSection.style.display = 'none';
            currentTeamName.innerText = db.currentUser.teamName || "Equipe Desconhecida";
        } else {
            // Não tem equipe
            hasTeamSection.style.display = 'none';
            noTeamSection.style.display = 'block';
            
            // Popula select de times
            selectTeam.innerHTML = '<option value="">Selecione...</option>';
            db.teams.forEach(t => {
                selectTeam.innerHTML += `<option value="${t.id}">${t.name} (${t.members} membros)</option>`;
            });
        }
    }
    renderTeamSection();

    // 3. Lógica de SAIR da equipe
    document.getElementById('btnLeaveTeam').addEventListener('click', () => {
        if(!confirm("Tem certeza que deseja sair desta equipe?")) return;
        
        db.currentUser.teamId = null;
        db.currentUser.teamName = null;
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        renderTeamSection();
    });

    // 4. Lógica de ENTRAR em equipe
    document.getElementById('btnJoinTeam').addEventListener('click', () => {
        const teamId = parseInt(selectTeam.value);
        if(!teamId) return;

        const team = db.teams.find(t => t.id === teamId);
        if(team) {
            db.currentUser.teamId = team.id;
            db.currentUser.teamName = team.name;
            // Incrementa membro ficticio
            team.members += 1; 
            
            localStorage.setItem('bookCampaignData', JSON.stringify(db));
            renderTeamSection();
            alert(`Bem-vindo à equipe ${team.name}!`);
        }
    });

    // 5. Lógica de CRIAR equipe
    document.getElementById('btnCreateTeam').addEventListener('click', () => {
        const newName = document.getElementById('newTeamName').value;
        if(!newName) return;

        const newId = Date.now(); // ID único simples
        const newTeam = { id: newId, name: newName, score: 0, members: 1 };
        
        db.teams.push(newTeam);
        db.currentUser.teamId = newId;
        db.currentUser.teamName = newName;
        
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        renderTeamSection();
        alert(`Equipe ${newName} criada!`);
    });
});