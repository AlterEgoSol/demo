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
        }
    ];

    return {
        alterEgos
    };
}; 