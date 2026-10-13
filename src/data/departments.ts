import type { Department } from '../types';

export const departments: Department[] = [
  {
    id: 'delusion',
    code: 'DEL',
    name: 'Department of Delusion Studies',
    description:
      'Where overthinking is a degree requirement and imaginary conversations count as fieldwork. Our graduates are the most prepared people for events that will never happen.',
    color: '#C6FF00',
    bgColor: 'rgba(198,255,0,0.08)',
    emoji: '🌀',
    professor: 'Dr. Delulu Prasad',
    professorTitle: 'Head of Imaginary Affairs',
    courses: ['DEL-101', 'DEL-201', 'DEL-301', 'DEL-401', 'DEL-501'],
    stats: { students: 12847, courses: 5, creditHours: 20 },
  },
  {
    id: 'unproductive',
    code: 'UNP',
    name: 'Department of Unproductive Sciences',
    description:
      'Pioneering research in the art of doing nothing, professionally. Our curriculum is designed to maximise your potential at minimising effort. Attendance is optional — which is why no one comes.',
    color: '#641C2B',
    bgColor: 'rgba(100,28,43,0.12)',
    emoji: '🛌',
    professor: 'Professor Procrastination',
    professorTitle: 'Chair of Deadline Avoidance',
    courses: ['UNP-101', 'UNP-201', 'UNP-301', 'UNP-401', 'UNP-501'],
    stats: { students: 69420, courses: 5, creditHours: 20 },
  },
  {
    id: 'rizz',
    code: 'RZZ',
    name: 'Department of Rizz Engineering',
    description:
      'The only department where your GPA stands for Genuine Personal Aura. We study the thermodynamics of charisma, the quantum mechanics of eye contact, and why some people just have it.',
    color: '#F0EBDD',
    bgColor: 'rgba(240,235,221,0.06)',
    emoji: '✨',
    professor: 'Dr. Rizz Einstein',
    professorTitle: 'Professor of Quantum Attractiveness',
    courses: ['RZZ-101', 'RZZ-201', 'RZZ-301', 'RZZ-401', 'RZZ-501'],
    stats: { students: 8008, courses: 5, creditHours: 20 },
  },
  {
    id: 'grass',
    code: 'GRS',
    name: 'Department of Grass Studies',
    description:
      'Dedicated to the rehabilitation of chronically online individuals. Our field trips are to the outdoors. Most students drop out before reaching the door. The department is committed to changing that, one blinking-at-sunlight moment at a time.',
    color: '#88FF88',
    bgColor: 'rgba(136,255,136,0.06)',
    emoji: '🌿',
    professor: 'Professor Touch Grass',
    professorTitle: 'Director of Outdoor Rehabilitation',
    courses: ['GRS-101', 'GRS-201', 'GRS-301', 'GRS-401', 'GRS-501'],
    stats: { students: 47, courses: 5, creditHours: 20 },
  },
  {
    id: 'brainrot',
    code: 'BRT',
    name: 'Department of Brainrot Technology',
    description:
      'The newest and fastest-growing department at BU. We study the linguistics of Skibidi, the archaeology of viral memes, and the engineering of maximum neuron damage. Our graduates speak fluent internet.',
    color: '#FF6B35',
    bgColor: 'rgba(255,107,53,0.08)',
    emoji: '🧠',
    professor: 'Professor Braincell',
    professorTitle: 'Dean of Advanced Nonsense',
    courses: ['BRT-101', 'BRT-201', 'BRT-301', 'BRT-401', 'BRT-501'],
    stats: { students: 420690, courses: 5, creditHours: 20 },
  },
];

export const getDepartmentById = (id: string): Department | undefined =>
  departments.find((d) => d.id === id);
