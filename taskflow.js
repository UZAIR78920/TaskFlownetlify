// TaskFlow - Project Management Platform JavaScript
// Author: Custom Implementation
// Description: Complete functionality for TaskFlow with theme/mode switching, drag-drop, and data management

// ===================================
// STATE MANAGEMENT
// ===================================
const AppState = {
    currentView: 'dashboard',
    currentTheme: localStorage.getItem('taskflow-theme') || 'light',
    currentMode: localStorage.getItem('taskflow-mode') || 'professional',
    currentProject: null,
    currentTask: null,
    onboardingCompleted: localStorage.getItem('taskflow-onboarding') === 'true',
    
    projects: [
        {
            id: 1,
            name: 'Website Redesign',
            description: 'Modernize company website with new branding',
            color: '#1976D2',
            status: 'active',
            progress: 65,
            teamMembers: ['JD', 'SM', 'AK', 'LM'],
            tasks: 32,
            completed: 20,
            dueDate: '2025-02-15'
        },
        {
            id: 2,
            name: 'Mobile App v2.0',
            description: 'Build next generation mobile application',
            color: '#388E3C',
            status: 'active',
            progress: 45,
            teamMembers: ['SM', 'RJ', 'NK'],
            tasks: 28,
            completed: 12,
            dueDate: '2025-03-01'
        },
        {
            id: 3,
            name: 'Backend API Refactor',
            description: 'Optimize and modernize backend services',
            color: '#F57C00',
            status: 'planning',
            progress: 20,
            teamMembers: ['AK', 'DK'],
            tasks: 18,
            completed: 3,
            dueDate: '2025-02-28'
        },
        {
            id: 4,
            name: 'Marketing Campaign',
            description: 'Q1 marketing and outreach campaign',
            color: '#C2185B',
            status: 'active',
            progress: 80,
            teamMembers: ['LM', 'PK', 'VR'],
            tasks: 15,
            completed: 12,
            dueDate: '2025-01-31'
        },
        {
            id: 5,
            name: 'Data Analytics Dashboard',
            description: 'Real-time analytics and reporting system',
            color: '#7B1FA2',
            status: 'active',
            progress: 55,
            teamMembers: ['NK', 'AK', 'RJ'],
            tasks: 24,
            completed: 13,
            dueDate: '2025-02-20'
        }
    ],
    
    tasks: [
        { id: 1, title: 'Design homepage mockups', projectId: 1, status: 'done', priority: 'high', assignee: 'JD', dueDate: '2025-01-20', labels: ['design', 'ui'] },
        { id: 2, title: 'Implement responsive navigation', projectId: 1, status: 'inprogress', priority: 'high', assignee: 'SM', dueDate: '2025-01-22', labels: ['frontend', 'ui'] },
        { id: 3, title: 'Set up user authentication', projectId: 2, status: 'inprogress', priority: 'high', assignee: 'AK', dueDate: '2025-01-23', labels: ['backend', 'security'] },
        { id: 4, title: 'Create API documentation', projectId: 3, status: 'todo', priority: 'medium', assignee: 'DK', dueDate: '2025-01-25', labels: ['documentation'] },
        { id: 5, title: 'Write unit tests', projectId: 2, status: 'testing', priority: 'medium', assignee: 'RJ', dueDate: '2025-01-24', labels: ['testing'] },
        { id: 6, title: 'Optimize database queries', projectId: 3, status: 'backlog', priority: 'low', assignee: 'AK', dueDate: '2025-01-30', labels: ['backend', 'performance'] },
        { id: 7, title: 'Design email templates', projectId: 4, status: 'done', priority: 'medium', assignee: 'LM', dueDate: '2025-01-18', labels: ['design', 'marketing'] },
        { id: 8, title: 'Implement dark mode', projectId: 1, status: 'todo', priority: 'low', assignee: 'SM', dueDate: '2025-01-28', labels: ['frontend', 'ui'] },
        { id: 9, title: 'Build analytics charts', projectId: 5, status: 'inprogress', priority: 'high', assignee: 'NK', dueDate: '2025-01-26', labels: ['frontend', 'charts'] },
        { id: 10, title: 'Set up CI/CD pipeline', projectId: 3, status: 'todo', priority: 'high', assignee: 'DK', dueDate: '2025-01-27', labels: ['devops'] },
        { id: 11, title: 'Conduct user testing', projectId: 1, status: 'testing', priority: 'medium', assignee: 'LM', dueDate: '2025-01-29', labels: ['testing', 'ux'] },
        { id: 12, title: 'Fix mobile responsiveness', projectId: 2, status: 'backlog', priority: 'high', assignee: 'SM', dueDate: '2025-02-01', labels: ['frontend', 'bug'] }
    ],
    
    teamMembers: [
        { id: 'JD', name: 'John Doe', email: 'john.doe@taskflow.com', role: 'admin', tasksAssigned: 8, tasksCompleted: 5, workload: 85 },
        { id: 'SM', name: 'Sarah Miller', email: 'sarah.m@taskflow.com', role: 'lead', tasksAssigned: 10, tasksCompleted: 7, workload: 90 },
        { id: 'AK', name: 'Alex Kumar', email: 'alex.k@taskflow.com', role: 'developer', tasksAssigned: 7, tasksCompleted: 4, workload: 70 },
        { id: 'LM', name: 'Lisa Martinez', email: 'lisa.m@taskflow.com', role: 'designer', tasksAssigned: 6, tasksCompleted: 5, workload: 65 },
        { id: 'RJ', name: 'Raj Johnson', email: 'raj.j@taskflow.com', role: 'developer', tasksAssigned: 5, tasksCompleted: 3, workload: 55 },
        { id: 'NK', name: 'Nina Kim', email: 'nina.k@taskflow.com', role: 'developer', tasksAssigned: 8, tasksCompleted: 6, workload: 80 },
        { id: 'DK', name: 'David Chen', email: 'david.c@taskflow.com', role: 'lead', tasksAssigned: 9, tasksCompleted: 6, workload: 88 },
        { id: 'PK', name: 'Priya Patel', email: 'priya.p@taskflow.com', role: 'designer', tasksAssigned: 4, tasksCompleted: 3, workload: 50 },
        { id: 'VR', name: 'Victor Rodriguez', email: 'victor.r@taskflow.com', role: 'developer', tasksAssigned: 6, tasksCompleted: 4, workload: 68 }
    ],
    
    notifications: [
        { id: 1, type: 'task', title: 'New task assigned', message: 'Sarah assigned you "Implement responsive navigation"', time: '2 min ago', read: false, icon: '📋', color: '#E3F2FD' },
        { id: 2, type: 'comment', title: 'New comment', message: 'Alex commented on "Set up user authentication"', time: '15 min ago', read: false, icon: '💬', color: '#E8F5E9' },
        { id: 3, type: 'due', title: 'Task due soon', message: '"Create API documentation" is due in 2 days', time: '1 hour ago', read: false, icon: '⏰', color: '#FFF3E0' },
        { id: 4, type: 'complete', title: 'Task completed', message: 'Lisa marked "Design email templates" as done', time: '3 hours ago', read: true, icon: '✅', color: '#E8F5E9' },
        { id: 5, type: 'mention', title: 'You were mentioned', message: 'John mentioned you in project chat', time: '5 hours ago', read: true, icon: '@', color: '#FCE4EC' }
    ],
    
    activities: [
        { id: 1, type: 'task', user: 'Sarah Miller', action: 'completed task "Design homepage mockups"', time: '2 hours ago', icon: '✅', color: '#E8F5E9' },
        { id: 2, type: 'comment', user: 'Alex Kumar', action: 'commented on "Set up user authentication"', time: '4 hours ago', icon: '💬', color: '#E3F2FD' },
        { id: 3, type: 'project', user: 'John Doe', action: 'created new project "Data Analytics Dashboard"', time: '6 hours ago', icon: '📁', color: '#F3E5F5' },
        { id: 4, type: 'sprint', user: 'David Chen', action: 'started Sprint 3 - Q1 Goals', time: '8 hours ago', icon: '🏃', color: '#FFF3E0' },
        { id: 5, type: 'member', user: 'System', action: 'Victor Rodriguez joined the team', time: '1 day ago', icon: '👤', color: '#FCE4EC' }
    ],
    
    chatMessages: [
        { id: 1, author: 'Sarah Miller', avatar: 'SM', message: 'Hey team! Just pushed the latest navigation updates. Please review when you get a chance.', time: '10:30 AM' },
        { id: 2, author: 'Alex Kumar', avatar: 'AK', message: 'Looks great! I tested it on mobile and it works perfectly. 👍', time: '10:35 AM' },
        { id: 3, author: 'John Doe', avatar: 'JD', message: 'Nice work! Can we add a search feature to the navigation as well?', time: '10:42 AM' },
        { id: 4, author: 'Sarah Miller', avatar: 'SM', message: 'Sure, I can add that to the next sprint. Creating a task for it now.', time: '10:45 AM' },
        { id: 5, author: 'Lisa Martinez', avatar: 'LM', message: 'I have some design mockups for the search UI. I\'ll share them in the files section.', time: '10:50 AM' }
    ],
    
    files: [
        { id: 1, name: 'Homepage_Mockup_Final.fig', type: 'figma', size: '2.4 MB', uploadedBy: 'Lisa Martinez', uploadDate: '2025-01-18', icon: '🎨', color: '#E3F2FD' },
        { id: 2, name: 'API_Documentation_v2.pdf', type: 'pdf', size: '1.8 MB', uploadedBy: 'David Chen', uploadDate: '2025-01-19', icon: '📄', color: '#FCE4EC' },
        { id: 3, name: 'User_Flow_Diagram.png', type: 'image', size: '856 KB', uploadedBy: 'Lisa Martinez', uploadDate: '2025-01-17', icon: '🖼️', color: '#E8F5E9' },
        { id: 4, name: 'Sprint_Planning_Notes.docx', type: 'document', size: '124 KB', uploadedBy: 'John Doe', uploadDate: '2025-01-16', icon: '📝', color: '#FFF3E0' },
        { id: 5, name: 'Database_Schema.sql', type: 'code', size: '45 KB', uploadedBy: 'Alex Kumar', uploadDate: '2025-01-20', icon: '💾', color: '#F3E5F5' }
    ],
    
    sprints: [
        { id: 1, name: 'Sprint 3 - Q1 Goals', startDate: '2025-01-15', endDate: '2025-01-29', status: 'active', progress: 65, tasksTotal: 20, tasksCompleted: 13 },
        { id: 2, name: 'Sprint 2 - Foundation', startDate: '2025-01-01', endDate: '2025-01-14', status: 'completed', progress: 100, tasksTotal: 18, tasksCompleted: 18 }
    ]
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Apply saved theme and mode
    applyTheme(AppState.currentTheme);
    applyMode(AppState.currentMode);
    
    // Show onboarding if first time
    if (!AppState.onboardingCompleted) {
        showOnboarding();
    }
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Render initial view
    renderDashboard();
    renderNotifications();
    
    // Set current project
    AppState.currentProject = AppState.projects[0];
}

