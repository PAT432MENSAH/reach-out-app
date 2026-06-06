// Dashboard functionality
requireAuth();

const courses = ['clarity', 'confidence', 'criticalThinking', 'aiCoach'];

function initDashboard() {
    const user = getCurrentUser();
    document.getElementById('userName').textContent = user.name.split(' ')[0];

    // Load and display progress
    updateProgressMetrics();
    updateActivityFeed();
    renderProgressChart();
    
    // Initialize auth UI for dashboard
    initAuthUI();
}

function updateProgressMetrics() {
    let progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    let totalProgress = 0;
    let completedCount = 0;

    courses.forEach(course => {
        const courseProgress = progress[course] || 0;
        totalProgress += courseProgress;

        if (courseProgress === 100) completedCount++;

        document.getElementById(course + 'Progress').style.width = courseProgress + '%';
        document.getElementById(course + 'Text').textContent = courseProgress + '%';
    });

    document.getElementById('completedCourses').textContent = completedCount;
    document.getElementById('totalProgress').textContent = Math.round(totalProgress / courses.length) + '%';

    // Calculate streak and time
    const lastActivity = localStorage.getItem('lastActivityDate');
    const today = new Date().toDateString();
    let streak = parseInt(localStorage.getItem('learningStreak') || '0');

    if (lastActivity && lastActivity !== today) {
        const lastDate = new Date(lastActivity);
        const currentDate = new Date();
        const dayDiff = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

        if (dayDiff === 1) {
            streak++;
        } else if (dayDiff > 1) {
            streak = 0;
        }
    } else if (!lastActivity) {
        streak = 1;
    }

    localStorage.setItem('learningStreak', streak);
    localStorage.setItem('lastActivityDate', today);
    document.getElementById('learningStreak').textContent = streak;

    const totalTime = parseInt(localStorage.getItem('totalLearningTime') || '0');
    document.getElementById('totalTime').textContent = Math.floor(totalTime / 60) + 'h';
}

function updateActivityFeed() {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const feed = document.getElementById('activityFeed');

    if (activities.length === 0) {
        feed.innerHTML = '<p style="color: var(--muted);">No activity yet. Start learning now!</p>';
        return;
    }

    feed.innerHTML = activities.slice(-5).reverse().map(activity => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-details">
                <p class="activity-text">${activity.text}</p>
                <p class="activity-time">${activity.timestamp}</p>
            </div>
        </div>
    `).join('');
}

function recordActivity(courseName, action) {
    const activities = JSON.parse(localStorage.getItem('activities') || '[]');
    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    activities.push({
        course: courseName,
        text: `${action} in ${courseName}`,
        timestamp: timestamp,
        icon: '✓',
        date: now.toDateString()
    });

    localStorage.setItem('activities', JSON.stringify(activities));

    // Update learning time
    const currentTime = parseInt(localStorage.getItem('totalLearningTime') || '0');
    localStorage.setItem('totalLearningTime', currentTime + 5);
}

function updateCourseProgress(courseName, progressPercentage) {
    let progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    progress[courseName] = progressPercentage;
    localStorage.setItem('courseProgress', JSON.stringify(progress));

    recordActivity(courseName, 'Completed lesson');
    updateProgressMetrics();
    updateActivityFeed();
    renderProgressChart();
}

// Render interactive progress chart
function renderProgressChart() {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const chartContainer = document.getElementById('progressChart');
    
    if (!chartContainer) return;

    const courseNames = ['Clarity', 'Confidence', 'Critical Thinking', 'AI Coach'];
    const courseKeys = ['clarity', 'confidence', 'criticalThinking', 'aiCoach'];
    const colors = ['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b'];
    
    const maxWidth = 400;
    let chartHTML = '<div class="chart-bars">';
    
    courseKeys.forEach((key, index) => {
        const percentage = progress[key] || 0;
        const barWidth = (percentage / 100) * maxWidth;
        const color = colors[index];
        
        chartHTML += `
            <div class="chart-bar-item">
                <div class="chart-label">${courseNames[index]}</div>
                <div class="chart-bar-wrapper">
                    <div class="chart-bar" style="background: linear-gradient(90deg, ${color}, ${adjustColor(color, 20)}); width: ${barWidth}px;" 
                         title="${percentage}% complete"></div>
                </div>
                <div class="chart-percentage">${percentage}%</div>
            </div>
        `;
    });
    
    chartHTML += '</div>';
    chartContainer.innerHTML = chartHTML;
    
    // Add click handler to bars for interactivity
    const bars = chartContainer.querySelectorAll('.chart-bar-item');
    bars.forEach((bar, index) => {
        bar.addEventListener('click', () => {
            const course = courseKeys[index];
            const coursePage = course === 'criticalThinking' ? 'critical-thinking.html' : `${course}.html`;
            window.location.href = coursePage;
        });
    });
}

// Helper to adjust color brightness
function adjustColor(color, percent) {
    let num = parseInt(color.replace('#',''), 16);
    let amt = Math.round(2.55 * percent);
    let R = Math.min(255, (num >> 16) + amt);
    let G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    let B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
    (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
    .toString(16).slice(1);
}

document.addEventListener('DOMContentLoaded', initDashboard);
