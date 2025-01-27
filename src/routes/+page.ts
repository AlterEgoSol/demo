import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    // Simulated data for demo purposes
    const alterEgos = [
        {
            id: "ae001",
            name: "Business Assistant",
            avatar: "/avatars/business.png",
            status: "active",
            tasks_completed: 147,
            earnings: 2345,
            specialization: "Meeting Management & Email Handling",
            confidence_score: 0.94,
            recent_tasks: [
                {
                    type: "meeting",
                    description: "Attended weekly team sync",
                    timestamp: "2024-03-20T10:00:00Z",
                    duration: 45,
                    status: "completed"
                },
                {
                    type: "email",
                    description: "Drafted quarterly report summary",
                    timestamp: "2024-03-20T09:00:00Z",
                    status: "completed"
                },
                {
                    type: "schedule",
                    description: "Organized client meeting for next week",
                    timestamp: "2024-03-20T08:30:00Z",
                    status: "completed"
                }
            ],
            permissions: {
                email: true,
                calendar: true,
                meetings: true,
                documents: true,
                payments: false
            },
            training_data: {
                emails_processed: 1247,
                meetings_attended: 89,
                documents_analyzed: 156,
                training_hours: 342
            }
        },
        {
            id: "ae002",
            name: "Creative Writer",
            avatar: "/avatars/creative.png",
            status: "training",
            tasks_completed: 89,
            earnings: 1256,
            specialization: "Content Creation & Social Media",
            confidence_score: 0.87,
            recent_tasks: [
                {
                    type: "content",
                    description: "Wrote blog post about AI trends",
                    timestamp: "2024-03-20T11:00:00Z",
                    status: "in_progress"
                },
                {
                    type: "social",
                    description: "Created weekly social media schedule",
                    timestamp: "2024-03-20T08:00:00Z",
                    status: "completed"
                }
            ],
            permissions: {
                social_media: true,
                blog_posting: true,
                content_editing: true,
                email: false,
                payments: false
            },
            training_data: {
                articles_written: 45,
                social_posts: 234,
                content_edited: 89,
                training_hours: 156
            }
        },
        {
            id: "ae003",
            name: "Research Analyst",
            avatar: "/avatars/analyst.png",
            status: "active",
            tasks_completed: 203,
            earnings: 3420,
            specialization: "Data Analysis & Market Research",
            confidence_score: 0.92,
            recent_tasks: [
                {
                    type: "research",
                    description: "Completed market analysis report",
                    timestamp: "2024-03-20T12:00:00Z",
                    status: "completed"
                },
                {
                    type: "data",
                    description: "Generated insights from quarterly data",
                    timestamp: "2024-03-20T10:30:00Z",
                    status: "completed"
                }
            ],
            permissions: {
                data_access: true,
                report_generation: true,
                email: true,
                documents: true,
                payments: false
            },
            training_data: {
                reports_generated: 89,
                data_sets_analyzed: 156,
                research_hours: 423,
                training_hours: 278
            }
        },
        {
            id: "ae004",
            name: "Customer Support",
            avatar: "/avatars/support.png",
            status: "active",
            tasks_completed: 1247,
            earnings: 4530,
            specialization: "24/7 Customer Service & Support",
            confidence_score: 0.96,
            recent_tasks: [
                {
                    type: "support",
                    description: "Resolved technical issue for client",
                    timestamp: "2024-03-20T13:15:00Z",
                    status: "completed"
                },
                {
                    type: "chat",
                    description: "Handled customer inquiry about pricing",
                    timestamp: "2024-03-20T13:00:00Z",
                    status: "completed"
                }
            ],
            permissions: {
                chat: true,
                email: true,
                knowledge_base: true,
                ticket_management: true,
                payments: false
            },
            training_data: {
                tickets_resolved: 892,
                chat_sessions: 2341,
                satisfaction_score: 98,
                training_hours: 512
            }
        },
        {
            id: "ae005",
            name: "Code Assistant",
            avatar: "/avatars/coder.png",
            status: "training",
            tasks_completed: 67,
            earnings: 890,
            specialization: "Code Review & Documentation",
            confidence_score: 0.82,
            recent_tasks: [
                {
                    type: "code",
                    description: "Reviewing pull request #234",
                    timestamp: "2024-03-20T14:00:00Z",
                    status: "in_progress"
                },
                {
                    type: "docs",
                    description: "Updated API documentation",
                    timestamp: "2024-03-20T12:45:00Z",
                    status: "completed"
                }
            ],
            permissions: {
                code_review: true,
                documentation: true,
                github_access: true,
                ci_cd: false,
                deployment: false
            },
            training_data: {
                prs_reviewed: 156,
                docs_updated: 45,
                code_lines_analyzed: 23456,
                training_hours: 234
            }
        }
    ];

    return {
        alterEgos
    };
}; 