// ===================================
// EVENT LISTENERS
// ===================================
function initializeEventListeners() {
    // Onboarding
    document.querySelector('.close-onboarding')?.addEventListener('click', closeOnboarding);
    document.querySelector('.next-step')?.addEventListener('click', nextOnboardingStep);
    document.querySelector('.prev-step')?.addEventListener('click', prevOnboardingStep);
    document.querySelector('.finish-onboarding')?.addEventListener('click', finishOnboarding);
    
    // Theme toggle
    document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
    
    // Mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });
    
    // Navigation
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(item.dataset.view);
        });
    });
    
    // Sidebar toggle
    document.querySelector('.menu-toggle')?.addEventListener('click', toggleSidebar);
    
    // Notifications
    document.querySelector('.notifications-btn')?.addEventListener('click', toggleNotifications);
    document.querySelector('.mark-all-read')?.addEventListener('click', markAllNotificationsRead);
    
    // User menu
    document.querySelector('.user-avatar')?.addEventListener('click', toggleUserMenu);
    
    // Project tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchProjectTab(btn.dataset.tab));
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.notifications-container')) {
            document.querySelector('.notifications-dropdown')?.classList.add('hidden');
        }
        if (!e.target.closest('.user-menu-container')) {
            document.querySelector('.user-dropdown')?.classList.add('hidden');
        }
    });
    
    // Task detail modal
    document.querySelector('.close-task-detail')?.addEventListener('click', closeTaskDetail);
    
    // Upgrade modal
    document.querySelector('.btn-upgrade')?.addEventListener('click', showUpgradeModal);
    document.querySelector('[data-testid="upgrade-btn"]')?.addEventListener('click', showUpgradeModal);
    document.querySelector('[data-testid="close-upgrade-modal-btn"]')?.addEventListener('click', closeUpgradeModal);
    
    // Chat input
    document.querySelector('.chat-send-btn')?.addEventListener('click', sendChatMessage);
    document.querySelector('.chat-input')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });
    
    // Task comment input
    document.querySelector('[data-testid="task-comment-send-btn"]')?.addEventListener('click', sendTaskComment);
    document.querySelector('[data-testid="task-comment-input"]')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendTaskComment();
    });
}

