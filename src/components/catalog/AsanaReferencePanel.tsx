import { useState } from 'react';
import type { IAsana } from '../../types/domain.types';
import styles from './AsanaReferencePanel.module.css';

export interface AsanaReferencePanelProps {
  asana: IAsana | null;
}

const difficultyBadgeClass: Record<string, string> = {
  beginner: styles.badgeBeginner,
  intermediate: styles.badgeIntermediate,
  advanced: styles.badgeAdvanced,
};

const difficultyLabels: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

export function AsanaReferencePanel({ asana }: AsanaReferencePanelProps) {
  const [imageError, setImageError] = useState(false);

  if (!asana) {
    return (
      <div className={styles.empty}>
        <svg
          className={styles.emptyIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <p className={styles.emptyText}>
          Selecciona una asana del catálogo para comenzar
        </p>
      </div>
    );
  }

  const nameEs =
    asana.nameEs ||
    (asana as unknown as Record<string, string>).spanishName ||
    asana.id;
  const nameSanskrit =
    asana.nameSanskrit ||
    (asana as unknown as Record<string, string>).sanskritName ||
    '';
  const nameEn =
    asana.nameEn ||
    (asana as unknown as Record<string, string>).englishName ||
    '';
  const rawImage =
    asana.referenceImageUrl ||
    (asana as unknown as Record<string, string>).imageUrl ||
    '';
  const imageSrc =
    rawImage.startsWith('/') || rawImage.startsWith('http')
      ? rawImage
      : `/assets/poses/${rawImage}`;

  const bodyZones = asana.bodyZones || [];
  const jointRules = asana.jointRules || [];

  return (
    <div className={styles.panel}>
      {/* Reference image */}
      <div className={styles.imageContainer}>
        {!imageError && imageSrc ? (
          <img
            src={imageSrc}
            alt={nameEs}
            loading="lazy"
            width={640}
            height={360}
            onError={() => setImageError(true)}
            className={styles.image}
          />
        ) : (
          <div className={styles.imageFallback}>
            <svg
              width={40}
              height={40}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{nameEs}</span>
          </div>
        )}

        <div className={styles.badgeWrapper}>
          <span
            className={[
              styles.badge,
              difficultyBadgeClass[asana.difficulty] ?? '',
            ].join(' ')}
          >
            {difficultyLabels[asana.difficulty] ?? asana.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.nameBlock}>
          <h2 className={styles.name}>{nameEs}</h2>
          {(nameSanskrit || nameEn) && (
            <p className={styles.subtitle}>
              {nameSanskrit}
              {nameEn ? ` (${nameEn})` : ''}
            </p>
          )}
        </div>

        {asana.description && (
          <p className={styles.description}>{asana.description}</p>
        )}

        {bodyZones.length > 0 && (
          <div className={styles.zones}>
            {bodyZones.map((zone) => (
              <span key={zone} className={styles.zoneTag}>
                {zone}
              </span>
            ))}
          </div>
        )}

        {jointRules.length > 0 && (
          <div className={styles.jointSection}>
            <h3 className={styles.jointTitle}>
              Articulaciones a evaluar ({jointRules.length})
            </h3>
            <ul className={styles.jointList}>
              {jointRules.map((rule, idx) => (
                <li key={idx} className={styles.jointItem}>
                  <span className={styles.jointName}>{rule.jointName}</span>
                  <span className={styles.jointRange}>
                    {rule.idealAngleMin}° – {rule.idealAngleMax}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
