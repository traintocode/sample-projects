import React from 'react';
import chroma from 'chroma-js';
import styles from './PaletteDisplay.module.css';

interface PaletteDisplayProps {
  baseColor: string;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ baseColor }) => {
  let colors: string[] = [];
  let error: string | null = null;

  try {
    if (!chroma.valid(baseColor)) {
      throw new Error('Invalid base color format.');
    }
    const base = chroma(baseColor);
    const complementary = base.set('hsl.h', '+180');

    colors = [
      base.hex(),
      base.brighten(1).hex(),
      complementary.hex(),
      complementary.brighten(1).hex(),
      complementary.darken(1).hex()
    ];
  } catch (e) {
    console.error('Error generating palette:', e);
    error = e instanceof Error ? e.message : 'Could not generate palette. Please ensure the color hex code is valid (e.g., #RRGGBB).';
    colors = Array(5).fill('#cccccc');
  }

  return (
    <div className={styles.paletteContainer}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <div className={styles.colorGrid}>
        {colors.map((color, index) => (
          <div key={index} className={styles.colorSwatchContainer}>
            <div
              className={styles.colorSwatch}
              style={{ backgroundColor: color }}
            />
            <span className={styles.colorHex}>{color}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;