// ===================================
// ONBOARDING
// ===================================
let currentOnboardingStep = 1;

function showOnboarding() {
    document.getElementById('onboarding-overlay')?.classList.remove('hidden');
}

function closeOnboarding() {
    document.getElementById('onboarding-overlay')?.classList.add('hidden');
    localStorage.setItem('taskflow-onboarding', 'true');
    AppState.onboardingCompleted = true;
}

function nextOnboardingStep() {
    if (currentOnboardingStep < 3) {
        currentOnboardingStep++;
        updateOnboardingStep();
    }
}

function prevOnboardingStep() {
    if (currentOnboardingStep > 1) {
        currentOnboardingStep--;
        updateOnboardingStep();
    }
}

function updateOnboardingStep() {
    document.querySelectorAll('.onboarding-step').forEach((step, index) => {
        step.classList.toggle('active', index + 1 === currentOnboardingStep);
    });
    
    document.querySelectorAll('.step-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index + 1 === currentOnboardingStep);
    });
    
    document.querySelector('.prev-step').style.display = currentOnboardingStep === 1 ? 'none' : 'flex';
    document.querySelector('.next-step').style.display = currentOnboardingStep === 3 ? 'none' : 'flex';
    document.querySelector('.finish-onboarding').style.display = currentOnboardingStep === 3 ? 'flex' : 'none';
}

