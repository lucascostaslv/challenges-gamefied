document.addEventListener('DOMContentLoaded', () => {
    const db = JSON.parse(localStorage.getItem('bookCampaignData'));
    if (!db || !db.currentUser) { window.location.href = '../../index.html'; return; }

    const container = document.getElementById('raceTrack');
    const myTeamId = db.currentUser.teamId;

    // Ordenar do maior para o menor
    const sortedTeams = db.teams.sort((a, b) => b.score - a.score);

    // Descobrir a pontuação máxima (para calcular a barra de 100%)
    const maxScore = sortedTeams[0].score;

    sortedTeams.forEach((team, index) => {
        const position = index + 1;
        const isMyTeam = team.id === myTeamId;
        
        // Calcula a largura da barra (Regra de 3 simples)
        // Se maxScore é 5000 e time tem 2500, width = 50%
        const barWidth = (team.score / maxScore) * 100;

        const html = `
            <div class="race-item rank-${position} ${isMyTeam ? 'my-team-card' : ''}">
                <div class="race-info">
                    <span class="race-rank">#${position}</span>
                    <span class="race-team-name">${team.name} ${isMyTeam ? '(Você)' : ''}</span>
                    <span class="race-points">${team.score} pts</span>
                </div>
                <div class="progress-track">
                    <div class="progress-bar" style="width: ${barWidth}%"></div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
});