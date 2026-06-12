// Data management for the website

const avisos = [
    {
        id: 1,
        title: 'Reunião Extraordinária',
        content: 'Comunicamos a realização de uma reunião extraordinária do grêmio para discussão de novas propostas estudantis.',
        date: '2024-06-10',
        category: 'evento',
        priority: 'high'
    },
    {
        id: 2,
        title: 'Mudança de Horários',
        content: 'A partir de segunda-feira, os horários de atendimento do grêmio serão modificados. Confira o novo cronograma!',
        date: '2024-06-09',
        category: 'importante',
        priority: 'high'
    },
    {
        id: 3,
        title: 'Novo Projeto Social',
        content: 'O grêmio anuncia o lançamento de um novo projeto para ajudar alunos com dificuldades nas disciplinas.',
        date: '2024-06-08',
        category: 'evento',
        priority: 'medium'
    },
    {
        id: 4,
        title: 'Manutenção do Sistema',
        content: 'O site passa por manutenção hoje entre 22h e 23h. Pedimos desculpas por qualquer inconveniente.',
        date: '2024-06-07',
        category: 'manutencao',
        priority: 'low'
    },
];

const equipe = [
    {
        id: 1,
        name: 'Maria Silva',
        cargo: 'Presidente',
        initial: 'MS',
        social: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    {
        id: 2,
        name: 'João Santos',
        cargo: 'Vice-Presidente',
        initial: 'JS',
        social: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    {
        id: 3,
        name: 'Ana Costa',
        cargo: 'Secretária',
        initial: 'AC',
        social: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    {
        id: 4,
        name: 'Pedro Oliveira',
        cargo: 'Coordenador de Mídia',
        initial: 'PO',
        social: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    {
        id: 5,
        name: 'Laura Ferreira',
        cargo: 'Coordenadora de Eventos',
        initial: 'LF',
        social: { instagram: '#', twitter: '#', linkedin: '#' }
    },
    {
        id: 6,
        name: 'Carlos Mendes',
        cargo: 'Tesoureiro',
        initial: 'CM',
        social: { instagram: '#', twitter: '#', linkedin: '#' }
    },
];

const galeria = [
    { id: 1, title: 'Gincana 2024', icon: '🎉' },
    { id: 2, title: 'Palestra de Empreendedorismo', icon: '🎤' },
    { id: 3, title: 'Reunião do Grêmio', icon: '👥' },
    { id: 4, title: 'Projeto Social', icon: '❤️' },
    { id: 5, title: 'Campeonato de Futsal', icon: '⚽' },
    { id: 6, title: 'Festa de Integração', icon: '🎊' },
];

// Render functions
function renderAvisos() {
    const avisosList = document.getElementById('avisosList');
    
    if (avisosList) {
        avisosList.innerHTML = avisos.map(aviso => `
            <div class="aviso-card ${aviso.category}">
                <div class="aviso-header">
                    <h3 class="aviso-title">${aviso.title}</h3>
                    <span class="aviso-date">${new Date(aviso.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="aviso-content">
                    ${aviso.content}
                </div>
            </div>
        `).join('');
    }
}

function renderEquipe() {
    const equipeList = document.getElementById('equipeList');
    
    if (equipeList) {
        equipeList.innerHTML = equipe.map(membro => `
            <div class="membro-card">
                <div class="membro-image">${membro.initial}</div>
                <div class="membro-info">
                    <h3 class="membro-name">${membro.name}</h3>
                    <p class="membro-cargo">${membro.cargo}</p>
                    <div class="membro-social">
                        <a href="${membro.social.instagram}" target="_blank" title="Instagram">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a href="${membro.social.twitter}" target="_blank" title="Twitter">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="${membro.social.linkedin}" target="_blank" title="LinkedIn">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function renderGaleria() {
    const galeriaList = document.getElementById('galeriaList');
    
    if (galeriaList) {
        galeriaList.innerHTML = galeria.map(item => `
            <div class="galeria-item">
                <div class="galeria-image">${item.icon}</div>
                <div class="galeria-overlay">
                    <div class="galeria-title">${item.title}</div>
                </div>
            </div>
        `).join('');
    }
}

// Initialize on page load
window.addEventListener('load', () => {
    renderAvisos();
    renderEquipe();
    renderGaleria();
    
    // Load custom data from admin panel
    const customAvisos = localStorage.getItem('customAvisos');
    if (customAvisos) {
        try {
            const parsed = JSON.parse(customAvisos);
            avisos.push(...parsed);
            renderAvisos();
        } catch (e) {
            console.error('Error loading custom avisos:', e);
        }
    }
});

// Add new aviso (called from admin panel)
function addAviso(title, content, category, priority) {
    const newAviso = {
        id: avisos.length + 1,
        title,
        content,
        date: new Date().toISOString().split('T')[0],
        category,
        priority
    };
    
    avisos.unshift(newAviso);
    
    // Save to localStorage
    const customAvisos = JSON.parse(localStorage.getItem('customAvisos') || '[]');
    customAvisos.push(newAviso);
    localStorage.setItem('customAvisos', JSON.stringify(customAvisos));
    
    renderAvisos();
    return newAviso;
}

// Remove aviso (called from admin panel)
function removeAviso(id) {
    const index = avisos.findIndex(a => a.id === id);
    if (index > -1) {
        avisos.splice(index, 1);
        renderAvisos();
    }
}

// Export functions for admin panel
window.siteData = {
    avisos,
    equipe,
    galeria,
    addAviso,
    removeAviso,
    renderAvisos,
    renderEquipe,
    renderGaleria
};