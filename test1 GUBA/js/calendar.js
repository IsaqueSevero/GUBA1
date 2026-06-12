// Calendar management
const calendarEvents = [
    { date: '2024-06-15', title: 'Semana de Provas 1º Bimestre', type: 'prova' },
    { date: '2024-06-20', title: 'Avaliação Parcial - Matemática', type: 'parcial' },
    { date: '2024-06-25', title: 'Palestra: Empreendedorismo', type: 'palestra' },
    { date: '2024-07-01', title: 'Feriado - Dia da Independência', type: 'feriado' },
    { date: '2024-07-10', title: 'Gincana 2024', type: 'evento' },
    { date: '2024-07-15', title: 'Reunião do Grêmio', type: 'reuniao' },
    { date: '2024-07-20', title: 'Simulado ENEM', type: 'simulado' },
];

const eventTypes = {
    prova: { color: '#ff6b6b', icon: '📝' },
    parcial: { color: '#ffa500', icon: '✏️' },
    palestra: { color: '#4dabf7', icon: '🎤' },
    feriado: { color: '#51cf66', icon: '🎉' },
    evento: { color: '#00d4ff', icon: '🎊' },
    reuniao: { color: '#b026ff', icon: '👥' },
    simulado: { color: '#ff922b', icon: '📊' },
};

function initCalendar() {
    // Simple calendar implementation
    const eventosContainer = document.getElementById('eventosContainer');
    
    if (eventosContainer) {
        renderEventsList();
    }
}

function renderEventsList() {
    const eventosContainer = document.getElementById('eventosContainer');
    
    // Sort events by date
    const sortedEvents = [...calendarEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Show upcoming events (next 10 days)
    const today = new Date();
    const upcoming = sortedEvents.filter(event => {
        const eventDate = new Date(event.date);
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays >= -30 && diffDays <= 30;
    });

    eventosContainer.innerHTML = upcoming.map(event => {
        const eventType = eventTypes[event.type];
        const eventDate = new Date(event.date);
        const today = new Date();
        const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
        
        let countdownText = '';
        if (daysUntil > 0) {
            countdownText = `Em ${daysUntil} dia${daysUntil === 1 ? '' : 's'}`;
        } else if (daysUntil === 0) {
            countdownText = 'Hoje!';
        } else {
            countdownText = `Há ${Math.abs(daysUntil)} dia${Math.abs(daysUntil) === 1 ? '' : 's'}`;
        }

        return `
            <div class="evento-item">
                <div class="evento-title">${eventType.icon} ${event.title}</div>
                <div class="evento-data">${eventDate.toLocaleDateString('pt-BR')}</div>
                <div class="evento-countdown">${countdownText}</div>
            </div>
        `;
    }).join('');
}

function addEvent(date, title, type) {
    const event = { date, title, type };
    calendarEvents.push(event);
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
    renderEventsList();
}

function removeEvent(index) {
    calendarEvents.splice(index, 1);
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents));
    renderEventsList();
}

// Load custom events from localStorage on page load
window.addEventListener('load', () => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
        try {
            const customEvents = JSON.parse(savedEvents);
            calendarEvents.push(...customEvents);
        } catch (e) {
            console.error('Error loading saved events:', e);
        }
    }
    initCalendar();
});

// Update events every minute to update countdowns
setInterval(() => {
    renderEventsList();
}, 60000);