function finishOnboarding() {
    closeOnboarding();
}

// ===================================
// THEME MANAGEMENT
// ===================================
function toggleTheme() {
    const newTheme = AppState.currentTheme === 'light' ? 'dark' : 'light';
    AppState.currentTheme = newTheme;
    applyTheme(newTheme);
    localStorage.setItem('taskflow-theme', newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (theme === 'dark') {
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    } else {
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    }
}

// ===================================
// MODE MANAGEMENT
// ===================================
function switchMode(mode) {
    AppState.currentMode = mode;
    applyMode(mode);
    localStorage.setItem('taskflow-mode', mode);
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
}

function applyMode(mode) {
    document.body.setAttribute('data-mode', mode);
    
    // In beginner mode, show tooltips and explanations
    // In professional mode, hide them
    if (mode === 'beginner') {
        document.body.classList.add('beginner-mode');
        document.body.classList.remove('professional-mode');
    } else {
        document.body.classList.add('professional-mode');
        document.body.classList.remove('beginner-mode');
    }
}

// ===================================
// VIEW SWITCHING
// ===================================
function switchView(viewName) {
    AppState.currentView = viewName;
    
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.view === viewName);
    });
    
    // Update views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    
    // Render appropriate view
    switch(viewName) {
        case 'dashboard':
            document.getElementById('dashboard-view')?.classList.add('active');
            renderDashboard();
            break;
        case 'projects':
            document.getElementById('project-view')?.classList.add('active');
            renderProjectView();
            break;
        case 'team':
            document.getElementById('team-view')?.classList.add('active');
            renderTeamView();
            break;
        case 'sprints':
            document.getElementById('project-view')?.classList.add('active');
            renderProjectView();
            switchProjectTab('sprint');
            break;
        case 'analytics':
            document.getElementById('project-view')?.classList.add('active');
            renderProjectView();
            switchProjectTab('analytics');
            break;
        default:
            document.getElementById('dashboard-view')?.classList.add('active');
            renderDashboard();
    }
}

// ===================================
// SIDEBAR
// ===================================
function toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('open');
}

// ===================================
// NOTIFICATIONS
// ===================================
function toggleNotifications() {
    document.querySelector('.notifications-dropdown')?.classList.toggle('hidden');
}

function renderNotifications() {
    const container = document.querySelector('.notifications-list');
    if (!container) return;
    
    const unreadCount = AppState.notifications.filter(n => !n.read).length;
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
    
    container.innerHTML = AppState.notifications.map(notif => `
        <div class="notification-item ${notif.read ? '' : 'unread'}" data-notification-id="${notif.id}">
            <div class="notification-icon" style="background: ${notif.color};">
                ${notif.icon}
            </div>
            <div class="notification-content">
                <div class="notification-title">${notif.title}</div>
                <div class="notification-message">${notif.message}</div>
                <div class="notification-time">${notif.time}</div>
            </div>
        </div>
    `).join('');
}

function markAllNotificationsRead() {
    AppState.notifications.forEach(n => n.read = true);
    renderNotifications();
}

// ===================================
// USER MENU
// ===================================
function toggleUserMenu() {
    document.querySelector('.user-dropdown')?.classList.toggle('hidden');
}

// ===================================
// DASHBOARD VIEW
// ===================================
function renderDashboard() {
    renderProjectsList();
    renderMyTasksList();
    renderActivityTimeline();
    renderSprintsList();
}

function renderProjectsList() {
    const container = document.getElementById('projects-list');
    if (!container) return;
    
    container.innerHTML = AppState.projects.slice(0, 3).map(project => `
        <div class="project-item" data-project-id="${project.id}">
            <div class="project-item-header">
                <div class="project-item-color" style="background: ${project.color};"></div>
                <div class="project-item-name">${project.name}</div>
                <span class="project-item-status status-${project.status}">${project.status}</span>
            </div>
            <div class="project-item-progress">
                <div class="progress-label">
                    <span>Progress</span>
                    <span>${project.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${project.progress}%; background: ${project.color};"></div>
                </div>
            </div>
            <div class="project-item-meta">
                <div class="project-team-avatars">
                    ${project.teamMembers.map(member => `
                        <div class="team-avatar" style="background: ${project.color};">${member}</div>
                    `).join('')}
                </div>
                <span>${project.completed}/${project.tasks} tasks</span>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.project-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = parseInt(item.dataset.projectId);
            AppState.currentProject = AppState.projects.find(p => p.id === projectId);
            switchView('projects');
        });
    });
}

function renderMyTasksList() {
    const container = document.getElementById('my-tasks-list');
    if (!container) return;
    
    const myTasks = AppState.tasks.filter(task => task.assignee === 'JD').slice(0, 5);
    
    container.innerHTML = myTasks.map(task => `
        <div class="task-item" data-task-id="${task.id}">
            <div class="task-checkbox ${task.status === 'done' ? 'checked' : ''}"></div>
            <div class="task-item-content">
                <div class="task-item-title">${task.title}</div>
                <div class="task-item-meta">
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    <span>Due: ${task.dueDate}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers
    container.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', () => {
            const taskId = parseInt(item.dataset.taskId);
            showTaskDetail(taskId);
        });
    });
}

