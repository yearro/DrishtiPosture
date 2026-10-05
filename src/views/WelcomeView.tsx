import { useAppContext } from '../context/AppContext';
import './WelcomeView.css';

export interface WelcomeViewProps {
  readonly className?: string;
}

interface FeaturePillProps {
  readonly icon: string;
  readonly text: string;
}

function FeaturePill({ icon, text }: FeaturePillProps) {
  return (
    <div className="feature-pill-card">
      <span className="material-symbols-outlined feature-pill-icon">{icon}</span>
      <span className="feature-pill-text">{text}</span>
    </div>
  );
}

interface WellnessCardProps {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}

function WellnessCard({ icon, title, body }: WellnessCardProps) {
  return (
    <article className="wellness-card">
      <div className="wellness-card-accent-shape" aria-hidden="true" />
      <span className="material-symbols-outlined wellness-card-icon">{icon}</span>
      <h3 className="wellness-card-title">{title}</h3>
      <p className="wellness-card-body">{body}</p>
    </article>
  );
}

interface ChartBarProps {
  readonly label: string;
  readonly heightPercent: number;
  readonly color: string;
}

function ChartBar({ label, heightPercent, color }: ChartBarProps) {
  return (
    <div className="chart-bar-col">
      <div
        className="chart-bar-fill"
        style={{ height: `${heightPercent}%`, backgroundColor: color }}
      />
      <span className="chart-bar-label">{label}</span>
    </div>
  );
}

function HeroSection() {
  const { setView } = useAppContext();

  return (
    <section className="hero-section">
      <div className="hero-bg-layer">
        <img
          src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1600&q=80"
          alt="Fondo de estudio de yoga sereno"
          className="hero-bg-image"
        />
        <div className="hero-bg-gradient" />
      </div>

      <div className="hero-content">
        <span className="hero-pill-badge">Tranquilidad Confiable en Movimiento</span>

        <h1 className="hero-title">Domina tu Práctica con Drishti</h1>

        <p className="hero-subtitle">
          Experimenta la armonía perfecta entre la sabiduría ancestral y la precisión moderna. Análisis postural con IA en tiempo real diseñado para elevar tu camino del yoga con claridad y paz.
        </p>

        <button
          type="button"
          className="hero-cta-button"
          onClick={() => setView('catalog')}
        >
          <span>Comenzar tu Análisis</span>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-visual-container">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=80"
          alt="Análisis de postura de yoga con seguimiento de esqueleto en tiempo real mediante IA"
          className="about-visual-image"
        />
        <div className="about-floating-badge">
          <div className="badge-status-dot" />
          <div>
            <div className="badge-label">Confianza de Alineación</div>
            <div className="badge-value">98% Óptimo</div>
          </div>
        </div>
      </div>

      <div className="about-text-container">
        <div className="section-eyebrow">
          <div className="section-eyebrow-line" />
          <span>¿QUÉ ES DRISHTIPOSTURE?</span>
        </div>

        <h2 className="about-heading">
          Corrección con IA, Arraigada en la Conciencia Plena.
        </h2>

        <p className="about-description">
          DrishtiPosture actúa como tu guía personal e invisible. Utilizando visión artificial avanzada, analiza suavemente tus asanas en tiempo real, ofreciendo precisión técnica sin interrumpir el flujo meditativo de tu práctica.
        </p>

        <p className="about-description">
          Creemos que la verdadera alineación es tanto física como mental. Nuestra tecnología está diseñada para integrarse en el trasfondo, proporcionando indicaciones solo cuando es necesario para prevenir lesiones y profundizar tu estiramiento.
        </p>

        <div className="about-feature-cards">
          <FeaturePill icon="visibility" text="Retroalimentación en Tiempo Real" />
          <FeaturePill icon="schedule" text="Seguimiento de Sesiones" />
        </div>
      </div>
    </section>
  );
}

function WellnessSection() {
  return (
    <section className="wellness-section">
      <div className="wellness-header">
        <h2 className="wellness-title">El Doble Camino hacia el Bienestar</h2>
        <p className="wellness-subtitle">
          El yoga es una disciplina de salud integral. DrishtiPosture te asegura maximizar tanto la resistencia física como la claridad mental que la práctica ofrece.
        </p>
      </div>

      <div className="wellness-cards-grid">
        <WellnessCard
          icon="spa"
          title="Tranquilidad Mental"
          body="Reduce el estrés y la ansiedad a través del movimiento consciente. Nuestra retroalimentación no intrusiva te permite estar presente en cada respiración."
        />
        <WellnessCard
          icon="fitness_center"
          title="Resistencia Física"
          body="Fortalece tu core y flexibilidad. La alineación correcta asegura que actives los grupos musculares adecuados sin esfuerzo excesivo."
        />
        <WellnessCard
          icon="health_and_safety"
          title="Prevención de Lesiones"
          body="Los microajustes importan. Previene el desgaste articular a largo plazo perfeccionando tus posturas fundamentales desde el inicio."
        />
      </div>
    </section>
  );
}

function ScienceSection() {
  const barsData = [
    { label: 'Sem 1', heightPercent: 40, color: '#c7daec' },
    { label: 'Sem 2', heightPercent: 55, color: '#b2ccdb' },
    { label: 'Sem 3', heightPercent: 68, color: '#a1bdbe' },
    { label: 'Sem 4', heightPercent: 82, color: '#82a393' },
    { label: 'Sem 5', heightPercent: 95, color: '#4d6054' }
  ];

  return (
    <section className="science-section">
      <div className="science-watermark">PRECISIÓN</div>

      <div className="science-left-col">
        <h2 className="science-title">La Ciencia de la Alineación Precisa</h2>

        <p className="science-paragraph">
          ¿Por qué importa la postura exacta? Incluso una ligera desviación en un perro boca abajo puede desplazar la carga de tus músculos a tus articulaciones vulnerables. El mapeo espacial propietario de DrishtiPosture identifica desequilibrios estructurales en milisegundos.
        </p>

        <div className="trend-chart-card">
          <div className="chart-header">
            <span className="chart-title">Tendencia de Mejora Postural</span>
            <span className="chart-badge">- 24%</span>
          </div>
          <div className="chart-bars-container">
            {barsData.map((bar) => (
              <ChartBar
                key={bar.label}
                label={bar.label}
                heightPercent={bar.heightPercent}
                color={bar.color}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="science-right-col">
        <div className="science-image-card">
          <img
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80"
            alt="Vista previa de malla de mapeo espacial de esqueleto 3D"
          />
        </div>
        <div className="science-image-card">
          <img
            src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80"
            alt="Vista superior de esterilla de yoga con superposición de alineación circular"
          />
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const { setView } = useAppContext();

  return (
    <section className="cta-section">
      <div className="cta-container">
        <h2 className="cta-title">¿Listo para elevar tu flujo?</h2>

        <p className="cta-subtitle">
          Únete a miles de practicantes que han refinado su técnica y profundizado su meditación con DrishtiPosture.
        </p>

        <button
          type="button"
          className="cta-button"
          onClick={() => setView('catalog')}
        >
          Explorar la App
        </button>
      </div>
    </section>
  );
}

export function WelcomeView({ className }: WelcomeViewProps) {
  return (
    <main className={`welcome-view ${className ?? ''}`}>
      <HeroSection />
      <AboutSection />
      <WellnessSection />
      <ScienceSection />
      <CtaSection />
    </main>
  );
}

export default WelcomeView;
