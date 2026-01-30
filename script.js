// ==========================================
// Global Variables & State
// ==========================================
const state = {
    currentLanguage: 'ar',
    isLoading: false,
    talents: [],
    currentCategory: 'all',
    piConnected: false,
    userStats: {
        users: 15234,
        talents: 8456,
        countries: 142
    }
};

// ==========================================
// Translations
// ==========================================
const translations = {
    ar: {
        title: 'Talent Universe - عالم المواهب',
        heroTitle: 'اكتشف موهبتك في عالم لا مركزي',
        heroSubtitle: 'منصة Web3 لتنمية المواهب والإبداع على شبكة Pi Network',
        getStarted: 'ابدأ الآن',
        learnMore: 'اعرف المزيد',
        connectPi: 'اتصل بـ Pi',
        features: 'مميزات التطبيق',
        talents: 'معرض المواهب',
        kidsSection: 'قسم مواهب الأطفال',
        learning: 'وضع التعليم والتطوير',
        community: 'انضم إلى المجتمع',
        aiGreeting: 'مرحباً! أنا هنا لمساعدتك. كيف يمكنني مساعدتك اليوم؟'
    },
    en: {
        title: 'Talent Universe',
        heroTitle: 'Discover Your Talent in a Decentralized World',
        heroSubtitle: 'Web3 Platform for Talent Development on Pi Network',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        connectPi: 'Connect Pi',
        features: 'Features',
        talents: 'Talent Showcase',
        kidsSection: 'Kids Talents',
        learning: 'Learning Mode',
        community: 'Join Community',
        aiGreeting: 'Hello! I\'m here to help you. How can I assist you today?'
    }
};

// ==========================================
// Sample Talent Data
// ==========================================
const talentData = [
    {
        id: 1,
        title: 'لوحة فنية رقمية',
        author: 'أحمد محمد',
        category: 'art',
        image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
        likes: 234,
        views: 1250
    },
    {
        id: 2,
        title: 'مقطوعة موسيقية أصلية',
        author: 'سارة علي',
        category: 'music',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400',
        likes: 189,
        views: 890
    },
    {
        id: 3,
        title: 'تطبيق ويب تفاعلي',
        author: 'كريم حسن',
        category: 'tech',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
        likes: 456,
        views: 2340
    },
    {
        id: 4,
        title: 'دورة تعليمية في البرمجة',
        author: 'فاطمة أحمد',
        category: 'education',
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        likes: 567,
        views: 3210
    },
    {
        id: 5,
        title: 'تصميم جرافيك احترافي',
        author: 'محمود سعيد',
        category: 'art',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400',
        likes: 321,
        views: 1890
    },
    {
        id: 6,
        title: 'أغنية راب عربية',
        author: 'ياسمين خالد',
        category: 'music',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        likes: 678,
        views: 4560
    }
];

// ==========================================
// AI Assistant Responses
// ==========================================
const aiResponses = {
    ar: [
        'يمكنني مساعدتك في اكتشاف موهبتك! ما المجال الذي يثير اهتمامك؟',
        'هل تريد معرفة كيفية تطوير مهاراتك؟',
        'يمكنني توجيهك إلى الموارد التعليمية المناسبة.',
        'أخبرني عن هدفك وسأساعدك في تحقيقه!',
        'لديك سؤال عن استخدام المنصة؟ أنا هنا للمساعدة!'
    ],
    en: [
        'I can help you discover your talent! What field interests you?',
        'Would you like to know how to develop your skills?',
        'I can guide you to appropriate learning resources.',
        'Tell me about your goal and I\'ll help you achieve it!',
        'Do you have a question about using the platform? I\'m here to help!'
    ]
};

// ==========================================
// Utility Functions
// ==========================================
function showLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('active');
        state.isLoading = true;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.remove('active');
        state.isLoading = false;
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 16);
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scroll and active link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Close mobile menu
                if (navMenu) navMenu.classList.remove('active');
            }
        });
    });
    
    // Scroll spy
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// Language Switcher
// ==========================================
function initLanguageSwitcher() {
    const langSwitch = document.getElementById('langSwitch');
    
    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            state.currentLanguage = state.currentLanguage === 'ar' ? 'en' : 'ar';
            updateLanguage();
        });
    }
}

