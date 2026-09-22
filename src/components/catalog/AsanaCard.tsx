import React, { useState } from 'react';
import type { IAsana } from '../../types/domain.types';
import { getAsanaImageUrl } from '../../utils/image.utils';
import styles from './AsanaCard.module.css';

export interface AsanaCardProps {
  asana: IAsana;
  isSelected: boolean;
  onSelect: (id: string) => void;
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

export function AsanaCard({ asana, isSelected, onSelect }: AsanaCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    onSelect(asana.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(asana.id);
    }
  };

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
  const imageSrc = getAsanaImageUrl(rawImage, asana.id);

  const bodyZones = asana.bodyZones || [];

  const cardClassName = [styles.card, isSelected ? styles.cardSelected : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="option"
      aria-selected={isSelected}
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cardClassName}
    >
      <div className={styles.imageContainer}>
        {!imageError && imageSrc ? (
          <img
            src={imageSrc}
            alt={nameEs}
            loading="lazy"
            width={480}
            height={480}
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

        <div className={styles.badgeContainer}>
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

      <div className={styles.body}>
        <h3 className={styles.name}>{nameEs}</h3>
        {(nameSanskrit || nameEn) && (
          <p className={styles.subtitle}>
            {nameSanskrit}
            {nameEn ? ` (${nameEn})` : ''}
          </p>
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
      </div>
    </div>
  );
}