function renderActivityTimeline() {
    const container = document.getElementById('activity-timeline');
    if (!container) return;
    
    container.innerHTML = AppState.activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon" style="background: ${activity.color};">
                ${activity.icon}
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.user}</div>
                <div class="activity-description">${activity.action}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
}

function renderSprintsList() {
    const container = document.getElementById('sprints-list');
    if (!container) return;
    
    container.innerHTML = AppState.sprints.map(sprint => `
        <div class="sprint-item">
            <div class="sprint-item-header">
                <div class="sprint-name">${sprint.name}</div>
                <span class="project-item-status status-${sprint.status}">${sprint.status}</span>
            </div>
            <div class="sprint-dates">${sprint.startDate} - ${sprint.endDate}</div>
            <div class="project-item-progress">
                <div class="progress-label">
                    <span>Completion</span>
                    <span>${sprint.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${sprint.progress}%; background: linear-gradient(90deg, #1976D2, #42A5F5);"></div>
                </div>
            </div>
        </div>
    `).join('');
}

// ===================================
// PROJECT VIEW
// ===================================
function renderProjectView() {
    if (!AppState.currentProject) {
        AppState.currentProject = AppState.projects[0];
    }
    
    const project = AppState.currentProject;
    
    // Update header
    document.getElementById('current-project-name').textContent = project.name;
    document.getElementById('current-project-description').textContent = project.description;
    document.getElementById('current-project-color').style.background = project.color;
    
    // Render active tab
    const activeTab = document.querySelector('.tab-btn.active')?.dataset.tab || 'kanban';
    renderProjectTab(activeTab);
}

function switchProjectTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.dataset.tabContent === tabName);
    });
    
    // Render tab content
    renderProjectTab(tabName);
}

function renderProjectTab(tabName) {
    switch(tabName) {
        case 'kanban':
            renderKanbanBoard();
            break;
        case 'sprint':
            renderSprintTab();
            break;
        case 'team':
            renderProjectTeam();
            break;
        case 'files':
            renderProjectFiles();
            break;
        case 'chat':
            renderProjectChat();
            break;
        case 'timeline':
            renderProjectTimeline();
            break;
        case 'analytics':
            renderProjectAnalytics();
            break;
    }
}

// ===================================
// KANBAN BOARD
// ===================================
function renderKanbanBoard() {
    const container = document.getElementById('kanban-board');
    if (!container) return;
    
    const columns = [
        { id: 'backlog', title: 'Backlog', color: '#9E9E9E' },
        { id: 'todo', title: 'To Do', color: '#2196F3' },
        { id: 'inprogress', title: 'In Progress', color: '#FF9800' },
        { id: 'testing', title: 'Testing', color: '#9C27B0' },
        { id: 'done', title: 'Done', color: '#4CAF50' }
    ];
    
    const projectTasks = AppState.tasks.filter(task => task.projectId === AppState.currentProject.id);
    
    container.innerHTML = columns.map(column => {
        const columnTasks = projectTasks.filter(task => task.status === column.id);
        
        return `
            <div class="kanban-column" data-column="${column.id}">
                <div class="kanban-column-header">
                    <div class="kanban-column-title">
                        <div style="width: 12px; height: 12px; border-radius: 50%; background: ${column.color};"></div>
                        ${column.title}
                        <span class="kanban-column-count">${columnTasks.length}</span>
                    </div>
                    <button class="kanban-add-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
                <div class="kanban-cards" data-column-cards="${column.id}">
                    ${columnTasks.map(task => renderKanbanCard(task)).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    // Initialize drag and drop
    initializeDragAndDrop();
}

function renderKanbanCard(task) {
    const priorityColors = {
        high: '#FCE4EC',
        medium: '#FFF3E0',
        low: '#E3F2FD'
    };
    
    return `
        <div class="kanban-card" draggable="true" data-task-id="${task.id}">
            <div class="kanban-card-title">${task.title}</div>
            <div class="kanban-card-labels">
                ${task.labels.map(label => `
                    <span class="kanban-label" style="background: ${priorityColors[task.priority]}; color: var(--text-primary);">${label}</span>
                `).join('')}
            </div>
            <div class="kanban-card-footer">
                <div class="kanban-card-assignee">${task.assignee}</div>
                <div class="kanban-card-meta">
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    <span>📅 ${task.dueDate.split('-')[2]}</span>
                </div>
            </div>
        </div>
    `;
}

// ===================================
// DRAG AND DROP
// ===================================
function initializeDragAndDrop() {
    const cards = document.querySelectorAll('.kanban-card');
    const columns = document.querySelectorAll('.kanban-cards');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', handleDragStart);
        card.addEventListener('dragend', handleDragEnd);
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
                showTaskDetail(parseInt(card.dataset.taskId));
            }
        });
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedElement = null;
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    if (e.target.classList.contains('kanban-cards')) {
        e.target.style.background = 'rgba(25, 118, 210, 0.05)';
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('kanban-cards')) {
        e.target.style.background = '';
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const column = e.target.closest('.kanban-cards');
    if (column && draggedElement) {
        column.style.background = '';
        
        // Update task status
        const taskId = parseInt(draggedElement.dataset.taskId);
        const newStatus = column.dataset.columnCards;
        const task = AppState.tasks.find(t => t.id === taskId);
        if (task) {
            task.status = newStatus;
        }
        
        // Re-render board
        renderKanbanBoard();
    }
}

// ===================================
// SPRINT TAB
// ===================================
function renderSprintTab() {
    const container = document.getElementById('sprint-tasks-list');
    if (!container) return;
    
    const sprintTasks = AppState.tasks.filter(task => task.projectId === AppState.currentProject.id);
    
    container.innerHTML = sprintTasks.map(task => `
        <div class="task-item" data-task-id="${task.id}">
            <div class="task-checkbox ${task.status === 'done' ? 'checked' : ''}"></div>
            <div class="task-item-content">
                <div class="task-item-title">${task.title}</div>
                <div class="task-item-meta">
                    <span class="task-priority priority-${task.priority}">${task.priority}</span>
                    <span>Status: ${task.status}</span>
                    <span>Due: ${task.dueDate}</span>
                    <span>Assigned to: ${task.assignee}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    container.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', () => {
            showTaskDetail(parseInt(item.dataset.taskId));
        });
    });
}

