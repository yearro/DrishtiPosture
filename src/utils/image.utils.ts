/**
 * Helper utility to resolve pose image URLs dynamically via Vite asset imports
 * with fallback to static public directory assets.
 */

// Import all pose images from src/assets/poses dynamically using Vite's glob import
const poseImageModules = import.meta.glob<string>('../assets/poses/*.jpg', {
  eager: true,
  import: 'default',
});

// Mapping from pose IDs, names, or legacy path names to actual filenames in src/assets/poses/
const POSE_FILENAME_MAP: Record<string, string> = {
  vrksasana: 'yoga_vrksasana.jpg',
  'vrksasana.jpg': 'yoga_vrksasana.jpg',
  '/assets/poses/vrksasana.jpg': 'yoga_vrksasana.jpg',

  tadasana: 'yoga_tadasana.jpg',
  'tadasana.jpg': 'yoga_tadasana.jpg',
  '/assets/poses/tadasana.jpg': 'yoga_tadasana.jpg',

  virabhadrasana1: 'yoga_virabhadrasana_I.jpg',
  virabhadrasana_i: 'yoga_virabhadrasana_I.jpg',
  'virabhadrasana1.jpg': 'yoga_virabhadrasana_I.jpg',
  '/assets/poses/virabhadrasana1.jpg': 'yoga_virabhadrasana_I.jpg',

  virabhadrasana2: 'yoga_virabhadrasana_II.jpg',
  virabhadrasana_ii: 'yoga_virabhadrasana_II.jpg',
  'virabhadrasana2.jpg': 'yoga_virabhadrasana_II.jpg',
  '/assets/poses/virabhadrasana2.jpg': 'yoga_virabhadrasana_II.jpg',

  virabhadrasana3: 'yoga_virabhadrasana_III.jpg',
  virabhadrasana_iii: 'yoga_virabhadrasana_III.jpg',
  'virabhadrasana3.jpg': 'yoga_virabhadrasana_III.jpg',
  '/assets/poses/virabhadrasana3.jpg': 'yoga_virabhadrasana_III.jpg',

  'adho-mukha-svanasana': 'yoga_adho_mukha_svanasana.jpg',
  'adho-mukha-svanasana.jpg': 'yoga_adho_mukha_svanasana.jpg',
  '/assets/poses/adho-mukha-svanasana.jpg': 'yoga_adho_mukha_svanasana.jpg',

  trikonasana: 'yoga_utthita_trikonasana.jpg',
  'trikonasana.jpg': 'yoga_utthita_trikonasana.jpg',
  '/assets/poses/trikonasana.jpg': 'yoga_utthita_trikonasana.jpg',

  balasana: 'yoga_balasana.jpg',
  'balasana.jpg': 'yoga_balasana.jpg',
  '/assets/poses/balasana.jpg': 'yoga_balasana.jpg',

  'marjaryasana-bitilasana': 'yoga_marjaryasa_a_bitilasana.jpg',
  'marjaryasana-bitilasana.jpg': 'yoga_marjaryasa_a_bitilasana.jpg',
  '/assets/poses/marjaryasana-bitilasana.jpg': 'yoga_marjaryasa_a_bitilasana.jpg',

  sukhasana: 'yoga_sukhasana.jpg',
  'sukhasana.jpg': 'yoga_sukhasana.jpg',
  '/assets/poses/sukhasana.jpg': 'yoga_sukhasana.jpg',

  uttanasana: 'yoga_uttanasana.jpg',
  'uttanasana.jpg': 'yoga_uttanasana.jpg',
  '/assets/poses/uttanasana.jpg': 'yoga_uttanasana.jpg',

  'setu-bandha-sarvangasana': 'yoga_setu_bandha_darvangasana.jpg',
  'setu-bandha-sarvangasana.jpg': 'yoga_setu_bandha_darvangasana.jpg',
  '/assets/poses/setu-bandha-sarvangasana.jpg': 'yoga_setu_bandha_darvangasana.jpg',

  savasana: 'yoga_savasana.jpg',
  'savasana.jpg': 'yoga_savasana.jpg',
  '/assets/poses/savasana.jpg': 'yoga_savasana.jpg',

  utkatasana: 'yoga_utkatasana.jpg',
  'utkatasana.jpg': 'yoga_utkatasana.jpg',
  '/assets/poses/utkatasana.jpg': 'yoga_utkatasana.jpg',

  parsvakonasana: 'yoga_utthita_parsvakonasana.jpg',
  'parsvakonasana.jpg': 'yoga_utthita_parsvakonasana.jpg',
  '/assets/poses/parsvakonasana.jpg': 'yoga_utthita_parsvakonasana.jpg',

  'prasarita-padottanasana': 'yoga_prasarita_padottanasana.jpg',
  'prasarita-padottanasana.jpg': 'yoga_prasarita_padottanasana.jpg',
  '/assets/poses/prasarita-padottanasana.jpg': 'yoga_prasarita_padottanasana.jpg',

  'ardha-matsyendrasana': 'yoga_ardha_matsyendrasana.jpg',
  'ardha-matsyendrasana.jpg': 'yoga_ardha_matsyendrasana.jpg',
  '/assets/poses/ardha-matsyendrasana.jpg': 'yoga_ardha_matsyendrasana.jpg',

  bhujangasana: 'yoga_bhujangasana.jpg',
  'bhujangasana.jpg': 'yoga_bhujangasana.jpg',
  '/assets/poses/bhujangasana.jpg': 'yoga_bhujangasana.jpg',

  sirsasana: 'yoga_sirsasana.jpg',
  'sirsasana.jpg': 'yoga_sirsasana.jpg',
  '/assets/poses/sirsasana.jpg': 'yoga_sirsasana.jpg',

  sarvangasana: 'yoga_sarvangasana.jpg',
  'sarvangasana.jpg': 'yoga_sarvangasana.jpg',
  '/assets/poses/sarvangasana.jpg': 'yoga_sarvangasana.jpg',

  'urdhva-dhanurasana': 'yoga_urdhva_dhanurasana.jpg',
  'urdhva-dhanurasana.jpg': 'yoga_urdhva_dhanurasana.jpg',
  '/assets/poses/urdhva-dhanurasana.jpg': 'yoga_urdhva_dhanurasana.jpg',

  'eka-pada-rajakapotasana': 'yoga_eka_pada_rajakapotasana.jpg',
  'eka-pada-rajakapotasana.jpg': 'yoga_eka_pada_rajakapotasana.jpg',
  '/assets/poses/eka-pada-rajakapotasana.jpg': 'yoga_eka_pada_rajakapotasana.jpg',
};