function updateLanguage() {
    const html = document.documentElement;
    const lang = state.currentLanguage;
    
    html.setAttribute('lang', lang);
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update lang switch button
    const langSwitch = document.getElementById('langSwitch');
    if (langSwitch) {
        langSwitch.textContent = lang === 'ar' ? 'EN' : 'ع';
    }
    
    showToast(
        lang === 'ar' ? 'تم تغيير اللغة بنجاح' : 'Language changed successfully',
        'success'
    );
}

// ==========================================
// Stats Animation
// ==========================================
function initStatsAnimation() {
    const userCountEl = document.getElementById('userCount');
    const talentCountEl = document.getElementById('talentCount');
    const countryCountEl = document.getElementById('countryCount');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (userCountEl) animateCounter(userCountEl, state.userStats.users);
                if (talentCountEl) animateCounter(talentCountEl, state.userStats.talents);
                if (countryCountEl) animateCounter(countryCountEl, state.userStats.countries);
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
}

// ==========================================
// Talent Cards
// ==========================================
function renderTalentCard(talent) {
    return `
        <div class="talent-card fade-in" data-category="${talent.category}">
            <img src="${talent.image}" alt="${talent.title}" class="talent-image">
            <div class="talent-info">
                <span class="talent-category">${getCategoryName(talent.category)}</span>
                <h3 class="talent-title">${talent.title}</h3>
                <p class="talent-author">بواسطة ${talent.author}</p>
                <div class="talent-stats">
                    <div class="talent-stat">
                        <i class="fas fa-heart"></i>
                        <span>${talent.likes}</span>
                    </div>
                    <div class="talent-stat">
                        <i class="fas fa-eye"></i>
                        <span>${talent.views}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCategoryName(category) {
    const names = {
        all: 'الكل',
        art: 'فن',
        music: 'موسيقى',
        tech: 'تقنية',
        education: 'تعليم'
    };
    return names[category] || category;
}

function loadTalents() {
    const grid = document.getElementById('talentsGrid');
    if (!grid) return;
    
    const filtered = state.currentCategory === 'all' 
        ? talentData 
        : talentData.filter(t => t.category === state.currentCategory);
    
    grid.innerHTML = filtered.map(talent => renderTalentCard(talent)).join('');
    
    // Add click listeners
    grid.querySelectorAll('.talent-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            showToast('جاري فتح الموهبة...', 'info');
        });
    });
}

function initTalentFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            state.currentCategory = btn.dataset.category;
            loadTalents();
        });
    });
}

// ==========================================
// Pi Network Integration
// ==========================================
async function connectToPi() {
    showLoading();
    
    // Simulate Pi SDK connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    hideLoading();
    
    if (Math.random() > 0.2) { // 80% success rate for demo
        state.piConnected = true;
        showToast('تم الاتصال بـ Pi Network بنجاح!', 'success');
        
        const connectBtn = document.getElementById('connectPi');
        if (connectBtn) {
            connectBtn.innerHTML = '<i class="fas fa-check-circle"></i> متصل';
            connectBtn.style.background = 'var(--success)';
        }
    } else {
        showToast('فشل الاتصال بـ Pi Network. حاول مرة أخرى.', 'error');
    }
}

function initPiConnection() {
    const connectBtn = document.getElementById('connectPi');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', connectToPi);
    }
}

// ==========================================
// AI Assistant
// ==========================================
function initAIAssistant() {
    const aiToggle = document.getElementById('aiToggle');
    const aiClose = document.getElementById('aiClose');
    const aiChat = document.getElementById('aiChat');
    const aiSend = document.getElementById('aiSend');
    const aiInput = document.getElementById('aiInput');
    const aiMessages = document.getElementById('aiMessages');
    
    if (aiToggle && aiChat) {
        aiToggle.addEventListener('click', () => {
            aiChat.classList.toggle('active');
        });
    }
    
    if (aiClose && aiChat) {
        aiClose.addEventListener('click', () => {
            aiChat.classList.remove('active');
        });
    }
    
    function sendMessage() {
        const message = aiInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMsg = document.createElement('div');
        userMsg.className = 'ai-message ai-message-user';
        userMsg.innerHTML = `<p>${message}</p>`;
        aiMessages.appendChild(userMsg);
        
        aiInput.value = '';
        
        // Scroll to bottom
        aiMessages.scrollTop = aiMessages.scrollHeight;
        
        // Simulate AI response
        setTimeout(() => {
            const responses = aiResponses[state.currentLanguage];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            const botMsg = document.createElement('div');
            botMsg.className = 'ai-message ai-message-bot';
            botMsg.innerHTML = `<p>${randomResponse}</p>`;
            aiMessages.appendChild(botMsg);
            
            aiMessages.scrollTop = aiMessages.scrollHeight;
        }, 1000);
    }
    
    if (aiSend) {
        aiSend.addEventListener('click', sendMessage);
    }
    
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// ==========================================
// Button Handlers
// ==========================================
function initButtonHandlers() {
    const getStarted = document.getElementById('getStarted');
    const learnMore = document.getElementById('learnMore');
    const joinCommunity = document.getElementById('joinCommunity');
    const loadMoreTalents = document.getElementById('loadMoreTalents');
    
    if (getStarted) {
        getStarted.addEventListener('click', () => {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast('مرحباً بك في Talent Universe!', 'success');
            }, 1500);
        });
    }
    
    if (learnMore) {
        learnMore.addEventListener('click', () => {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    if (joinCommunity) {
        joinCommunity.addEventListener('click', () => {
            showToast('جاري فتح صفحة الانضمام...', 'info');
        });
    }
    
    if (loadMoreTalents) {
        loadMoreTalents.addEventListener('click', () => {
            showLoading();
            setTimeout(() => {
                hideLoading();
                showToast('تم تحميل المزيد من المواهب!', 'success');
            }, 1000);
        });
    }
}

// ==========================================
// Scroll Animations
// ==========================================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all cards and sections
    document.querySelectorAll('.feature-card, .learning-card, .kids-card').forEach(el => {
        observer.observe(el);
    });
}

// ==========================================
// Keyboard Shortcuts
// ==========================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Open AI Assistant
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const aiChat = document.getElementById('aiChat');
            if (aiChat) {
                aiChat.classList.toggle('active');
            }
        }
        
        // Escape: Close AI Assistant
        if (e.key === 'Escape') {
            const aiChat = document.getElementById('aiChat');
            if (aiChat) {
                aiChat.classList.remove('active');
            }
        }
    });
}

// ==========================================
// Performance Monitoring
// ==========================================
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        });
    }
}

// ==========================================
// Error Handling
// ==========================================
window.addEventListener('error', (e) => {
    console.error('Application Error:', e.error);
    showToast('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.', 'error');
});

// ==========================================
// Initialization
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 Talent Universe Loading...');
    
    // Initialize all modules
    initNavigation();
    initLanguageSwitcher();
    initStatsAnimation();
    loadTalents();
    initTalentFilter();
    initPiConnection();
    initAIAssistant();
    initButtonHandlers();
    initScrollAnimations();
    initKeyboardShortcuts();
    logPerformance();
    
    // Welcome message
    setTimeout(() => {
        showToast('مرحباً بك في Talent Universe! 🌟', 'success');
    }, 500);
    
    console.log('✨ Talent Universe Ready!');
});

// ==========================================
// Service Worker Registration (Optional)
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA features
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered:', reg))
        //     .catch(err => console.log('Service Worker registration failed:', err));
    });
}

// ==========================================
// Export for external use
// ==========================================
window.TalentUniverse = {
    state,
    showToast,
    showLoading,
    hideLoading,
    connectToPi,
    loadTalents
};
