/* =========================================================
   HDI Predictor - Main Script
   Handles particle generation, slider updates, prediction logic,
   scenario buttons, chart rendering, and dark mode toggling.
   ========================================================= */

// ---------- Create Floating Particles ----------
function createParticles() {
    var container = document.getElementById('particles');
    var colors = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];

    for (var i = 0; i < 25; i++) {
        var particle = document.createElement('div');
        particle.className = 'particle';
        var size = Math.random() * 6 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 20 + 15) + 's';
        particle.style.animationDelay = (Math.random() * 20) + 's';
        particle.style.opacity = Math.random() * 0.12 + 0.03;
        container.appendChild(particle);
    }
}

createParticles();

// ---------- DOM Elements ----------
var lifeExpectancy = document.getElementById('lifeExpectancy');
var meanSchooling = document.getElementById('meanSchooling');
var expectedSchooling = document.getElementById('expectedSchooling');
var gniPerCapita = document.getElementById('gniPerCapita');

var lifeSpan = document.getElementById('lifeSpan');
var schoolSpan = document.getElementById('schoolSpan');
var expectedSpan = document.getElementById('expectedSpan');
var gniSpan = document.getElementById('gniSpan');

var hdiScore = document.getElementById('hdiScore');
var hdiCategory = document.getElementById('hdiCategory');
var hdiDescription = document.getElementById('hdiDescription');
var compLife = document.getElementById('compLife');
var compSchool = document.getElementById('compSchool');
var compExpected = document.getElementById('compExpected');
var compGNI = document.getElementById('compGNI');

var predictBtn = document.getElementById('predictBtn');

// ---------- Chart ----------
var hdiChart = null;

function initChart() {
    var ctx = document.getElementById('hdiChart').getContext('2d');
    hdiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Life Expectancy', 'Mean Schooling', 'Expected Schooling', 'GNI per Capita'],
            datasets: [{
                label: 'Current Values',
                data: [72.5, 10.2, 14.5, 15.2],
                backgroundColor: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b'],
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text2').trim() || '#4a4a6a'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: getComputedStyle(document.documentElement).getPropertyValue('--text2').trim() || '#4a4a6a'
                    }
                }
            }
        }
    });
}

function updateChart(life, school, expected, gni) {
    if (!hdiChart) return;
    hdiChart.data.datasets[0].data = [life, school, expected, gni / 1000];
    hdiChart.update();
}

// ---------- HDI Prediction Algorithm ----------
function predictHDI(life, school, expected, gni) {
    // Normalize each indicator to 0-1 scale.
    var lifeNorm = Math.min((life - 50) / 35, 1);
    var schoolNorm = Math.min((school - 2) / 13, 1);
    var expectedNorm = Math.min((expected - 4) / 16, 1);
    var gniNorm = Math.min(Math.log(gni) / Math.log(60000), 1);

    // Calculate HDI using the geometric mean.
    var hdi = Math.pow(lifeNorm * schoolNorm * expectedNorm * gniNorm, 0.25);
    return Math.round(hdi * 1000) / 1000;
}

function getCategory(hdi) {
    if (hdi >= 0.800) {
        return {
            label: 'Very High',
            class: 'very-high',
            desc: 'Very High Human Development — Strong performance across all dimensions. These countries enjoy long life expectancy, universal education, and high living standards.'
        };
    }
    if (hdi >= 0.700) {
        return {
            label: 'High',
            class: 'high',
            desc: 'High Human Development — Good progress across all indicators. These nations have well-developed healthcare, education systems, and growing economies.'
        };
    }
    if (hdi >= 0.550) {
        return {
            label: 'Medium',
            class: 'medium',
            desc: 'Medium Human Development — Moderate performance with room for improvement. Emerging economies often fall in this category, with potential for growth in education and income.'
        };
    }
    return {
        label: 'Low',
        class: 'low',
        desc: 'Low Human Development — Significant challenges across multiple dimensions. These countries require targeted interventions in healthcare, education, and economic development.'
    };
}

// ---------- Update UI ----------
function updateHDI() {
    var life = parseFloat(lifeExpectancy.value);
    var school = parseFloat(meanSchooling.value);
    var expected = parseFloat(expectedSchooling.value);
    var gni = parseFloat(gniPerCapita.value);

    // Update displayed values.
    lifeSpan.textContent = life.toFixed(1);
    schoolSpan.textContent = school.toFixed(1);
    expectedSpan.textContent = expected.toFixed(1);
    gniSpan.textContent = gni.toLocaleString();

    // Predict the HDI score and determine its category.
    var hdi = predictHDI(life, school, expected, gni);
    var category = getCategory(hdi);

    // Update result section.
    hdiScore.textContent = hdi.toFixed(3);
    hdiCategory.textContent = category.label;
    hdiCategory.className = 'hdi-category ' + category.class;
    hdiDescription.innerHTML = '<i class="fas fa-info-circle"></i> ' + category.desc;

    // Update comparison tiles.
    compLife.textContent = life.toFixed(1);
    compSchool.textContent = school.toFixed(1);
    compExpected.textContent = expected.toFixed(1);
    compGNI.textContent = (gni / 1000).toFixed(1) + 'k';

    // Update chart.
    updateChart(life, school, expected, gni);
}

// ---------- Event Listeners ----------
lifeExpectancy.addEventListener('input', updateHDI);
meanSchooling.addEventListener('input', updateHDI);
expectedSchooling.addEventListener('input', updateHDI);
gniPerCapita.addEventListener('input', updateHDI);

predictBtn.addEventListener('click', function() {
    updateHDI();

    // Add a subtle animation effect when the user predicts again.
    hdiScore.style.animation = 'none';
    setTimeout(function() {
        hdiScore.style.animation = 'scorePulse 2s ease-in-out infinite';
    }, 10);
});

// ---------- Scenario Buttons ----------
var scenarios = {
    'very-high': { life: 82, school: 13.5, expected: 18.5, gni: 50000 },
    'high': { life: 76, school: 11.5, expected: 15.5, gni: 25000 },
    'medium': { life: 68, school: 8.5, expected: 12.5, gni: 8000 },
    'low': { life: 58, school: 4.5, expected: 7.5, gni: 1500 }
};

var scenarioBtns = document.querySelectorAll('.scenario-btn');
scenarioBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
        var scenario = this.dataset.scenario;
        var values = scenarios[scenario];
        if (!values) return;

        lifeExpectancy.value = values.life;
        meanSchooling.value = values.school;
        expectedSchooling.value = values.expected;
        gniPerCapita.value = values.gni;

        updateHDI();

        // Highlight the active scenario button.
        scenarioBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// ---------- Theme Toggle ----------
var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function() {
    var html = document.documentElement;
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    this.innerHTML = next === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';

    // Update chart colors when the theme changes.
    if (hdiChart) {
        hdiChart.options.scales.y.ticks.color = getComputedStyle(document.documentElement).getPropertyValue('--text2').trim() || '#4a4a6a';
        hdiChart.options.scales.x.ticks.color = getComputedStyle(document.documentElement).getPropertyValue('--text2').trim() || '#4a4a6a';
        hdiChart.update();
    }
});

// ---------- Initialization ----------
window.addEventListener('load', function() {
    initChart();
    updateHDI();

    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Highlight the default scenario.
    document.querySelector('.scenario-btn[data-scenario="very-high"]').classList.add('active');
});