/**
 * Resolves an asana image URL properly for Vite dev/build.
 */
export function getAsanaImageUrl(rawImage?: string, asanaId?: string): string {
  if (!rawImage && !asanaId) return '';

  if (rawImage?.startsWith('http://') || rawImage?.startsWith('https://')) {
    return rawImage;
  }

  // Check lookup table first
  const inputKey = (rawImage || '').toLowerCase();
  const idKey = (asanaId || '').toLowerCase();

  const resolvedFilename =
    POSE_FILENAME_MAP[inputKey] ||
    POSE_FILENAME_MAP[rawImage || ''] ||
    POSE_FILENAME_MAP[idKey] ||
    (rawImage?.startsWith('/') ? rawImage.split('/').pop() : rawImage) ||
    '';

  // Attempt to resolve via Vite glob import
  const moduleKey = `../assets/poses/${resolvedFilename}`;
  if (poseImageModules[moduleKey]) {
    return poseImageModules[moduleKey];
  }

  // Case-insensitive match in poseImageModules
  const matchingKey = Object.keys(poseImageModules).find((k) =>
    k.toLowerCase().endsWith(`/${resolvedFilename.toLowerCase()}`)
  );
  if (matchingKey && poseImageModules[matchingKey]) {
    return poseImageModules[matchingKey];
  }

  // Fallback to static public path
  return `/assets/poses/${resolvedFilename}`;
}
