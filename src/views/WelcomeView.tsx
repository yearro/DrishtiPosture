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
          alt="Serene yoga studio background"
          className="hero-bg-image"
        />
        <div className="hero-bg-gradient" />
      </div>

      <div className="hero-content">
        <span className="hero-pill-badge">Trusted Tranquility in Motion</span>

        <h1 className="hero-title">Master Your Practice with Drishti</h1>

        <p className="hero-subtitle">
          Experience the perfect harmony of ancient wisdom and modern precision. Real-time AI posture analysis designed to elevate your yoga journey with clarity and peace.
        </p>

        <button
          type="button"
          className="hero-cta-button"
          onClick={() => setView('catalog')}
        >
          <span>Start Your Scan</span>
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
          alt="Yoga pose analysis with real-time AI skeleton tracking"
          className="about-visual-image"
        />
        <div className="about-floating-badge">
          <div className="badge-status-dot" />
          <div>
            <div className="badge-label">Alignment Confidence</div>
            <div className="badge-value">98% Optimal</div>
          </div>
        </div>
      </div>

      <div className="about-text-container">
        <div className="section-eyebrow">
          <div className="section-eyebrow-line" />
          <span>WHAT IS DRISHTIPOSTURE?</span>
        </div>

        <h2 className="about-heading">
          AI-Powered Correction, Rooted in Mindfulness.
        </h2>

        <p className="about-description">
          DrishtiPosture acts as your personal, invisible guide. Utilizing advanced computer vision, it gently analyzes your asanas in real-time, offering technical accuracy without disrupting the meditative flow of your practice.
        </p>

        <p className="about-description">
          We believe that true alignment is both physical and mental. Our technology is designed to fade into the background, providing insights only when necessary to prevent injury and deepen your stretch.
        </p>

        <div className="about-feature-cards">
          <FeaturePill icon="visibility" text="Real-Time Feedback" />
          <FeaturePill icon="schedule" text="Session History Tracking" />
        </div>
      </div>
    </section>
  );
}

function WellnessSection() {
  return (
    <section className="wellness-section">
      <div className="wellness-header">
        <h2 className="wellness-title">The Dual Path to Wellness</h2>
        <p className="wellness-subtitle">
          Yoga is a discipline of holistic health. DrishtiPosture ensures you maximize both the physical resilience and mental clarity that the practice offers.
        </p>
      </div>

      <div className="wellness-cards-grid">
        <WellnessCard
          icon="spa"
          title="Mental Tranquility"
          body="Reduce stress and anxiety through mindful movement. Our non-intrusive feedback allows you to stay present in every breath."
        />
        <WellnessCard
          icon="fitness_center"
          title="Physical Resilience"
          body="Build core strength and flexibility. Correct alignment ensures you are engaging the right muscle groups without strain."
        />
        <WellnessCard
          icon="health_and_safety"
          title="Injury Prevention"
          body="Micro-adjustments matter. Prevent long-term joint wear and tear by perfecting your foundational poses early on."
        />
      </div>
    </section>
  );
}

function ScienceSection() {
  const barsData = [
    { label: 'Wk 1', heightPercent: 40, color: '#c7daec' },
    { label: 'Wk 2', heightPercent: 55, color: '#b2ccdb' },
    { label: 'Wk 3', heightPercent: 68, color: '#a1bdbe' },
    { label: 'Wk 4', heightPercent: 82, color: '#82a393' },
    { label: 'Wk 5', heightPercent: 95, color: '#4d6054' }
  ];

  return (
    <section className="science-section">
      <div className="science-watermark">PRECISION</div>

      <div className="science-left-col">
        <h2 className="science-title">The Science of Precision Alignment</h2>

        <p className="science-paragraph">
          Why does exact posture matter? Even a slight deviation in a downward dog can shift load from your muscles to your vulnerable joints. DrishtiPosture's proprietary spatial mapping identifies structural imbalances in milliseconds.
        </p>

        <div className="trend-chart-card">
          <div className="chart-header">
            <span className="chart-title">Posture Improvement Trend</span>
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
            alt="3D skeleton spatial mapping mesh preview"
          />
        </div>
        <div className="science-image-card">
          <img
            src="https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=600&q=80"
            alt="Overhead yoga mat view with ring alignment overlay"
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
        <h2 className="cta-title">Ready to elevate your flow?</h2>

        <p className="cta-subtitle">
          Join thousands of practitioners who have refined their technique and deepened their meditation with DrishtiPosture.
        </p>

        <button
          type="button"
          className="cta-button"
          onClick={() => setView('catalog')}
        >
          Explore The App
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