// ===================================
// TEAM TAB
// ===================================
function renderProjectTeam() {
    const container = document.getElementById('team-grid');
    if (!container) return;
    
    const projectMembers = AppState.teamMembers.slice(0, 6);
    
    container.innerHTML = projectMembers.map(member => `
        <div class="team-member-card">
            <div class="team-member-avatar">${member.id}</div>
            <div class="team-member-name">${member.name}</div>
            <div class="team-member-role">${member.role}</div>
            <div class="team-member-stats">
                <div class="member-stat">
                    <div class="member-stat-value">${member.tasksAssigned}</div>
                    <div class="member-stat-label">Assigned</div>
                </div>
                <div class="member-stat">
                    <div class="member-stat-value">${member.tasksCompleted}</div>
                    <div class="member-stat-label">Completed</div>
                </div>
            </div>
            <div class="team-member-progress">
                <div class="team-member-progress-label">
                    <span>Workload</span>
                    <span>${member.workload}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${member.workload}%; background: ${getWorkloadColor(member.workload)};"></div>
                </div>
            </div>
        </div>
    `).join('');
}

function getWorkloadColor(workload) {
    if (workload >= 80) return '#F44336';
    if (workload >= 60) return '#FF9800';
    return '#4CAF50';
}

// ===================================
// FILES TAB
// ===================================
function renderProjectFiles() {
    const container = document.getElementById('files-list');
    if (!container) return;
    
    container.innerHTML = AppState.files.map(file => `
        <div class="file-item">
            <div class="file-icon" style="background: ${file.color};">
                ${file.icon}
            </div>
            <div class="file-info">
                <div class="file-name">${file.name}</div>
                <div class="file-meta">${file.size} • Uploaded by ${file.uploadedBy} • ${file.uploadDate}</div>
            </div>
            <div class="file-actions">
                <button class="file-action-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3V11M8 11L5 8M8 11L11 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        <path d="M2 11V13C2 13.6 2.4 14 3 14H13C13.6 14 14 13.6 14 13V11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <button class="file-action-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');
}

// ===================================
// CHAT TAB
// ===================================
function renderProjectChat() {
    const container = document.getElementById('project-chat-messages');
    if (!container) return;
    
    container.innerHTML = AppState.chatMessages.map(msg => `
        <div class="chat-message">
            <div class="chat-message-avatar">${msg.avatar}</div>
            <div class="chat-message-content">
                <div class="chat-message-header">
                    <span class="chat-message-author">${msg.author}</span>
                    <span class="chat-message-time">${msg.time}</span>
                </div>
                <div class="chat-message-text">${msg.message}</div>
            </div>
        </div>
    `).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function sendChatMessage() {
    const input = document.querySelector('.chat-input');
    if (!input || !input.value.trim()) return;
    
    const newMessage = {
        id: AppState.chatMessages.length + 1,
        author: 'John Doe',
        avatar: 'JD',
        message: input.value,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    AppState.chatMessages.push(newMessage);
    input.value = '';
    renderProjectChat();
}

// ===================================
// TIMELINE TAB
// ===================================
function renderProjectTimeline() {
    const container = document.getElementById('project-timeline');
    if (!container) return;
    
    const timelineEvents = [
        { date: 'Jan 20, 2025', title: 'Sprint 3 Started', description: 'Team kicked off Sprint 3 with planning session' },
        { date: 'Jan 18, 2025', title: 'Design Review Completed', description: 'Homepage mockups approved by stakeholders' },
        { date: 'Jan 15, 2025', title: 'Project Milestone', description: 'Reached 50% completion mark' },
        { date: 'Jan 10, 2025', title: 'New Team Member', description: 'Victor Rodriguez joined the team' },
        { date: 'Jan 5, 2025', title: 'Project Created', description: 'Website Redesign project initialized' }
    ];
    
    container.innerHTML = timelineEvents.map(event => `
        <div class="timeline-event">
            <div class="timeline-event-date">${event.date}</div>
            <div class="timeline-event-title">${event.title}</div>
            <div class="timeline-event-description">${event.description}</div>
        </div>
    `).join('');
}

// ===================================
// ANALYTICS TAB
// ===================================
function renderProjectAnalytics() {
    // Render placeholder charts
    renderPlaceholderCharts();
}

function renderPlaceholderCharts() {
    const chartIds = ['velocity-chart', 'burndown-chart', 'task-distribution-chart', 'git-activity-chart'];
    
    chartIds.forEach(id => {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = 250;
        
        // Draw placeholder visualization
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-tertiary');
        ctx.font = '14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Chart Placeholder', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText('Data visualization would appear here', canvas.width / 2, canvas.height / 2 + 10);
        
        // Draw sample chart elements
        drawSampleChart(ctx, canvas.width, canvas.height);
    });
}

function drawSampleChart(ctx, width, height) {
    const padding = 40;
    const chartHeight = height - padding * 2;
    const chartWidth = width - padding * 2;
    
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border');
    ctx.lineWidth = 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw sample bars/lines
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    const bars = 7;
    const barWidth = chartWidth / (bars * 2);
    
    for (let i = 0; i < bars; i++) {
        const x = padding + (i * chartWidth / bars) + barWidth / 2;
        const barHeight = Math.random() * chartHeight * 0.7;
        const y = height - padding - barHeight;
        
        ctx.fillRect(x, y, barWidth, barHeight);
    }
}

// ===================================
// TEAM VIEW
// ===================================
function renderTeamView() {
    renderTeamMembersTable();
    renderWorkloadChart();
}

function renderTeamMembersTable() {
    const container = document.getElementById('team-members-table');
    if (!container) return;
    
    container.innerHTML = `
        <div class="table-row header">
            <div class="table-cell">Member</div>
            <div class="table-cell">Role</div>
            <div class="table-cell">Tasks</div>
            <div class="table-cell">Workload</div>
            <div class="table-cell">Completed</div>
        </div>
        ${AppState.teamMembers.map(member => `
            <div class="table-row">
                <div class="table-cell table-cell-member">
                    <div class="table-member-avatar">${member.id}</div>
                    <div class="table-member-info">
                        <div class="table-member-name">${member.name}</div>
                        <div class="table-member-email">${member.email}</div>
                    </div>
                </div>
                <div class="table-cell">
                    <span class="role-badge role-${member.role}">${member.role}</span>
                </div>
                <div class="table-cell">${member.tasksAssigned}</div>
                <div class="table-cell workload-cell">
                    <span>${member.workload}%</span>
                    <div class="workload-bar">
                        <div class="workload-fill" style="width: ${member.workload}%; background: ${getWorkloadColor(member.workload)};"></div>
                    </div>
                </div>
                <div class="table-cell">${member.tasksCompleted}</div>
            </div>
        `).join('')}
    `;
}

function renderWorkloadChart() {
    const canvas = document.getElementById('workload-chart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 300;
    
    // Draw workload distribution chart
    const padding = 60;
    const chartHeight = canvas.height - padding * 2;
    const chartWidth = canvas.width - padding * 2;
    
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary');
    ctx.font = '12px Inter';
    
    // Draw title
    ctx.textAlign = 'left';
    ctx.fillText('Team Member Workload Distribution', padding, padding / 2);
    
    // Draw bars
    const barHeight = chartHeight / AppState.teamMembers.length;
    const maxWorkload = 100;
    
    AppState.teamMembers.forEach((member, index) => {
        const y = padding + (index * barHeight);
        const barWidth = (member.workload / maxWorkload) * chartWidth;
        
        // Draw bar
        ctx.fillStyle = getWorkloadColor(member.workload);
        ctx.fillRect(padding, y + 10, barWidth, barHeight - 20);
        
        // Draw label
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        ctx.textAlign = 'right';
        ctx.fillText(member.name, padding - 10, y + barHeight / 2 + 4);
        
        // Draw value
        ctx.textAlign = 'left';
        ctx.fillText(`${member.workload}%`, padding + barWidth + 10, y + barHeight / 2 + 4);
    });
}

// ===================================
// TASK DETAIL MODAL
// ===================================
function showTaskDetail(taskId) {
    const task = AppState.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    AppState.currentTask = task;
    
    const modal = document.getElementById('task-detail-view');
    if (!modal) return;
    
    // Populate modal
    document.getElementById('task-detail-name').textContent = task.title;
    document.getElementById('task-detail-status').textContent = task.status;
    document.getElementById('task-detail-status').className = `task-status status-${task.status}`;
    document.getElementById('task-detail-priority').textContent = task.priority;
    document.getElementById('task-detail-priority').className = `task-priority priority-${task.priority}`;
    document.getElementById('task-detail-description').textContent = 'This task involves ' + task.title.toLowerCase() + '. It requires coordination with the team and careful attention to detail.';
    
    // Subtasks
    const subtasksList = document.getElementById('task-subtasks-list');
    subtasksList.innerHTML = `
        <div class="subtask-item">
            <div class="task-checkbox checked"></div>
            <span>Research design patterns</span>
        </div>
        <div class="subtask-item">
            <div class="task-checkbox"></div>
            <span>Create initial mockup</span>
        </div>
        <div class="subtask-item">
            <div class="task-checkbox"></div>
            <span>Get stakeholder approval</span>
        </div>
    `;
    
    // Assignee
    const member = AppState.teamMembers.find(m => m.id === task.assignee);
    document.getElementById('task-detail-assignee').innerHTML = `
        <div class="team-member-avatar" style="width: 32px; height: 32px;">${task.assignee}</div>
        <div>
            <div style="font-size: 14px; font-weight: 500;">${member?.name || 'Unknown'}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${member?.role || ''}</div>
        </div>
    `;
    
    // Due date
    document.getElementById('task-detail-due-date').innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="4" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.5"/>
                <path d="M5 4V2M11 4V2M3 7H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span>${task.dueDate}</span>
        </div>
    `;
    
    // Project
    const project = AppState.projects.find(p => p.id === task.projectId);
    document.getElementById('task-detail-project').innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${project?.color};"></div>
            <span>${project?.name || 'Unknown'}</span>
        </div>
    `;
    
    // Labels
    document.getElementById('task-detail-labels').innerHTML = task.labels.map(label => `
        <span class="kanban-label" style="background: var(--info-light); color: var(--info);">${label}</span>
    `).join('');
    
    // Comments
    renderTaskComments();
    
    modal.classList.remove('hidden');
}

function closeTaskDetail() {
    document.getElementById('task-detail-view')?.classList.add('hidden');
    AppState.currentTask = null;
}

function renderTaskComments() {
    const container = document.getElementById('task-chat-messages');
    if (!container) return;
    
    const comments = [
        { author: 'Sarah Miller', text: 'This looks good! Let me know if you need any help.', time: '2 hours ago' },
        { author: 'Alex Kumar', text: 'I have some suggestions on the implementation approach.', time: '1 hour ago' }
    ];
    
    container.innerHTML = comments.map(comment => `
        <div class="task-comment">
            <div class="task-comment-author">${comment.author}</div>
            <div class="task-comment-text">${comment.text}</div>
        </div>
    `).join('');
}

function sendTaskComment() {
    const input = document.querySelector('[data-testid="task-comment-input"]');
    if (!input || !input.value.trim()) return;
    
    // Add comment logic here
    input.value = '';
}

// ===================================
// UPGRADE MODAL
// ===================================
function showUpgradeModal() {
    document.getElementById('upgrade-modal')?.classList.remove('hidden');
}

function closeUpgradeModal() {
    document.getElementById('upgrade-modal')?.classList.add('hidden');
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function getStatusColor(status) {
    const colors = {
        active: '#4CAF50',
        planning: '#2196F3',
        completed: '#9E9E9E',
        backlog: '#757575',
        todo: '#2196F3',
        inprogress: '#FF9800',
        testing: '#9C27B0',
        done: '#4CAF50'
    };
    return colors[status] || '#9E9E9E';
}

// ===================================
// SEARCH FUNCTIONALITY
// ===================================
const searchInput = document.querySelector('[data-testid="search-input"]');
if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', query);
    }, 300));
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('[data-testid="search-input"]')?.focus();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeTaskDetail();
        closeUpgradeModal();
        document.querySelector('.notifications-dropdown')?.classList.add('hidden');
        document.querySelector('.user-dropdown')?.classList.add('hidden');
    }
});

// Log initialization
console.log('%cTaskFlow Initialized', 'color: #1976D2; font-size: 16px; font-weight: bold;');
console.log('Theme:', AppState.currentTheme);
console.log('Mode:', AppState.currentMode);
console.log('Projects loaded:', AppState.projects.length);
console.log('Tasks loaded:', AppState.tasks.length);
console.log('Team members:', AppState.teamMembers.length);
