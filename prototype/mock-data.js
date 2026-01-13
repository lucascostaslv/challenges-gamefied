// mock-data.js - ATUALIZADO V2

const SYSTEM_DATA = {
    currentUser: null,
    // Lista de usuários cadastrados (simulação)
    users: [
        { email: "admin@campanha.com", name: "Administrador", isAdmin: true, teamId: null },
        { email: "user@campanha.com", name: "Lucas Silva", isAdmin: false, teamId: 3, teamName: "Sociedade do Livro" }
    ],
    teams: [
        { id: 1, name: "Guardiões da Leitura", score: 4500, members: 5 },
        { id: 2, name: "Devoradores de Páginas", score: 3200, members: 4 },
        { id: 3, name: "Sociedade do Livro", score: 5100, members: 6 }
    ],
    missions: [
        { id: 1, title: "Primeira Doação", description: "Doe seu primeiro livro.", points: 150, status: "completed" },
        { id: 2, title: "Meta da Equipe", description: "Atingir 50 livros.", points: 2500, status: "in_progress", progress: 60 }
    ],
    feed: [
        { id: 101, user: "Administrador", isAdmin: true, text: "Bem-vindos à Maratona de Doações 2025! 🚀", time: "Fixado" },
        { id: 102, user: "Ana Silva", team: "Guardiões da Leitura", text: "Acabei de doar a coleção do Harry Potter!", time: "Há 10 min" }
    ]
};

function initMockData() {
    if (!localStorage.getItem('bookCampaignData')) {
        console.log("Inicializando banco V2...");
        localStorage.setItem('bookCampaignData', JSON.stringify(SYSTEM_DATA));
    }
}

initMockData();