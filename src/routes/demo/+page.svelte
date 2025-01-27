<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    let selectedAlterEgo = data.alterEgos[0];
    let activeTab = 'overview';
    
    // Simulated real-time updates
    onMount(() => {
        const interval = setInterval(() => {
            selectedAlterEgo.tasks_completed += 1;
            selectedAlterEgo.earnings += Math.floor(Math.random() * 10);
        }, 30000);

        return () => clearInterval(interval);
    });

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    // Add icons for different task types
    const taskIcons = {
        meeting: '🤝',
        email: '✉️',
        schedule: '📅',
        content: '✍️',
        social: '🌐',
    };

    // Add descriptions for permissions
    const permissionDescriptions = {
        email: "Send and respond to emails on your behalf",
        calendar: "Schedule and manage your calendar events",
        meetings: "Join and participate in video meetings",
        documents: "Create and edit documents",
        payments: "Process payments and transactions",
        social_media: "Post and engage on social platforms",
        blog_posting: "Write and publish blog content",
        content_editing: "Edit and review content"
    };
</script>

<svelte:head>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
</svelte:head>

<div class="demo-container">
    <nav class="sidebar">
        <h1 class="logo">AlterEgo</h1>
        
        <h2 class="section-title">Your AlterEgos</h2>
        
        <div class="alter-ego-list">
            {#each data.alterEgos as alterEgo}
                <div 
                    class="alter-ego-card glass" 
                    class:active={selectedAlterEgo.id === alterEgo.id}
                    on:click={() => selectedAlterEgo = alterEgo}
                >
                    <div class="status-indicator {alterEgo.status}"></div>
                    <h3>{alterEgo.name}</h3>
                    <span class="status {alterEgo.status}">{alterEgo.status}</span>
                </div>
            {/each}
            
            <button class="create-new glass">
                <span class="plus">+</span> Create New AlterEgo
            </button>
        </div>
    </nav>
    
    <main class="content">
        <div class="header glass">
            <div>
                <h2>{selectedAlterEgo.name}</h2>
                <div class="specialization">{selectedAlterEgo.specialization}</div>
            </div>
            <div class="confidence-pill">
                <div class="pulse"></div>
                Confidence {(selectedAlterEgo.confidence_score * 100).toFixed(1)}%
            </div>
        </div>

        <div class="tabs">
            <button 
                class="glass"
                class:active={activeTab === 'overview'}
                on:click={() => activeTab = 'overview'}
            >
                Overview
            </button>
            <button 
                class:active={activeTab === 'tasks'}
                on:click={() => activeTab = 'tasks'}
            >
                Tasks
            </button>
            <button 
                class:active={activeTab === 'permissions'}
                on:click={() => activeTab = 'permissions'}
            >
                Permissions
            </button>
            <button 
                class:active={activeTab === 'training'}
                on:click={() => activeTab = 'training'}
            >
                Training
            </button>
        </div>
        
        <div class="tab-content">
            {#if activeTab === 'overview'}
                <div class="overview">
                    <div class="metrics-grid">
                        <div class="metric glass">
                            <h3>Tasks Completed</h3>
                            <div class="value">{selectedAlterEgo.tasks_completed}</div>
                            <div class="metric-bg"></div>
                        </div>
                        <div class="metric glass">
                            <h3>Total Earnings</h3>
                            <div class="value">${selectedAlterEgo.earnings}</div>
                            <div class="metric-bg"></div>
                        </div>
                    </div>
                    
                    <div class="activity-section glass">
                        <h3 class="section-title">Recent Activity</h3>
                        <div class="activity-list">
                            {#each selectedAlterEgo.recent_tasks as task}
                                <div class="activity-item">
                                    <div class="activity-icon {task.type}"></div>
                                    <div class="activity-details">
                                        <div class="description">{task.description}</div>
                                        <div class="timestamp">{new Date(task.timestamp).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            {:else if activeTab === 'tasks'}
                <div class="tasks-grid">
                    {#each selectedAlterEgo.recent_tasks as task}
                        <div class="task-card glass">
                            <div class="task-header">
                                <span class="task-icon">{taskIcons[task.type]}</span>
                                <span class="task-status-badge {task.status}">{task.status}</span>
                            </div>
                            <div class="task-content">
                                <h4>{task.description}</h4>
                                <div class="task-meta">
                                    <span class="task-time">{formatDate(task.timestamp)}</span>
                                    {#if task.duration}
                                        <span class="task-duration">{task.duration} min</span>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    {/each}
                </div>
            {:else if activeTab === 'permissions'}
                <div class="permissions-grid">
                    {#each Object.entries(selectedAlterEgo.permissions) as [permission, enabled]}
                        <div class="permission-card glass">
                            <div class="permission-header">
                                <span class="permission-title">{permission.replace('_', ' ')}</span>
                                <label class="switch">
                                    <input type="checkbox" checked={enabled}>
                                    <span class="slider"></span>
                                </label>
                            </div>
                            <p class="permission-description">{permissionDescriptions[permission]}</p>
                        </div>
                    {/each}
                </div>
            {:else if activeTab === 'training'}
                <div class="training-stats">
                    {#each Object.entries(selectedAlterEgo.training_data) as [metric, value]}
                        <div class="training-card glass">
                            <div class="training-metric">{metric.replace('_', ' ')}</div>
                            <div class="training-value">
                                {value}
                                <span class="training-trend">+{Math.floor(Math.random() * 5)}%</span>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </main>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family: 'Space Grotesk', system-ui, sans-serif;
        background: linear-gradient(130deg, #f8fafc 0%, #e2e8f0 100%);
        color: #0f172a;
        min-height: 100vh;
    }

    .glass {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.8);
        border-radius: 16px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                    0 2px 4px -2px rgba(0, 0, 0, 0.05);
    }

    .demo-container {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 2rem;
        padding: 2rem;
        max-width: 1800px;
        margin: 0 auto;
    }
    
    .sidebar {
        position: relative;
    }

    .logo {
        font-size: 2rem;
        font-weight: 600;
        margin: 0 0 3.5rem 0;
        background: linear-gradient(to right, #0066ff, #818cf8);
        -webkit-background-clip: text;
        color: transparent;
        letter-spacing: -0.02em;
        padding: 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }

    .section-title {
        font-size: 0.875rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #64748b;
        margin: 2rem 0 1.25rem;
        padding-left: 0.5rem;
    }

    .alter-ego-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .alter-ego-card {
        padding: 1.5rem;
        margin-bottom: 0.75rem;
        position: relative;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
        overflow: hidden;
    }

    .alter-ego-card:hover {
        transform: translateY(-2px);
        background: rgba(255, 255, 255, 0.05);
    }

    .alter-ego-card.active {
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .alter-ego-card h3 {
        margin: 0;
        font-size: 1.125rem;
        font-weight: 500;
        color: #1e293b;
        margin-bottom: 0.375rem;
    }

    .status {
        font-size: 0.75rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.05em;
    }

    .status.active {
        color: #15803d;
    }

    .status.training {
        color: #b45309;
    }

    .status-indicator {
        position: absolute;
        top: 50%;
        left: 0;
        width: 3px;
        height: 60%;
        border-radius: 2px;
        transform: translateY(-50%);
    }

    .status-indicator.active {
        background: linear-gradient(to bottom, #22c55e, #16a34a);
        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
    }

    .status-indicator.training {
        background: linear-gradient(to bottom, #f59e0b, #d97706);
        box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
    }

    .metrics-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .metric {
        padding: 1.5rem;
        position: relative;
        overflow: hidden;
    }

    .metric-bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(130deg, rgba(96, 165, 250, 0.03), rgba(167, 139, 250, 0.03));
        z-index: -1;
    }

    .metric h3 {
        font-size: 0.875rem;
        font-weight: 500;
        color: #94a3b8;
        margin: 0 0 0.75rem 0;
    }

    .metric .value {
        font-size: 2.5rem;
        font-weight: 600;
        background: linear-gradient(to right, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        color: transparent;
    }

    .confidence-pill {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        background: rgba(34, 197, 94, 0.1);
        border: 1px solid rgba(34, 197, 94, 0.2);
        border-radius: 100px;
        font-size: 0.875rem;
        color: #16a34a;
        font-weight: 500;
        backdrop-filter: blur(8px);
    }

    .pulse {
        width: 8px;
        height: 8px;
        background: #22c55e;
        border-radius: 50%;
        position: relative;
    }

    .pulse::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        animation: pulse 2s ease-out infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 0.5;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }

    .activity-section {
        padding: 1.5rem;
    }

    .activity-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .activity-icon {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        background: rgba(255, 255, 255, 0.05);
    }

    /* Add specific styling for different activity types */
    .activity-icon.meeting {
        background: linear-gradient(130deg, #3b82f6 0%, #1d4ed8 100%);
    }

    .activity-icon.email {
        background: linear-gradient(130deg, #8b5cf6 0%, #6d28d9 100%);
    }

    .activity-icon.schedule {
        background: linear-gradient(130deg, #ec4899 0%, #be185d 100%);
    }

    .tabs {
        display: flex;
        gap: 1rem;
        margin: 2rem 0;
        padding: 0.5rem;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 100px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.8);
    }

    .tabs button {
        padding: 0.75rem 1.5rem;
        color: #64748b;
        background: transparent;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        border-radius: 100px;
        cursor: pointer;
        font-weight: 500;
        font-size: 0.875rem;
        position: relative;
        overflow: hidden;
    }

    .tabs button:hover {
        color: #1e293b;
    }

    .tabs button.active {
        color: #0f172a;
        background: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .create-new {
        margin-top: 1rem;
        padding: 1rem;
        width: 100%;
        background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.1) 0%,
            rgba(99, 102, 241, 0.1) 100%
        );
        color: #2563eb;
        border: 1px solid rgba(37, 99, 235, 0.2);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-weight: 500;
    }

    .create-new:hover {
        background: linear-gradient(
            135deg,
            rgba(37, 99, 235, 0.15) 0%,
            rgba(99, 102, 241, 0.15) 100%
        );
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
    }

    .create-new:active {
        transform: translateY(0px);
    }

    .plus {
        font-size: 1.2rem;
        font-weight: 500;
        color: #2563eb;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2rem;
        margin-bottom: 2rem;
        position: relative;
    }

    .header h2 {
        margin: 0;
        font-size: 2.25rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        background: linear-gradient(to right, #0f172a, #334155);
        -webkit-background-clip: text;
        color: transparent;
    }

    .specialization {
        color: #64748b;
        font-size: 1rem;
        margin-top: 0.5rem;
        font-weight: 500;
    }

    .tasks-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
    }

    .task-card {
        position: relative;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .task-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .task-status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 100px;
        font-size: 0.75rem;
        font-weight: 500;
    }

    .task-status-badge.completed {
        background: #dcfce7;
        color: #166534;
    }

    .task-status-badge.in_progress {
        background: #fff7ed;
        color: #9a3412;
    }

    .permissions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
    }

    .permission-card {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 16px;
        transition: all 0.3s ease;
    }

    .permission-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .permission-title {
        font-size: 1rem;
        font-weight: 500;
        color: #1e293b;
        text-transform: capitalize;
    }

    .permission-description {
        color: #64748b;
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 52px;
        height: 28px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #e2e8f0;
        transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 100px;
        border: 2px solid transparent;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 4px;
        bottom: 2px;
        background: white;
        transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    input:checked + .slider {
        background: linear-gradient(135deg, #2563eb, #4f46e5);
    }

    input:checked + .slider:before {
        transform: translateX(24px);
    }

    .switch:hover .slider {
        border-color: #e2e8f0;
    }

    input:checked + .slider:hover {
        border-color: rgba(37, 99, 235, 0.2);
    }

    .training-stats {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 1.5rem;
        padding: 1rem;
    }

    .training-card {
        padding: 1.5rem;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        transition: all 0.3s ease;
    }

    .training-card:hover {
        transform: translateY(-2px);
    }

    .training-metric {
        font-size: 0.875rem;
        color: #64748b;
        text-transform: capitalize;
    }

    .training-value {
        font-size: 2rem;
        font-weight: 600;
        color: #0066ff;
        display: flex;
        align-items: baseline;
        gap: 0.5rem;
    }

    .training-trend {
        font-size: 0.875rem;
        color: #16a34a;
    }
</style> 