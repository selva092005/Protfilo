import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    name: 'Selva Bharathi V',
    title: 'Full-Stack Developer',
    email: 'selvabharathi2005vss@gmail.com',
    phone: '9384447886',
    location: 'Vriddhachalam, India',
    linkedin: 'https://www.linkedin.com/in/v-selva-bharathi-2638a6269',
    github: 'https://github.com/selva092005',
    web3FormsKey: '78b076d1-fc79-4b2f-a3ab-7c28b46ed344', // Get your free access key at https://web3forms.com
    summary: 'Innovative Full-Stack Developer with expertise in building scalable, responsive, and user-centric web applications. Proficient in React, Redux Toolkit, Material UI, Spring Boot, MySQL, and REST APIs. Experienced in developing end-to-end solutions that streamline business processes, automate workflows, and improve operational efficiency. Passionate about creating performant, accessible, and maintainable software while continuously expanding technical expertise and adopting modern development practices.'
  },
  skills: [
    { id: 'html', name: 'HTML/CSS', category: 'frontend', color: '#e34f26' },
    { id: 'css3', name: 'CSS3', category: 'frontend', color: '#1572b6' },
    { id: 'javascript', name: 'JavaScript', category: 'frontend', color: '#f7df1e' },
    { id: 'bootstrap', name: 'Bootstrap', category: 'frontend', color: '#7952b3' },
    { id: 'mui', name: 'Material UI', category: 'frontend', color: '#0081CB' },
    { id: 'react', name: 'React.js', category: 'frontend', color: '#00d8ff' },
    { id: 'nodejs', name: 'Node.js', category: 'backend', color: '#339933' },
    { id: 'expressjs', name: 'Express.js', category: 'backend', color: '#828282' },
    { id: 'springboot', name: 'Spring Boot', category: 'backend', color: '#6db33f' },
    { id: 'mysql', name: 'MySQL', category: 'backend', color: '#4479a1' },
    { id: 'restapi', name: 'REST API', category: 'backend', color: '#009688' },
    { id: 'git', name: 'Git', category: 'tools', color: '#f05032' }
  ],
  interpersonalSkills: [
    'Problem Solving',
    'Decision Making',
    'Time Management',
    'Active Listening'
  ],
  education: [
    {
      institution: 'Sri Saradha Vidhayalaiya Matric School',
      degree: 'Secondary Education',
      duration: '2019 - 2020',
      gradeType: 'Percentage',
      grade: '67.2%'
    },
    {
      institution: 'V.E.T Matric Higher Sec School',
      degree: 'Higher Secondary Education',
      duration: '2021 - 2022',
      gradeType: 'Percentage',
      grade: '77.6%'
    },
    {
      institution: 'Muthayammal Engineering College',
      degree: 'BE Electronics And Communication Engineering',
      duration: '2022 - 2026',
      gradeType: 'CGPA',
      grade: '7.76'
    }
  ],
  internships: [
    {
      role: 'React Developer Intern',
      company: 'Cavin Infotech',
      location: 'Remote',
      duration: 'June 2026 - Present',
      description: 'Developing responsive web interfaces, optimizing UI performance, and collaborating on product modules. Programmed key features for a professional Asset Management System (AMS) including interactive dashboards, status charts, and state-synchronized bulk transfer operations using React, Redux Toolkit, and Material UI.'
    },
    {
      role: 'Python Developer Intern',
      company: 'Zealous Tech Corp',
      location: 'Salem',
      duration: '12/2024 - 01/2025',
      description: 'Completed a Python Internship with practical experience in Python development, scripting, and problem-solving.'
    }
  ],
  certifications: [
    {
      title: 'Python Developer',
      issuer: 'Zealous Tech Corp',
      duration: '12/2024 - 01/2025',
      location: 'Salem'
    },
    {
      title: 'Fundamental Of Artificial Intelligence',
      issuer: 'NPTEL',
      duration: '07/2024 - 10/2025'
    },
    {
      title: 'Introduction To Internet Of Things',
      issuer: 'NPTEL',
      duration: '01/2025 - 10/2025'
    },
    {
      title: 'Ethics in Engineering',
      issuer: 'NPTEL',
      duration: '01/2025 - 08/2025'
    }
  ],
  projects: [
    {
      title: 'Professional Asset Management System (AMS)',
      description: 'Engineered a full-stack Asset Management System (AMS) to manage the end-to-end asset lifecycle—covering procurement, registration, bulk allocation, maintenance tracking, and disposal. Built with a secure Spring Boot and MySQL backend, and a responsive React frontend using Redux Toolkit and Material UI, the platform streamlines resource workflows and exports audit-ready reports.',
      tags: ['React', 'Spring Boot', 'MySQL', 'Redux Toolkit', 'Material UI', 'JWT', 'WebSockets'],
      github: 'https://github.com/selva092005',
      demo: 'https://github.com/selva092005'
    }
  ],
  languages: [
    { name: 'Tamil', proficiency: 'Native or Bilingual Proficiency' },
    { name: 'English', proficiency: 'Professional Working Proficiency' }
  ],
  interests: [
    'Reading Books',
    'Problem Solving and Logical Thinking',
    'Continuous Skill Development'
  ]
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    ...initialState,
    activeTab: 'home',
    scrollTarget: null,
  },
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.scrollTarget = { id: action.payload, timestamp: Date.now() };
    },
    setActiveTabFromScroll: (state, action) => {
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab, setActiveTabFromScroll } = portfolioSlice.actions;
export default portfolioSlice.reducer;

