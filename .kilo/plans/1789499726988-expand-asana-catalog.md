# Expand Asana Catalog Plan

## Current State
- **5 asanas** in `src/data/asanaData.ts`
- **5 categories**: Equilibrio y Enraizamiento, Alineación Base, Fuerza y Apertura, Inversión y Estiramiento, Estiramiento Lateral
- **3 difficulty levels**: beginner, intermediate, advanced (type defined but no advanced asanas yet)
- Each asana has: id, sanskritName, englishName, spanishName, difficulty, category, description, alignmentPoints[], benefits[], imageUrl

## Goal
Expand catalog to **20-25 asanas** with balanced representation across:
- All 3 difficulty levels (beginner, intermediate, advanced)
- Existing + new categories for better organization
- Major asana families (standing, seated, balancing, inversions, backbends, twists, forward folds)

## Proposed New Asanas

### Beginner (add 5-6)
| Sanskrit | English | Spanish | Category |
|----------|---------|---------|----------|
| Balasana | Child's Pose | Postura del Niño | Descanso y Restauración |
| Marjaryasana-Bitilasana | Cat-Cow | Gato-Vaca | Movilidad Espinal |
| Sukhasana | Easy Pose | Postura Fácil | Meditación y Asiento |
| Uttanasana | Standing Forward Fold | Flexión Adelante de Pie | Estiramiento Posterior |
| Setu Bandha Sarvangasana | Bridge Pose | Postura del Puente | Extensión Espinal Suave |
| Savasana | Corpse Pose | Postura del Cadáver | Relajación Final |

### Intermediate (add 6-7)
| Sanskrit | English | Spanish | Category |
|----------|---------|---------|----------|
| Virabhadrasana I | Warrior I | Guerrero I | Fuerza y Apertura |
| Virabhadrasana III | Warrior III | Guerrero III | Equilibrio y Enraizamiento |
| Utkatasana | Chair Pose | Postura de la Silla | Fuerza y Estabilidad |
| Parsvakonasana | Extended Side Angle | Ángulo Lateral Extendido | Estiramiento Lateral |
| Prasarita Padottanasana | Wide-Legged Forward Fold | Flexión Adelante Piernas Abiertas | Inversión y Estiramiento |
| Ardha Matsyendrasana | Half Lord of the Fishes | Medio Señor de los Peces | Torsión Espinal |
| Bhujangasana | Cobra Pose | Postura de la Cobra | Extensión Espinal |

### Advanced (add 4-5)
| Sanskrit | English | Spanish | Category |
|----------|---------|---------|----------|
| Sirsasana | Headstand | Postura sobre la Cabeza | Inversión |
| Sarvangasana | Shoulderstand | Postura sobre los Hombros | Inversión |
| Urdhva Dhanurasana | Wheel Pose | Postura de la Rueda | Extensión Espinal Profunda |
| Bakasana | Crow Pose | Postura del Cuervo | Equilibrio en Brazos |
| Eka Pada Rajakapotasana | One-Legged King Pigeon | Paloma Real Una Pierna | Apertura de Cadera Profunda |

## New Categories to Add
1. **Descanso y Restauración** (Rest & Restoration)
2. **Movilidad Espinal** (Spinal Mobility)
3. **Meditación y Asiento** (Meditation & Seated)
4. **Torsión Espinal** (Spinal Twist)
5. **Extensión Espinal** (Spinal Extension)
6. **Equilibrio en Brazos** (Arm Balance)
7. **Apertura de Cadera Profunda** (Deep Hip Opening)

## Implementation Steps

1. **Update `src/data/asanaData.ts`** - Add new asana objects to `ASANA_CATALOG` array
2. **Verify image URLs** - Use high-quality Unsplash images matching each pose
3. **Test in CatalogView** - Ensure filtering by difficulty works, categories display correctly
4. **Verify no duplicate IDs** - All IDs must be unique lowercase kebab-case

## Validation
- All 3 difficulty filters show results in CatalogView
- Categories render without errors
- Image URLs load correctly
- Spanish translations are accurate
- Alignment points and benefits are detailed and helpful

## Open Questions
1. **Image sourcing**: Use Unsplash URLs as currently done, or local assets?
2. **Category grouping**: Should we add category-based filtering in UI (future enhancement)?
3. **Advanced asanas**: Some require props/preparation - add contraindications field?