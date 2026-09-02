import type { IAsana } from '../types/app.types';

export const ASANA_CATALOG: IAsana[] = [
  {
    id: 'vrksasana',
    sanskritName: 'Vrksasana',
    englishName: 'Tree Pose',
    spanishName: 'Postura del Árbol',
    difficulty: 'beginner',
    category: 'Equilibrio y Enraizamiento',
    description: 'Postura de equilibrio sobre un pie que fortalece los tobillos y desarrolla la concentración y la postura erguida.',
    alignmentPoints: [
      'Enraizar el pie de apoyo distribuyendo el peso uniformemente.',
      'Caderas niveladas y cuadradas hacia el frente.',
      'Extensión vertebral activa sin arquear la zona lumbar.',
      'Manos juntas al pecho (Anjali Mudra) o extendidas hacia arriba.'
    ],
    benefits: [
      'Mejora el equilibrio físico y la estabilidad neuro-muscular.',
      'Fortalece los músculos estabilizadores del tobillo y la rodilla.',
      'Aumenta la capacidad de concentración mental (Dharana).'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tadasana',
    sanskritName: 'Tadasana',
    englishName: 'Mountain Pose',
    spanishName: 'Postura de la Montaña',
    difficulty: 'beginner',
    category: 'Alineación Base',
    description: 'La postura fundamental de pie que enseña la alineación anatómica neutra y la distribución equilibrada del peso corporal.',
    alignmentPoints: [
      'Pies juntos o al ancho de las caderas, paralelos entre sí.',
      'Rótulas elevadas y cuadriceps activados.',
      'Pelvis en posición neutra, sacro alargado.',
      'Hombros relajados hacia atrás y abajo, coronilla hacia el cielo.'
    ],
    benefits: [
      'Corrige desviaciones posturales cotidianas.',
      'Fortalece muslos, rodillas y tobillos.',
      'Promueve una respiración diafragmática profunda.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'virabhadrasana2',
    sanskritName: 'Virabhadrasana II',
    englishName: 'Warrior II',
    spanishName: 'Postura del Guerrero II',
    difficulty: 'intermediate',
    category: 'Fuerza y Apertura',
    description: 'Postura de pie potente que abre las caderas, fortalece las piernas y desarrolla fuerza de voluntad.',
    alignmentPoints: [
      'Rodilla delantera flexionada a 90° sobre el tobillo.',
      'Borde exterior del pie trasero firmemente presionado contra el piso.',
      'Brazos paralelos al suelo alineados sobre las piernas.',
      'Mirada (Drishti) fija sobre el dedo medio de la mano delantera.'
    ],
    benefits: [
      'Fortalece muslos, glúteos y hombros.',
      'Abre la ingle, el pecho y las articulaciones de la cadera.',
      'Desarrolla resistencia física y estabilidad mental.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'adho-mukha-svanasana',
    sanskritName: 'Adho Mukha Svanasana',
    englishName: 'Downward-Facing Dog',
    spanishName: 'Perro mirando hacia abajo',
    difficulty: 'intermediate',
    category: 'Inversión y Estiramiento',
    description: 'Una de las asanas más emblemáticas del yoga; estira toda la cadena posterior y fortalece el tren superior.',
    alignmentPoints: [
      'Manos separadas al ancho de hombros con dedos bien abiertos.',
      'Cadera elevada hacia el techo formando una V invertida.',
      'Columna alargada desde las muñecas hasta el sacro.',
      'Talones buscando el suelo con las piernas extendidas.'
    ],
    benefits: [
      'Estira isquiotibiales, pantorrillas y arco plantar.',
      'Fortalece muñecas, hombros y músculos de la espalda.',
      'Calma la mente y ayuda a aliviar el estrés.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'trikonasana',
    sanskritName: 'Utthita Trikonasana',
    englishName: 'Extended Triangle Pose',
    spanishName: 'Postura del Triángulo',
    difficulty: 'intermediate',
    category: 'Estiramiento Lateral',
    description: 'Asana de pie que combina flexión lateral de columna con rotación externa de caderas.',
    alignmentPoints: [
      'Piernas abiertas aproximadamente un metro de distancia.',
      'Torso extendido lateralmente sobre la pierna delantera.',
      'Brazo superior extendido perpendicular al suelo.',
      'Pecho abierto y mirando hacia la mano superior.'
    ],
    benefits: [
      'Estira y fortalece muslos, rodillas y tobillos.',
      'Estimula los órganos abdominales y mejora la digestión.',
      'Alivia dolores de espalda de ligera intensidad.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80'
  }
];
