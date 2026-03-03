export type PlanetType = 'terrestrial' | 'gas-giant' | 'ice-giant';

export interface Moon {
  name: string;
  radius: number;
  distance: number;
  orbitalPeriod: number;
  color: string;
}

export interface Planet {
  name: string;
  radius: number;
  distanceFromSun: number;
  orbitalPeriod: number;
  rotationPeriod: number;
  temperature: { min: number; max: number; avg: number };
  type: PlanetType;
  color: string;
  secondaryColor: string;
  hasRings: boolean;
  ringTilt?: number;
  moons: Moon[];
  description: string;
  facts: string[];
}

export const SUN_DATA = {
  name: 'Sun',
  radius: 696340,
  temperature: 5500,
  color: '#FDB813',
  glowColor: '#FF6B00',
  description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core.',
  facts: [
    'Contains 99.86% of the Solar System\'s mass',
    'Light takes 8 minutes 20 seconds to reach Earth',
    'Core temperature reaches 15 million degrees Celsius',
    'Is 4.6 billion years old',
  ],
};

export const PLANETS: Planet[] = [
  {
    name: 'Mercury',
    radius: 2440,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    rotationPeriod: 1407.6,
    temperature: { min: -180, max: 430, avg: 167 },
    type: 'terrestrial',
    color: '#8c8c8c',
    secondaryColor: '#6b6b6b',
    hasRings: false,
    moons: [],
    description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has a heavily cratered surface similar to Earth\'s Moon.',
    facts: [
      'Smallest planet in the solar system',
      'Has no atmosphere to retain heat',
      'Has the most extreme temperature variations',
      'A day on Mercury lasts 59 Earth days',
    ],
  },
  {
    name: 'Venus',
    radius: 6052,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    rotationPeriod: 5832.5,
    temperature: { min: 462, max: 462, avg: 462 },
    type: 'terrestrial',
    color: '#e6c87a',
    secondaryColor: '#c9a55a',
    hasRings: false,
    moons: [],
    description: 'Venus is the second planet from the Sun and is Earth\'s closest planetary neighbor. It has a thick, toxic atmosphere filled with sulfuric acid clouds.',
    facts: [
      'Hottest planet in our solar system',
      'Rotates backwards compared to most planets',
      'Has the longest day of any planet (243 Earth days)',
      'Atmospheric pressure is 90x that of Earth',
    ],
  },
  {
    name: 'Earth',
    radius: 6371,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.25,
    rotationPeriod: 24,
    temperature: { min: -89, max: 57, avg: 15 },
    type: 'terrestrial',
    color: '#4a90d9',
    secondaryColor: '#2d6b3d',
    hasRings: false,
    moons: [
      { name: 'Moon', radius: 1737, distance: 384400, orbitalPeriod: 27.3, color: '#c4c4c4' },
    ],
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth\'s surface is water.',
    facts: [
      'Only planet known to support life',
      'Has liquid water on its surface',
      'Has a protective magnetic field',
      '71% of surface is covered by water',
    ],
  },
  {
    name: 'Mars',
    radius: 3390,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    temperature: { min: -140, max: 20, avg: -65 },
    type: 'terrestrial',
    color: '#c1440e',
    secondaryColor: '#8b3a0c',
    hasRings: false,
    moons: [
      { name: 'Phobos', radius: 11, distance: 9376, orbitalPeriod: 0.32, color: '#8b7355' },
      { name: 'Deimos', radius: 6, distance: 23460, orbitalPeriod: 1.26, color: '#a09080' },
    ],
    description: 'Mars is the fourth planet from the Sun. It\'s a dusty, cold, desert-like world with a very thin atmosphere. Mars is also a dynamic planet with seasons, polar ice caps, and weather.',
    facts: [
      'Known as the Red Planet due to iron oxide',
      'Has the largest volcano in the solar system (Olympus Mons)',
      'Has two small moons: Phobos and Deimos',
      'A day on Mars is slightly longer than Earth\'s',
    ],
  },
  {
    name: 'Jupiter',
    radius: 69911,
    distanceFromSun: 778.5,
    orbitalPeriod: 4333,
    rotationPeriod: 9.9,
    temperature: { min: -145, max: -110, avg: -128 },
    type: 'gas-giant',
    color: '#d4a574',
    secondaryColor: '#c49a6c',
    hasRings: true,
    ringTilt: 0.06,
    moons: [
      { name: 'Io', radius: 1822, distance: 421700, orbitalPeriod: 1.77, color: '#e6a839' },
      { name: 'Europa', radius: 1560, distance: 671034, orbitalPeriod: 3.55, color: '#b8c4d0' },
      { name: 'Ganymede', radius: 2634, distance: 1070412, orbitalPeriod: 7.15, color: '#8b8378' },
      { name: 'Callisto', radius: 2410, distance: 1882709, orbitalPeriod: 16.7, color: '#6b635a' },
    ],
    description: 'Jupiter is the largest planet in our solar system. It\'s famous for the Great Red Spot, a storm larger than Earth that has been raging for hundreds of years.',
    facts: [
      'Largest planet in our solar system',
      'Has the shortest day of all planets (10 hours)',
      'The Great Red Spot is a 400-year-old storm',
      'Has at least 95 known moons',
    ],
  },
  {
    name: 'Saturn',
    radius: 58232,
    distanceFromSun: 1434,
    orbitalPeriod: 10759,
    rotationPeriod: 10.7,
    temperature: { min: -178, max: -138, avg: -158 },
    type: 'gas-giant',
    color: '#e0c080',
    secondaryColor: '#c4a060',
    hasRings: true,
    ringTilt: 0.47,
    moons: [
      { name: 'Titan', radius: 2575, distance: 1221870, orbitalPeriod: 15.9, color: '#d4a855' },
      { name: 'Enceladus', radius: 252, distance: 238037, orbitalPeriod: 1.37, color: '#e8e8f0' },
      { name: 'Rhea', radius: 764, distance: 527040, orbitalPeriod: 4.5, color: '#b8b8c0' },
      { name: 'Dione', radius: 561, distance: 377400, orbitalPeriod: 2.74, color: '#c8c8d0' },
    ],
    description: 'Saturn is the sixth planet from the Sun and is famous for its stunning ring system. The rings are made mostly of ice particles with some rocky debris and dust.',
    facts: [
      'Has the most extensive ring system in our solar system',
      'Could fit 764 Earths inside it',
      'Has at least 146 known moons',
      'Its rings span up to 282,000 km but are only 10m thick',
    ],
  },
  {
    name: 'Uranus',
    radius: 25362,
    distanceFromSun: 2871,
    orbitalPeriod: 30687,
    rotationPeriod: 17.2,
    temperature: { min: -224, max: -197, avg: -210 },
    type: 'ice-giant',
    color: '#72d5e5',
    secondaryColor: '#5bc0d0',
    hasRings: true,
    ringTilt: 1.57,
    moons: [
      { name: 'Miranda', radius: 236, distance: 129390, orbitalPeriod: 1.41, color: '#a0a0a8' },
      { name: 'Ariel', radius: 579, distance: 191020, orbitalPeriod: 2.52, color: '#c0c0c8' },
      { name: 'Umbriel', radius: 584, distance: 266000, orbitalPeriod: 4.14, color: '#808088' },
      { name: 'Titania', radius: 789, distance: 435910, orbitalPeriod: 8.71, color: '#909098' },
    ],
    description: 'Uranus is the seventh planet from the Sun and is unique for rotating on its side. It has a tilted ring system and is the coldest planetary atmosphere in our solar system.',
    facts: [
      'Rotates on its side with a 98-degree axial tilt',
      'Coldest planetary atmosphere in our solar system',
      'Has 13 known rings and 27 known moons',
      'Takes 84 Earth years to orbit the Sun',
    ],
  },
  {
    name: 'Neptune',
    radius: 24622,
    distanceFromSun: 4495,
    orbitalPeriod: 60190,
    rotationPeriod: 16.1,
    temperature: { min: -218, max: -200, avg: -209 },
    type: 'ice-giant',
    color: '#4169e1',
    secondaryColor: '#3355c0',
    hasRings: true,
    ringTilt: 0.5,
    moons: [
      { name: 'Triton', radius: 1353, distance: 354759, orbitalPeriod: 5.88, color: '#b0b0b8' },
      { name: 'Nereid', radius: 170, distance: 5513400, orbitalPeriod: 360, color: '#909098' },
    ],
    description: 'Neptune is the eighth and farthest known planet from the Sun. It has the strongest sustained winds of any planet, reaching speeds of 2,100 km/h.',
    facts: [
      'Has the strongest winds in the solar system (2,100 km/h)',
      'Takes 165 Earth years to orbit the Sun',
      'Has 16 known moons',
      'Was the first planet located through mathematical prediction',
    ],
  },
];

export const SCALE_FACTORS = {
  radiusScale: 0.00005,
  distanceScale: 0.015,
  orbitSpeedScale: 0.001,
  moonDistanceScale: 0.00008,
  moonRadiusScale: 0.0003,
};
