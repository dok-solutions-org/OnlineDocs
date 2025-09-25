// Script principal para o site DokSolutions

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações e interações
    initializeAnimations();
    initializeSmoothScroll();
    initializeCardInteractions();
    
    console.log('DokSolutions - Site carregado com sucesso!');
});

// Função para inicializar animações
function initializeAnimations() {
    // Adicionar animação fade-in aos cards quando entram na viewport
    const cards = document.querySelectorAll('.card-hover');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in-up');
                }, index * 100); // Delay progressivo
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Função para scroll suave nos links de navegação
function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para interações com cards
function initializeCardInteractions() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        // Efeito de hover melhorado
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique
        const cardButton = card.querySelector('a:not([disabled])');
        if (cardButton) {
            cardButton.addEventListener('click', function(e) {
                // Adicionar efeito de loading
                this.classList.add('btn-loading');
                
                // Remover loading após um tempo (simular carregamento)
                setTimeout(() => {
                    this.classList.remove('btn-loading');
                }, 1000);
            });
        }
    });
}

// Função para mostrar notificações (futuro uso)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${getNotificationClass(type)}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Função auxiliar para classes de notificação
function getNotificationClass(type) {
    switch(type) {
        case 'success':
            return 'bg-green-500 text-white';
        case 'error':
            return 'bg-red-500 text-white';
        case 'warning':
            return 'bg-yellow-500 text-black';
        default:
            return 'bg-blue-500 text-white';
    }
}

// Função para busca futura (quando houver mais documentações)
function searchDocumentations(query) {
    const cards = document.querySelectorAll('.card-hover');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('h4').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            card.classList.add('fade-in-up');
        } else {
            card.style.display = 'none';
        }
    });
}

// Event listener para teclas de atalho
document.addEventListener('keydown', function(e) {
    // Ctrl + / para abrir busca (futuro)
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        console.log('Busca não implementada ainda');
        // Implementar modal de busca no futuro
    }
    
    // Esc para fechar modais (futuro)
    if (e.key === 'Escape') {
        // Fechar qualquer modal aberto
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
});

// Função para detectar tema do sistema (futuro uso)
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Função para analytics simples (opcional)
function trackEvent(eventName, properties = {}) {
    console.log(`Event: ${eventName}`, properties);
    // Implementar analytics real se necessário
}

// Exportar funções para uso global
window.DokSolutions = {
    showNotification,
    searchDocumentations,
    trackEvent
};