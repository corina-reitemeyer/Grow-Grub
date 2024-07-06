# Grow-Grub - your veggie garden companion and tracking app!

Grow-Grub is the ultimate companion app for gardening enthusiasts, who want to grow their own vegetables with ease and success. Whether you're a seasoned gardener or a beginner with a green thumb, Grow-Grub empowers you to plan, track, and manage your vegetable garden effortlessly.

## Table of Contents

- [Project Title](#project-title)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Acknowledgements](#acknowledgements)


## About the Project

### Purpose
The primary purpose of Grow-Grub is to simplify the process of gardening by providing users with comprehensive tools and resources. It aims to bridge the gap between traditional gardening practices and modern technology, offering a digital platform that enhances the gardening experience through practical features.

### Goals
**Empowerment:** Enable users to take control of their gardening projects with personalized planning tools and expert advice.

**Education:** Educate users about plant care, gardening techniques, and sustainable practices to promote healthy plant growth and environmental stewardship.

**Convenience:** Offer a user-friendly interface that simplifies garden management tasks such as scheduling, tracking, and problem-solving.

### Background
Inspired by the increasing trend of urban gardening and the growing interest in sustainable living, Grow-Grub was developed by a team of passionate gardeners and technology enthusiasts. The app draws upon extensive research in horticulture and user experience design to meet the diverse needs of gardeners worldwide.

### Key Features (MVP):

- **Personalized Garden Planning**: Create a customised garden plan based on your available space, climate, and preferences. Choose from a variety of vegetables and herbs to cultivate.

- **Growth Tracking**: Monitor the progress of your plants with intuitive tracking features. Record milestones such as planting dates, germination, flowering, and harvesting times.

- **Watering and Fertilizing Reminders**: Receive notifications and reminders for watering schedules and fertilization, ensuring your plants receive the care they need to thrive.

- **Plant Care Instruction**: Look up crucial information for different vegetables and fruits that are plantable in certain seasons.


### Coming soon:
- **Planting Calendar**: Access a planting calendar tailored to your location, providing optimal planting times and care reminders for each vegetable in your garden.
  
- **Garden Journal**: Maintain a digital journal to jot down notes, observations, and lessons learned from your gardening experiences.

- **Offline Access**: Access essential features offline, allowing you to manage your garden even when internet connectivity is limited.

- **Pest and Disease Identification**: Identify common pests and diseases affecting your plants with detailed guides and recommendations for organic solutions.
 
- **Community and Tips**: Connect with a community of fellow gardeners to share tips, advice, and success stories. Get inspired by others' gardens and learn new techniques.


---

## Setup

Run the following commands in your terminal:

```sh
npm install
npm run knex migrate:latest
npm run knex seed:run
cp .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```
