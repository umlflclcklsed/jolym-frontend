export const mockRoadmapData = {
    id: "backend-developer",
    title: "Backend Developer",
    description: "A comprehensive roadmap to become a professional backend developer",
    estimatedTime: "6-8 months",
    difficulty: 4,
    phases: [
      {
        id: "phase-1",
        title: "Programming Fundamentals",
        description: "Master the core programming concepts and a backend language",
        completed: false,
        milestones: [
          {
            id: "milestone-1-1",
            title: "Learn a Programming Language",
            description:
              "Choose and master a backend programming language like Python, JavaScript (Node.js), Java, or Go",
            completed: false,
            tasks: [
              {
                id: "task-1-1-1",
                title: "Choose Your Language",
                description:
                  "Research and select a backend programming language that aligns with your goals and interests",
                completed: false,
                resources: [
                  {
                    id: "resource-1-1-1-1",
                    title: "Choosing Your First Programming Language",
                    url: "https://example.com/choose-language",
                    type: "article",
                    duration: "15 min",
                    free: true,
                  },
                  {
                    id: "resource-1-1-1-2",
                    title: "Backend Language Comparison",
                    url: "https://example.com/backend-languages",
                    type: "video",
                    duration: "25 min",
                    free: true,
                  },
                ],
              },
              {
                id: "task-1-1-2",
                title: "Learn Syntax and Basic Concepts",
                description:
                  "Master the syntax, data types, control structures, and basic concepts of your chosen language",
                completed: false,
                resources: [
                  {
                    id: "resource-1-1-2-1",
                    title: "Python for Beginners",
                    url: "https://example.com/python-beginners",
                    type: "course",
                    duration: "10 hours",
                    free: true,
                  },
                  {
                    id: "resource-1-1-2-2",
                    title: "JavaScript Fundamentals",
                    url: "https://example.com/js-fundamentals",
                    type: "course",
                    duration: "8 hours",
                    free: false,
                  },
                ],
              },
              {
                id: "task-1-1-3",
                title: "Build Simple Command-Line Programs",
                description: "Practice by building simple command-line applications to solidify your understanding",
                completed: false,
                resources: [
                  {
                    id: "resource-1-1-3-1",
                    title: "10 Command-Line Projects for Beginners",
                    url: "https://example.com/cli-projects",
                    type: "article",
                    duration: "30 min",
                    free: true,
                  },
                ],
              },
            ],
          },
          {
            id: "milestone-1-2",
            title: "Data Structures and Algorithms",
            description: "Learn fundamental data structures and algorithms to write efficient code",
            completed: false,
            tasks: [
              {
                id: "task-1-2-1",
                title: "Learn Basic Data Structures",
                description: "Understand arrays, linked lists, stacks, queues, and hash tables",
                completed: false,
                resources: [
                  {
                    id: "resource-1-2-1-1",
                    title: "Data Structures Explained",
                    url: "https://example.com/data-structures",
                    type: "course",
                    duration: "6 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-1-2-2",
                title: "Learn Basic Algorithms",
                description: "Study sorting, searching, and basic graph algorithms",
                completed: false,
                resources: [
                  {
                    id: "resource-1-2-2-1",
                    title: "Algorithms for Beginners",
                    url: "https://example.com/algorithms",
                    type: "book",
                    duration: "10 hours",
                    free: false,
                  },
                ],
              },
              {
                id: "task-1-2-3",
                title: "Practice Problem Solving",
                description: "Solve coding challenges to improve your algorithmic thinking",
                completed: false,
                resources: [
                  {
                    id: "resource-1-2-3-1",
                    title: "LeetCode for Beginners",
                    url: "https://example.com/leetcode",
                    type: "tool",
                    duration: "Ongoing",
                    free: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "phase-2",
        title: "Web Development Basics",
        description: "Learn the fundamentals of web development and how the web works",
        completed: false,
        milestones: [
          {
            id: "milestone-2-1",
            title: "Understand Web Fundamentals",
            description: "Learn how the web works, including HTTP, URLs, and client-server architecture",
            completed: false,
            tasks: [
              {
                id: "task-2-1-1",
                title: "Learn HTTP Basics",
                description: "Understand HTTP methods, status codes, and headers",
                completed: false,
                resources: [
                  {
                    id: "resource-2-1-1-1",
                    title: "HTTP Fundamentals",
                    url: "https://example.com/http",
                    type: "article",
                    duration: "45 min",
                    free: true,
                  },
                ],
              },
              {
                id: "task-2-1-2",
                title: "Understand Client-Server Architecture",
                description: "Learn how clients and servers communicate over the internet",
                completed: false,
                resources: [
                  {
                    id: "resource-2-1-2-1",
                    title: "Web Architecture 101",
                    url: "https://example.com/web-architecture",
                    type: "video",
                    duration: "1 hour",
                    free: true,
                  },
                ],
              },
            ],
          },
          {
            id: "milestone-2-2",
            title: "Learn Basic Frontend",
            description: "Get familiar with HTML, CSS, and JavaScript to understand how the frontend works",
            completed: false,
            tasks: [
              {
                id: "task-2-2-1",
                title: "Learn HTML & CSS Basics",
                description: "Understand the structure and styling of web pages",
                completed: false,
                resources: [
                  {
                    id: "resource-2-2-1-1",
                    title: "HTML & CSS Crash Course",
                    url: "https://example.com/html-css",
                    type: "course",
                    duration: "4 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-2-2-2",
                title: "Learn Basic JavaScript",
                description: "Understand how JavaScript makes web pages interactive",
                completed: false,
                resources: [
                  {
                    id: "resource-2-2-2-1",
                    title: "JavaScript for Beginners",
                    url: "https://example.com/js-beginners",
                    type: "course",
                    duration: "6 hours",
                    free: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "phase-3",
        title: "Backend Development",
        description: "Learn to build server-side applications and APIs",
        completed: false,
        milestones: [
          {
            id: "milestone-3-1",
            title: "Learn a Backend Framework",
            description: "Master a backend framework like Express.js, Django, Flask, or Spring Boot",
            completed: false,
            tasks: [
              {
                id: "task-3-1-1",
                title: "Choose a Framework",
                description: "Select a backend framework that works with your chosen programming language",
                completed: false,
                resources: [
                  {
                    id: "resource-3-1-1-1",
                    title: "Comparing Backend Frameworks",
                    url: "https://example.com/backend-frameworks",
                    type: "article",
                    duration: "30 min",
                    free: true,
                  },
                ],
              },
              {
                id: "task-3-1-2",
                title: "Build a Simple API",
                description: "Create a basic CRUD API with your chosen framework",
                completed: false,
                resources: [
                  {
                    id: "resource-3-1-2-1",
                    title: "Building RESTful APIs",
                    url: "https://example.com/rest-apis",
                    type: "course",
                    duration: "8 hours",
                    free: false,
                  },
                ],
              },
            ],
          },
          {
            id: "milestone-3-2",
            title: "Databases",
            description: "Learn to work with databases to store and retrieve data",
            completed: false,
            tasks: [
              {
                id: "task-3-2-1",
                title: "Learn SQL Basics",
                description: "Understand how to query and manipulate data in relational databases",
                completed: false,
                resources: [
                  {
                    id: "resource-3-2-1-1",
                    title: "SQL for Beginners",
                    url: "https://example.com/sql-beginners",
                    type: "course",
                    duration: "5 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-3-2-2",
                title: "Learn NoSQL Basics",
                description: "Understand when and how to use NoSQL databases like MongoDB",
                completed: false,
                resources: [
                  {
                    id: "resource-3-2-2-1",
                    title: "NoSQL Database Introduction",
                    url: "https://example.com/nosql-intro",
                    type: "video",
                    duration: "2 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-3-2-3",
                title: "Connect Your API to a Database",
                description: "Integrate a database with your backend application",
                completed: false,
                resources: [
                  {
                    id: "resource-3-2-3-1",
                    title: "Database Integration Tutorial",
                    url: "https://example.com/db-integration",
                    type: "article",
                    duration: "1 hour",
                    free: true,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "phase-4",
        title: "Advanced Backend Concepts",
        description: "Master advanced backend development concepts and practices",
        completed: false,
        milestones: [
          {
            id: "milestone-4-1",
            title: "Authentication & Authorization",
            description: "Learn to implement secure user authentication and authorization",
            completed: false,
            tasks: [
              {
                id: "task-4-1-1",
                title: "Implement User Authentication",
                description: "Build a secure authentication system with password hashing and JWT",
                completed: false,
                resources: [
                  {
                    id: "resource-4-1-1-1",
                    title: "Authentication Best Practices",
                    url: "https://example.com/auth-best-practices",
                    type: "course",
                    duration: "6 hours",
                    free: false,
                  },
                ],
              },
              {
                id: "task-4-1-2",
                title: "Implement Authorization",
                description: "Add role-based access control to your application",
                completed: false,
                resources: [
                  {
                    id: "resource-4-1-2-1",
                    title: "Role-Based Access Control",
                    url: "https://example.com/rbac",
                    type: "article",
                    duration: "45 min",
                    free: true,
                  },
                ],
              },
            ],
          },
          {
            id: "milestone-4-2",
            title: "API Design & Documentation",
            description: "Learn to design and document RESTful APIs",
            completed: false,
            tasks: [
              {
                id: "task-4-2-1",
                title: "Learn RESTful API Design Principles",
                description: "Understand REST principles and best practices for API design",
                completed: false,
                resources: [
                  {
                    id: "resource-4-2-1-1",
                    title: "RESTful API Design",
                    url: "https://example.com/rest-design",
                    type: "book",
                    duration: "5 hours",
                    free: false,
                  },
                ],
              },
              {
                id: "task-4-2-2",
                title: "Document Your API",
                description: "Use tools like Swagger/OpenAPI to document your API",
                completed: false,
                resources: [
                  {
                    id: "resource-4-2-2-1",
                    title: "API Documentation with Swagger",
                    url: "https://example.com/swagger",
                    type: "video",
                    duration: "2 hours",
                    free: true,
                  },
                ],
              },
            ],
          },
          {
            id: "milestone-4-3",
            title: "Testing & Debugging",
            description: "Learn to test and debug backend applications",
            completed: false,
            tasks: [
              {
                id: "task-4-3-1",
                title: "Write Unit Tests",
                description: "Learn to write unit tests for your backend code",
                completed: false,
                resources: [
                  {
                    id: "resource-4-3-1-1",
                    title: "Unit Testing for Backend",
                    url: "https://example.com/unit-testing",
                    type: "course",
                    duration: "4 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-4-3-2",
                title: "Write Integration Tests",
                description: "Learn to write integration tests for your API endpoints",
                completed: false,
                resources: [
                  {
                    id: "resource-4-3-2-1",
                    title: "API Integration Testing",
                    url: "https://example.com/integration-testing",
                    type: "article",
                    duration: "1 hour",
                    free: true,
                  },
                ],
              },
              {
                id: "task-4-3-3",
                title: "Debug Backend Applications",
                description: "Learn techniques for debugging server-side code",
                completed: false,
                resources: [
                  {
                    id: "resource-4-3-3-1",
                    title: "Backend Debugging Techniques",
                    url: "https://example.com/backend-debugging",
                    type: "video",
                    duration: "3 hours",
                    free: false,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "phase-5",
        title: "DevOps & Deployment",
        description: "Learn to deploy and manage backend applications in production",
        completed: false,
        milestones: [
          {
            id: "milestone-5-1",
            title: "Learn Version Control",
            description: "Master Git and GitHub for version control",
            completed: false,
            tasks: [
              {
                id: "task-5-1-1",
                title: "Learn Git Basics",
                description: "Understand basic Git commands and workflows",
                completed: false,
                resources: [
                  {
                    id: "resource-5-1-1-1",
                    title: "Git & GitHub Crash Course",
                    url: "https://example.com/git-github",
                    type: "course",
                    duration: "3 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-5-1-2",
                title: "Learn Collaborative Git Workflows",
                description: "Understand branching, merging, and pull requests",
                completed: false,
                resources: [
                  {
                    id: "resource-5-1-2-1",
                    title: "Git Workflow Best Practices",
                    url: "https://example.com/git-workflow",
                    type: "article",
                    duration: "30 min",
                    free: true,
                  },
                ],
              },
            ],
          },
          {
            id: "milestone-5-2",
            title: "Deployment",
            description: "Learn to deploy backend applications to production",
            completed: false,
            tasks: [
              {
                id: "task-5-2-1",
                title: "Learn Docker Basics",
                description: "Understand containerization with Docker",
                completed: false,
                resources: [
                  {
                    id: "resource-5-2-1-1",
                    title: "Docker for Beginners",
                    url: "https://example.com/docker",
                    type: "course",
                    duration: "5 hours",
                    free: true,
                  },
                ],
              },
              {
                id: "task-5-2-2",
                title: "Deploy to a Cloud Provider",
                description: "Learn to deploy your application to AWS, Azure, or Google Cloud",
                completed: false,
                resources: [
                  {
                    id: "resource-5-2-2-1",
                    title: "Cloud Deployment Guide",
                    url: "https://example.com/cloud-deploy",
                    type: "article",
                    duration: "1 hour",
                    free: true,
                  },
                ],
              },
              {
                id: "task-5-2-3",
                title: "Set Up CI/CD",
                description: "Implement continuous integration and deployment",
                completed: false,
                resources: [
                  {
                    id: "resource-5-2-3-1",
                    title: "CI/CD Pipeline Tutorial",
                    url: "https://example.com/cicd",
                    type: "video",
                    duration: "4 hours",
                    free: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  }
  