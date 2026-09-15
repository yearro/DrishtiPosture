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
  },
  {
    id: 'balasana',
    sanskritName: 'Balasana',
    englishName: 'Child\'s Pose',
    spanishName: 'Postura del Niño',
    difficulty: 'beginner',
    category: 'Descanso y Restauración',
    description: 'Postura de descanso profunda que relaja la columna, caderas y mente. Ideal para recuperarse entre asanas más intensas.',
    alignmentPoints: [
      'Rodillas separadas al ancho de las caderas o más amplias.',
      'Caderas hundiéndose hacia los talones.',
      'Frente apoyada en el suelo o sobre los puños/almohada.',
      'Brazos extendidos al frente o junto al cuerpo con palmas hacia arriba.'
    ],
    benefits: [
      'Alivia tensión en la zona lumbar y caderas.',
      'Calma el sistema nervioso y reduce el estrés.',
      'Estira suavemente tobillos, muslos y cadera.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'marjaryasana-bitilasana',
    sanskritName: 'Marjaryasana-Bitilasana',
    englishName: 'Cat-Cow',
    spanishName: 'Gato-Vaca',
    difficulty: 'beginner',
    category: 'Movilidad Espinal',
    description: 'Secuencia fluida que moviliza la columna vertebral en flexión y extensión, sincronizada con la respiración.',
    alignmentPoints: [
      'Manos bajo los hombros, rodillas bajo las caderas.',
      'Inhalación: arquear columna (vaca), elevar coxis y mirada.',
      'Exhalación: redondear columna (gato), llevar mentón al pecho.',
      'Movimiento ondulatorio iniciado desde el coxis hacia la coronilla.'
    ],
    benefits: [
      'Aumenta la movilidad segmentaria de la columna.',
      'Masajea órganos abdominales y mejora la digestión.',
      'Sincroniza respiración con movimiento (Vinyasa).'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sukhasana',
    sanskritName: 'Sukhasana',
    englishName: 'Easy Pose',
    spanishName: 'Postura Fácil',
    difficulty: 'beginner',
    category: 'Meditación y Asiento',
    description: 'Asiento cruzado simple y estable para pranayama y meditación, con columna erguida y caderas abiertas.',
    alignmentPoints: [
      'Piernas cruzadas con pies bajo las rodillas opuestas.',
      'Sentarse sobre el borde de una manta si las caderas están tensas.',
      'Columna alargada, coronilla hacia el cielo, mentón paralelo al suelo.',
      'Manos sobre las rodillas en Chin Mudra o Jnana Mudra.'
    ],
    benefits: [
      'Establece una base estable para prácticas sentadas.',
      'Abre suavemente caderas y tobillos.',
      'Promueve la calma mental y la introspección.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'uttanasana',
    sanskritName: 'Uttanasana',
    englishName: 'Standing Forward Fold',
    spanishName: 'Flexión Adelante de Pie',
    difficulty: 'beginner',
    category: 'Estiramiento Posterior',
    description: 'Flexión hacia adelante de pie que libera la zona lumbar y estira toda la cadena posterior del cuerpo.',
    alignmentPoints: [
      'Pies al ancho de caderas, paralelos.',
      'Flexión desde la cadera, no desde la cintura.',
      'Rodillas ligeramente flexionadas si hay tensión en isquiotibiales.',
      'Cabeza y cuello completamente relajados, brazos colgando o cogiendo codos opuestos.'
    ],
    benefits: [
      'Estira isquiotibiales, pantorrillas y zona lumbar.',
      'Calma la mente y alivia dolores de cabeza tensionales.',
      'Mejora la circulación hacia el cerebro.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'setu-bandha-sarvangasana',
    sanskritName: 'Setu Bandha Sarvangasana',
    englishName: 'Bridge Pose',
    spanishName: 'Postura del Puente',
    difficulty: 'beginner',
    category: 'Extensión Espinal Suave',
    description: 'Extensión espinal apoyada que abre el pecho, fortalece glúteos y prepara para inversiones.',
    alignmentPoints: [
      'Acostado boca arriba, rodillas flexionadas, pies al ancho de caderas.',
      'Talones cerca de los glúteos, brazos junto al cuerpo palmas hacia abajo.',
      'Inhalación: elevar caderas presionando pies y brazos.',
      'Entrelazar manos bajo la espalda y rodar hombros bajo el pecho.'
    ],
    benefits: [
      'Fortalece glúteos, isquiotibiales y zona lumbar.',
      'Abre pecho, hombros y flexores de cadera.',
      'Estimula tiroides y calma el sistema nervioso.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'savasana',
    sanskritName: 'Savasana',
    englishName: 'Corpse Pose',
    spanishName: 'Postura del Cadáver',
    difficulty: 'beginner',
    category: 'Relajación Final',
    description: 'Relajación consciente completa para integrar la práctica y resetear el sistema nervioso.',
    alignmentPoints: [
      'Acostado boca arriba, piernas extendidas y separadas.',
      'Brazos a 45° del cuerpo, palmas hacia arriba.',
      'Escápulas deslizadas hacia la cintura, cuello largo.',
      'Cuerpo completamente inmóvil, respiración natural.'
    ],
    benefits: [
      'Reduce cortisol y activa sistema parasimpático.',
      'Integra beneficios físicos y mentales de la práctica.',
      'Mejora calidad del sueño y reduce ansiedad.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'virabhadrasana1',
    sanskritName: 'Virabhadrasana I',
    englishName: 'Warrior I',
    spanishName: 'Guerrero I',
    difficulty: 'intermediate',
    category: 'Fuerza y Apertura',
    description: 'Postura de pie poderosa que combina estabilidad, fuerza de piernas y apertura de pecho y flexores de cadera.',
    alignmentPoints: [
      'Pierna trasera rotada 45-60°, talón alineado con talón delantero.',
      'Rodilla delantera flexionada a 90° sobre el tobillo.',
      'Caderas cuadradas hacia el frente, coxis dirigido al suelo.',
      'Brazos elevados, palmas juntas o separadas, hombros bajos.'
    ],
    benefits: [
      'Fortalece cuádriceps, glúteos y tobillos.',
      'Estira flexores de cadera, pecho y dorsales.',
      'Desarrolla enfoque, determinación y conexión a tierra.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'virabhadrasana3',
    sanskritName: 'Virabhadrasana III',
    englishName: 'Warrior III',
    spanishName: 'Guerrero III',
    difficulty: 'intermediate',
    category: 'Equilibrio y Enraizamiento',
    description: 'Equilibrio sobre una pierna con torso y pierna trasera paralelos al suelo, cultivando fuerza y concentración.',
    alignmentPoints: [
      'Pie de apoyo enraizado, cadera de pierna elevada nivelada.',
      'Torso y pierna trasera en línea recta paralela al suelo.',
      'Brazos extendidos al frente, junto a las orejas o en Anjali Mudra.',
      'Drishti (mirada) fija en un punto del suelo para estabilidad.'
    ],
    benefits: [
      'Fortalece tobillos, piernas, core y espalda.',
      'Mejora propiocepción, equilibrio y coordinación.',
      'Desarrolla fuerza mental y presencia.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'utkatasana',
    sanskritName: 'Utkatasana',
    englishName: 'Chair Pose',
    spanishName: 'Postura de la Silla',
    difficulty: 'intermediate',
    category: 'Fuerza y Estabilidad',
    description: 'Sentado imaginario que fortalece intensamente piernas y core mientras desafía el equilibrio y la respiración.',
    alignmentPoints: [
      'Pies juntos o al ancho de caderas, peso en talones.',
      'Flexionar rodillas como sentándose en silla invisible.',
      'Brazos elevados junto a orejas, palmas enfrentadas.',
      'Columna alargada, core activado, hombros lejos de orejas.'
    ],
    benefits: [
      'Fortalece cuádriceps, glúteos, tobillos y core.',
      'Estimula corazón, diafragma y órganos abdominales.',
      'Genera calor interno y desarrolla resistencia.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'parsvakonasana',
    sanskritName: 'Utthita Parsvakonasana',
    englishName: 'Extended Side Angle',
    spanishName: 'Ángulo Lateral Extendido',
    difficulty: 'intermediate',
    category: 'Estiramiento Lateral',
    description: 'Flexión lateral profunda con pierna delantera flexionada, abriendo la cadena lateral completa del cuerpo.',
    alignmentPoints: [
      'Piernas separadas ampliamente, talón delantero alineado con arco trasero.',
      'Rodilla delantera a 90°, codo sobre muslo o mano al suelo fuera del pie.',
      'Brazo superior extendido sobre la oreja, creando línea continua desde talón trasero a dedos.',
      'Pecho rotado hacia el techo, mirada hacia la mano superior.'
    ],
    benefits: [
      'Estira y fortalece piernas, ingle, columna lateral y hombros.',
      'Estimula órganos abdominales y mejora resistencia.',
      'Prepara caderas y columna para posturas más profundas.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prasarita-padottanasana',
    sanskritName: 'Prasarita Padottanasana',
    englishName: 'Wide-Legged Forward Fold',
    spanishName: 'Flexión Adelante Piernas Abiertas',
    difficulty: 'intermediate',
    category: 'Inversión y Estiramiento',
    description: 'Flexión adelante con piernas abiertas que combina inversión suave con estiramiento intenso de isquiotibiales e ingles.',
    alignmentPoints: [
      'Piernas separadas 1-1.2m, pies paralelos, bordes externos paralelos a la esterilla.',
      'Manos en caderas, inhalar alargar columna, exhalar flexionar desde cadera.',
      'Corona de la cabeza hacia el suelo, peso en piernas, no en cabeza.',
      'Brazos pueden estar entrelazados atrás o manos en el suelo bajo hombros.'
    ],
    benefits: [
      'Estira isquiotibiales, aductores y fascia plantar.',
      'Calma sistema nervioso (cabeza bajo corazón).',
      'Fortalece piernas y mejora circulación cerebral.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'ardha-matsyendrasana',
    sanskritName: 'Ardha Matsyendrasana',
    englishName: 'Half Lord of the Fishes',
    spanishName: 'Medio Señor de los Peces',
    difficulty: 'intermediate',
    category: 'Torsión Espinal',
    description: 'Torsión sentada que rota la columna vertebral, masajea órganos internos y libera tensión en espalda y caderas.',
    alignmentPoints: [
      'Sentado, pierna derecha flexionada con pie fuera de cadera izquierda.',
      'Pierna izquierda flexionada, pie cerca de glúteo derecho (o extendida).',
      'Inhalar alargar columna, exhalar rotar hacia la derecha.',
      'Brazo izquierdo abraza rodilla derecha o codo fuera de rodilla, mano derecha en suelo detrás.'
    ],
    benefits: [
      'Aumenta movilidad rotacional de columna torácica.',
      'Masajea órganos digestivos y estimula detoxificación.',
      'Alivia rigidez en espalda, caderas y hombros.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bhujangasana',
    sanskritName: 'Bhujangasana',
    englishName: 'Cobra Pose',
    spanishName: 'Postura de la Cobra',
    difficulty: 'intermediate',
    category: 'Extensión Espinal',
    description: 'Extensión espinal prona que fortalece la espalda baja y abre el pecho, contrarrestando la postura encorvada.',
    alignmentPoints: [
      'Acostado boca arriba, manos bajo hombros, codos pegados a costillas.',
      'Piernas extendidas, empeines en el suelo, glúteos relajados.',
      'Inhalar elevar pecho usando fuerza de espalda (no empuje de brazos).',
      'Omóplatos deslizados hacia la cintura, cuello largo, mirada frontal.'
    ],
    benefits: [
      'Fortalece músculos erectores de la columna y glúteos.',
      'Abre pecho, hombros y flexiona columna torácica.',
      'Estimula órganos abdominales y mejora postura.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540324155697-8e972e52b0b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sirsasana',
    sanskritName: 'Sirsasana',
    englishName: 'Headstand',
    spanishName: 'Postura sobre la Cabeza',
    difficulty: 'advanced',
    category: 'Inversión',
    description: 'Inversión completa apoyada en cabeza y antebrazos, considerada el rey de las asanas por sus beneficios sistémicos.',
    alignmentPoints: [
      'Antebrazos en el suelo, manos entrelazadas formando base triangular.',
      'Corona de la cabeza en el suelo, nuca apoyada en manos.',
      'Elevar caderas, caminar pies hacia la cara, elevar piernas con control.',
      'Cuerpo en línea vertical: tobillos, caderas, hombros, coronilla alineados.'
    ],
    benefits: [
      'Mejora circulación venosa y linfática, oxigena cerebro.',
      'Fortalece hombros, brazos, core y estabilizadores profundos.',
      'Promueve claridad mental, calma y equilibrio hormonal.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sarvangasana',
    sanskritName: 'Sarvangasana',
    englishName: 'Shoulderstand',
    spanishName: 'Postura sobre los Hombros',
    difficulty: 'advanced',
    category: 'Inversión',
    description: 'Inversión apoyada en hombros y brazos, la reina de las asanas, que nutre tiroides y sistema endocrino.',
    alignmentPoints: [
      'Acostado boca arriba, elevar piernas y caderas sobre hombros.',
      'Manos apoyan espalda baja, codos al ancho de hombros.',
      'Cuerpo en línea vertical, mentón presiona esternón (Jalandhara Bandha).',
      'Pies relajados, mirada hacia el pecho o nariz, respiración profunda.'
    ],
    benefits: [
      'Estimula tiroides, paratiroides y sistema endocrino.',
      'Mejora retorno venoso y drenaje linfático de piernas.',
      'Calma mente, alivia insomnio y fatiga mental.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'urdhva-dhanurasana',
    sanskritName: 'Urdhva Dhanurasana',
    englishName: 'Wheel Pose',
    spanishName: 'Postura de la Rueda',
    difficulty: 'advanced',
    category: 'Extensión Espinal Profunda',
    description: 'Arco posterior completo que requiere fuerza, flexibilidad y apertura en toda la cadena anterior del cuerpo.',
    alignmentPoints: [
      'Acostado boca arriba, rodillas flexionadas, pies al ancho de caderas cerca de glúteos.',
      'Manos junto a orejas, dedos apuntando a hombros, codos hacia el techo.',
      'Inhalar elevar caderas y luego pecho, enderezar brazos progresivamente.',
      'Pecho sobrepasando muñecas, muslos paralelos, peso distribuido equitativamente.'
    ],
    benefits: [
      'Fortalece brazos, piernas, glúteos y espalda completa.',
      'Abre pecho, hombros, flexores de cadera y cuádriceps.',
      'Energiza, mejora estado de ánimo y capacidad respiratoria.'
    ],
imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'bhujangasana',
    sanskritName: 'Bhujangasana',
    englishName: 'Cobra Pose',
    spanishName: 'Postura de la Cobra',
    difficulty: 'intermediate',
    category: 'Extensión Espinal',
    description: 'Extensión espinal prona que fortalece la espalda baja y abre el pecho, contrarrestando la postura encorvada.',
    alignmentPoints: [
      'Acostado boca arriba, manos bajo hombros, codos pegados a costillas.',
      'Piernas extendidas, empeines en el suelo, glúteos relajados.',
      'Inhalar elevar pecho usando fuerza de espalda (no empuje de brazos).',
      'Omóplatos deslizados hacia la cintura, cuello largo, mirada frontal.'
    ],
    benefits: [
      'Fortalece músculos erectores de la columna y glúteos.',
      'Abre pecho, hombros y flexiona columna torácica.',
      'Estimula órganos abdominales y mejora postura.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'eka-pada-rajakapotasana',
    sanskritName: 'Eka Pada Rajakapotasana',
    englishName: 'One-Legged King Pigeon',
    spanishName: 'Paloma Real Una Pierna',
    difficulty: 'advanced',
    category: 'Apertura de Cadera Profunda',
    description: 'Abertura extrema de cadera con flexión posterior, integrando flexibilidad de psoas, cuádriceps y columna.',
    alignmentPoints: [
      'Desde perro boca abajo, rodilla derecha tras muñeca derecha, tobillo cerca de cadera izquierda.',
      'Extender pierna izquierda recta atrás, cadera cuadrada al frente.',
      'Flexionar pierna trasera, tomar pie con mano misma o ambas manos sobre cabeza.',
      'Pecho elevado, hombros bajos, columna extendida sin comprimir lumbar.'
    ],
    benefits: [
      'Abre profundamente psoas, flexores de cadera y cuádriceps.',
      'Estira pectorales, dorsales y flexiona columna torácica.',
      'Libera tensiones emocionales almacenadas en caderas.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&w=800&q=80'
  }
];
