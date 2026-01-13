// auth.js - Lógica de Login e Redirecionamento

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim(); // Num sistema real, validaríamos a senha
    
    if (!email || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Carrega o banco de dados simulado
    const db = JSON.parse(localStorage.getItem('bookCampaignData'));

    // --- LÓGICA DE ADMINISTRADOR ---
    // Verifica se é o email mestre
    if (email === "admin@campanha.com") {
        
        // Define usuário como Admin
        db.currentUser = {
            name: "Administrador",
            email: email,
            isAdmin: true,
            teamId: null,
            teamName: "Staff"
        };

        // Salva e Redireciona para o Painel Admin
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        
        // CAMINHO PARA O ADMIN
        window.location.href = 'pages/admin/admin.html'; 

    } 
    // --- LÓGICA DE USUÁRIO COMUM ---
    else {
        // Extrai o nome do email (ex: lucas@gmail -> Lucas)
        const nameFromEmail = email.split('@')[0];
        const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

        // Define usuário comum (Simulamos que ele já tem o time ID 3 para teste)
        db.currentUser = {
            name: formattedName,
            email: email,
            isAdmin: false,
            teamId: 3, 
            teamName: "Sociedade do Livro"
        };

        // Salva e Redireciona para a Home (Missões)
        localStorage.setItem('bookCampaignData', JSON.stringify(db));
        
        // CAMINHO ATUALIZADO (Inglês)
        window.location.href = 'pages/missions/missions.html';
    }
});