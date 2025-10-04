class ZionSystem {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startAnimations();
    }

    init() {
        this.navbar = document.querySelector('.nav');
        this.featureCards = document.querySelectorAll('.feature-card');
        this.systemComponents = document.querySelectorAll('.suit-component');
        this.energyConnections = document.querySelectorAll('.connection');
        this.ctaButtons = document.querySelectorAll('.cta-button');
        
        // Performance metrics
        this.metrics = {
            powerConsumption: 3,
            powerGeneration: 5,
            oxygenRate: 100,
            efficiency: 85
        };
        
        this.isScrolling = false;
    }

    setupEventListeners() {
        // Scroll effects for navbar
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
        
        // Feature card interactions
        this.featureCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleFeatureHover.bind(this));
            card.addEventListener('mouseleave', this.handleFeatureLeave.bind(this));
            card.addEventListener('click', this.handleFeatureClick.bind(this));
        });

        // System component interactions
        this.systemComponents.forEach(component => {
            component.addEventListener('click', this.handleComponentClick.bind(this));
            component.addEventListener('mouseenter', this.showComponentTooltip.bind(this));
            component.addEventListener('mouseleave', this.hideComponentTooltip.bind(this));
        });

        // CTA button interactions
        this.ctaButtons.forEach(button => {
            button.addEventListener('click', this.handleCTAClick.bind(this));
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });

        // Intersection Observer for animations
        this.setupIntersectionObserver();
        
        // Real-time system monitoring
        this.startSystemMonitoring();
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const scrollPercent = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1);
        
        // Navbar effects
        if (scrollY > 100) {
            this.navbar.style.background = 'rgba(28, 28, 30, 0.95)';
            this.navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)';
        } else {
            this.navbar.style.background = 'rgba(28, 28, 30, 0.72)';
            this.navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        }

        // Parallax effects
        this.updateParallaxElements(scrollPercent);
    }

    updateParallaxElements(scrollPercent) {
        const heroVisual = document.querySelector('.hero-visual');
        const systemPreview = document.querySelector('.system-preview');
        
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrollPercent * 50}px)`;
        }
        
        if (systemPreview) {
            systemPreview.style.transform = `rotate(${scrollPercent * 5}deg)`;
        }
    }

    handleFeatureHover(e) {
        const card = e.currentTarget;
        const feature = card.dataset.feature;
        
        // Add enhanced hover state
        card.style.transform = 'translateY(-12px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(0, 122, 255, 0.2)';
        
        // Trigger related system animations
        this.highlightSystemFeature(feature);
        
        // Add sound effect (if enabled)
        this.playInteractionSound('hover');
    }

    handleFeatureLeave(e) {
        const card = e.currentTarget;
        
        // Reset hover state
        card.style.transform = '';
        card.style.boxShadow = '';
        
        // Reset system highlights
        this.resetSystemHighlights();
    }

    handleFeatureClick(e) {
        const card = e.currentTarget;
        const feature = card.dataset.feature;
        
        // Animate card selection
        this.animateCardSelection(card);
        
        // Show detailed information
        this.showFeatureDetails(feature);
        
        // Play selection sound
        this.playInteractionSound('select');
    }

    handleComponentClick(e) {
        const component = e.currentTarget;
        const componentType = component.classList[1]; // Get second class (e.g., 'piezo')
        
        // Animate component activation
        this.animateComponentActivation(component);
        
        // Show component details
        this.showComponentDetails(componentType);
        
        // Update system metrics
        this.updateSystemMetrics(componentType);
    }

    handleCTAClick(e) {
        const button = e.currentTarget;
        const isPrimary = button.classList.contains('primary');
        
        if (isPrimary) {
            // Scroll to features section with smooth animation
            this.smoothScrollTo('#features');
        } else {
            // Show interactive demo
            this.showInteractiveDemo();
        }
        
        // Button press animation
        this.animateButtonPress(button);
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        this.smoothScrollTo(targetId);
        
        // Update active nav link
        this.updateActiveNavLink(e.currentTarget);
    }

    highlightSystemFeature(feature) {
        // Map features to system components
        const featureMap = {
            'intake': '.flow-input',
            'electrolysis': '.unit-main',
            'transfer': '.processing-flows',
            'harvesting': '.suit-component.piezo',
            'cogeneration': '.unit-vents',
            'monitoring': '.device-screen'
        };

        const element = document.querySelector(featureMap[feature]);
        if (element) {
            element.style.boxShadow = '0 0 20px #007AFF';
            element.style.transform = 'scale(1.1)';
            element.style.transition = 'all 0.3s ease';
        }
    }

    resetSystemHighlights() {
        const highlightedElements = document.querySelectorAll('[style*="box-shadow"]');
        highlightedElements.forEach(element => {
            element.style.boxShadow = '';
            element.style.transform = '';
        });
    }

    animateCardSelection(card) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(0, 122, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    animateComponentActivation(component) {
        const pulse = component.querySelector('.component-pulse');
        if (pulse) {
            pulse.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                pulse.style.animation = 'pulse 2s infinite';
            }, 500);
        }
    }

    animateButtonPress(button) {
        button.style.transform = 'scale(0.95)';
        button.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    showComponentTooltip(e) {
        const component = e.currentTarget;
        const tooltipText = component.dataset.tooltip;
        
        if (!tooltipText) return;
        
        const tooltip = this.createTooltip(tooltipText);
        const rect = component.getBoundingClientRect();
        
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        document.body.appendChild(tooltip);
        component.tooltip = tooltip;
    }

    hideComponentTooltip(e) {
        const component = e.currentTarget;
        if (component.tooltip) {
            component.tooltip.remove();
            component.tooltip = null;
        }
    }

    createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'system-tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: fixed;
            background: rgba(28, 28, 30, 0.95);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 500;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            animation: fadeInUp 0.2s ease;
        `;
        return tooltip;
    }

    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;
        
        const targetPosition = target.offsetTop - 80; // Account for fixed navbar
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    updateActiveNavLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.style.color = '';
            link.style.background = '';
        });
        
        activeLink.style.color = '#007AFF';
        activeLink.style.background = 'rgba(0, 122, 255, 0.1)';
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add stagger animation for grid items
                    if (entry.target.parentElement.classList.contains('features-grid') ||
                        entry.target.parentElement.classList.contains('specs-grid') ||
                        entry.target.parentElement.classList.contains('benefits-grid')) {
                        this.staggerGridAnimation(entry.target.parentElement);
                    }
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(`
            .feature-card, .spec-category, .benefit-item, 
            .system-visualization, .section-header
        `);
        
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    staggerGridAnimation(grid) {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    startAnimations() {
        // Start continuous system animations
        this.animateEnergyFlow();
        this.animateSystemComponents();
        this.updateLiveMetrics();
    }

    animateEnergyFlow() {
        const energyConnections = document.querySelectorAll('.connection');
        energyConnections.forEach((connection, index) => {
            connection.style.animationDelay = `${index * 0.5}s`;
        });
    }

    animateSystemComponents() {
        const components = document.querySelectorAll('.suit-component .component-pulse');
        components.forEach((component, index) => {
            component.style.animationDelay = `${index * 0.3}s`;
        });
    }

    updateLiveMetrics() {
        setInterval(() => {
            // Simulate live system metrics
            this.metrics.oxygenRate = 95 + Math.random() * 10;
            this.metrics.efficiency = 80 + Math.random() * 10;
            
            // Update UI elements with new metrics
            this.refreshMetricDisplays();
        }, 2000);
    }

    refreshMetricDisplays() {
        const oxygenIndicators = document.querySelectorAll('.indicator');
        oxygenIndicators.forEach((indicator, index) => {
            if (this.metrics.oxygenRate > 98) {
                indicator.classList.add('active');
            } else if (index < 2) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    startSystemMonitoring() {
        // Real-time system status monitoring
        const statusUpdateInterval = setInterval(() => {
            this.updateSystemStatus();
            this.checkSystemHealth();
        }, 5000);

        // Store interval for cleanup if needed
        this.monitoringInterval = statusUpdateInterval;
    }

    updateSystemStatus() {
        // Simulate system status updates
        const screenLines = document.querySelectorAll('.screen-line');
        screenLines.forEach((line, index) => {
            const shouldPulse = Math.random() > 0.3;
            line.style.opacity = shouldPulse ? '1' : '0.3';
        });
    }

    checkSystemHealth() {
        const healthIndicators = document.querySelectorAll('.vent');
        const isHealthy = this.metrics.efficiency > 85;
        
        healthIndicators.forEach(indicator => {
            indicator.style.backgroundColor = isHealthy ? '#34C759' : '#FF9500';
        });
    }

    showInteractiveDemo() {
        // Create modal for interactive demo
        const modal = document.createElement('div');
        modal.className = 'demo-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Interactive System Demo</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="demo-controls">
                        <div class="control-group">
                            <label>Power Input (kWh)</label>
                            <input type="range" min="1" max="5" value="3" id="powerInput">
                            <span id="powerValue">3 kWh</span>
                        </div>
                        <div class="control-group">
                            <label>Diver Activity Level</label>
                            <select id="activityLevel">
                                <option value="low">Low Activity</option>
                                <option value="moderate">Moderate Activity</option>
                                <option value="high">High Activity</option>
                            </select>
                        </div>
                        <div class="control-group">
                            <label>Water Temperature</label>
                            <input type="range" min="0" max="30" value="15" id="waterTemp">
                            <span id="tempValue">15°C</span>
                        </div>
                    </div>
                    <div class="demo-output">
                        <h3>System Performance</h3>
                        <div class="output-metrics">
                            <div class="output-item">
                                <span>Oxygen Production:</span>
                                <span id="oxygenOutput">100%</span>
                            </div>
                            <div class="output-item">
                                <span>Energy Generated:</span>
                                <span id="energyOutput">5 kWh</span>
                            </div>
                            <div class="output-item">
                                <span>System Efficiency:</span>
                                <span id="efficiencyOutput">85%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        `;

        document.body.appendChild(modal);
        this.setupDemoControls(modal);
        
        // Close modal functionality
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
    }

    setupDemoControls(modal) {
        const powerInput = modal.querySelector('#powerInput');
        const activityLevel = modal.querySelector('#activityLevel');
        const waterTemp = modal.querySelector('#waterTemp');
        
        const powerValue = modal.querySelector('#powerValue');
        const tempValue = modal.querySelector('#tempValue');
        const oxygenOutput = modal.querySelector('#oxygenOutput');
        const energyOutput = modal.querySelector('#energyOutput');
        const efficiencyOutput = modal.querySelector('#efficiencyOutput');

        const updateDemo = () => {
            const power = parseInt(powerInput.value);
            const activity = activityLevel.value;
            const temp = parseInt(waterTemp.value);
            
            // Calculate outputs based on inputs
            const baseEfficiency = 85;
            const tempFactor = Math.max(0.7, 1 - Math.abs(temp - 15) * 0.02);
            const activityMultiplier = { low: 0.8, moderate: 1.0, high: 1.3 }[activity];
            
            const efficiency = Math.min(100, baseEfficiency * tempFactor);
            const energyGen = Math.max(3, power * 1.67 * activityMultiplier);
            const oxygenProd = Math.min(100, efficiency * activityMultiplier);
            
            powerValue.textContent = `${power} kWh`;
            tempValue.textContent = `${temp}°C`;
            oxygenOutput.textContent = `${Math.round(oxygenProd)}%`;
            energyOutput.textContent = `${energyGen.toFixed(1)} kWh`;
            efficiencyOutput.textContent = `${Math.round(efficiency)}%`;
        };

        powerInput.addEventListener('input', updateDemo);
        activityLevel.addEventListener('change', updateDemo);
        waterTemp.addEventListener('input', updateDemo);
        
        updateDemo(); // Initial calculation
    }

    playInteractionSound(type) {
        // Audio feedback for interactions (if enabled)
        if (this.audioEnabled) {
            const frequencies = { hover: 800, select: 1200, success: 1000 };
            this.playTone(frequencies[type] || 800, 0.1, 0.02);
        }
    }

    playTone(frequency, duration, volume = 0.1) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Cleanup method for removing event listeners and intervals
    destroy() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
        // Remove event listeners if needed
    }
}

// Enhanced CSS animations via JavaScript
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
        
        .demo-modal .modal-content {
            background: var(--surface-color);
            border-radius: 20px;
            border: 1px solid var(--border-color);
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .demo-modal .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid var(--border-color);
        }
        
        .demo-modal .modal-header h2 {
            color: var(--text-primary);
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .demo-modal .modal-close {
            background: none;
            border: none;
            color: var(--text-secondary);
            font-size: 1.5rem;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .demo-modal .modal-close:hover {
            background: var(--card-color);
            color: var(--text-primary);
        }
        
        .demo-modal .modal-body {
            padding: 2rem;
        }
        
        .demo-modal .demo-controls {
            margin-bottom: 2rem;
        }
        
        .demo-modal .control-group {
            margin-bottom: 1.5rem;
        }
        
        .demo-modal .control-group label {
            display: block;
            color: var(--text-primary);
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .demo-modal .control-group input,
        .demo-modal .control-group select {
            width: 100%;
            padding: 0.75rem;
            background: var(--card-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            font-size: 1rem;
        }
        
        .demo-modal .control-group input[type="range"] {
            -webkit-appearance: none;
            height: 6px;
            background: var(--border-color);
            border-radius: 3px;
            outline: none;
        }
        
        .demo-modal .control-group input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            cursor: pointer;
        }
        
        .demo-modal .demo-output {
            background: var(--card-color);
            border-radius: 12px;
            padding: 1.5rem;
            border: 1px solid var(--border-color);
        }
        
        .demo-modal .demo-output h3 {
            color: var(--text-primary);
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .demo-modal .output-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.75rem 0;
            border-bottom: 1px solid var(--border-color);
        }
        
        .demo-modal .output-item:last-child {
            border-bottom: none;
        }
        
        .demo-modal .output-item span:first-child {
            color: var(--text-secondary);
        }
        
        .demo-modal .output-item span:last-child {
            color: var(--primary-color);
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
};

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addDynamicStyles();
    const zionSystem = new ZionSystem();
    
    // Make system globally accessible for debugging
    window.zionSystem = zionSystem;
    
    console.log('🚀 Zion Assassins System Initialized');
    console.log('💡 System Features:', {
        'Energy Generation': '5kWh',
        'Power Consumption': '3kWh',
        'Net Efficiency': '+2kWh',
        'Oxygen Production': 'Continuous',
        'Status': 'Operational'
    });
});

// Service worker registration for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}


// Add some fun interactions
// Easter Egg: triggers on "ahdabest" or "28028"
let secret = [];
const targets = ["zion", "39"];

document.addEventListener("keydown", e => {
  secret.push(e.key.toLowerCase());
  if (secret.length > 10) secret.shift();

  const typed = secret.join("");
  if (targets.some(t => typed.endsWith(t))) {
    activateEasterEgg();
    secret = [];
  }
});

function activateEasterEgg() {
  // Notification
  if (typeof showNotification === "function") {
    showNotification("🎉 BIG BANANA 🍌", "success");
  }

  // 🌈 Rainbow + Shake on whole page for 10s
  document.body.style.animation = "rainbow 10s linear, shake 0.5s infinite";
  document.documentElement.style.animation = "rainbow 10s linear, shake 0.5s infinite";

  // 📝 Floating Text (7s)
  const floatingText = document.createElement("div");
  floatingText.innerText = "BIG BANANA 🍌!";
  floatingText.style.position = "fixed";
  floatingText.style.top = "50%";
  floatingText.style.left = "50%";
  floatingText.style.transform = "translate(-50%, -50%)";
  floatingText.style.fontSize = "3rem";
  floatingText.style.fontWeight = "bold";
  floatingText.style.color = "hsl(" + Math.random()*360 + ", 90%, 55%)";
  floatingText.style.zIndex = 100000;
  floatingText.style.pointerEvents = "none";
  floatingText.style.animation = "spinText 3s linear 3";
  document.body.appendChild(floatingText);
  setTimeout(() => floatingText.remove(), 7000);

  // 🍌 Banana rain spawner
  const interval = setInterval(() => spawnBananas(10), 200);

  // Stop after 10s
  setTimeout(() => {
    clearInterval(interval);
    document.body.style.animation = "";
    document.documentElement.style.animation = "";
  }, 10000);
}

// ====== Styles ======
const style = document.createElement("style");
style.textContent = `
@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes shake {
  0%,100% { transform: translate(0,0); }
  25% { transform: translate(-10px,5px); }
  50% { transform: translate(10px,-5px); }
  75% { transform: translate(-5px,10px); }
}
@keyframes bananaFall {
  0% { transform: translateY(-50px) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
}
@keyframes spinText {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(1080deg); }
}
.eg-banana {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  top: -50px;
  animation: bananaFall linear forwards;
}
`;
document.head.appendChild(style);

// ====== Banana Rain ======
function spawnBananas(count) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "eg-banana";
    el.textContent = "🍌";
    el.style.left = Math.random() * window.innerWidth + "px";
    el.style.fontSize = (20 + Math.random() * 40) + "px";
    el.style.animationDuration = (Math.random() * 3 + 4) + "s"; // 4–7s
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 7000);
  }
}

