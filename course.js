// Course management
requireAuth();

function initCourse(course) {
    loadCourseProgress(course);
}

function loadCourseProgress(course) {
    const progress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
    const courseProgress = progress[course] || 0;
    const completedLessons = JSON.parse(localStorage.getItem(course + 'Lessons') || '[]');

    // Update progress bar
    const progressBar = document.getElementById(course + 'ProgressBar');
    if (progressBar) {
        progressBar.style.width = courseProgress + '%';
    }

    const progressText = document.getElementById(course + 'ProgressText');
    if (progressText) {
        progressText.textContent = courseProgress + '% Complete';
    }

    // Check completed lessons
    for (let i = 1; i <= 4; i++) {
        const lessonCheck = document.getElementById('lesson-' + i);
        if (lessonCheck) {
            if (completedLessons.includes(i)) {
                lessonCheck.textContent = '✓';
                lessonCheck.style.color = 'var(--accent)';
            }
        }
    }
}

function completeLesson(lessonNumber) {
    const course = window.courseId;
    let completedLessons = JSON.parse(localStorage.getItem(course + 'Lessons') || '[]');

    if (!completedLessons.includes(lessonNumber)) {
        completedLessons.push(lessonNumber);
        localStorage.setItem(course + 'Lessons', JSON.stringify(completedLessons));

        // Calculate new progress
        const progress = (completedLessons.length / 4) * 100;
        let courseProgress = JSON.parse(localStorage.getItem('courseProgress') || '{}');
        courseProgress[course] = Math.min(100, progress);
        localStorage.setItem('courseProgress', JSON.stringify(courseProgress));

        // Update UI
        loadCourseProgress(course);

        // Record activity
        updateCourseProgress(course, Math.min(100, progress));

        alert('Lesson ' + lessonNumber + ' completed! Great progress!');
    }
}
