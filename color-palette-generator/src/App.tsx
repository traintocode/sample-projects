import { useState } from 'react';
import styles from './App.module.css';
import ColorInput from './components/ColorInput.tsx';
import PaletteDisplay from './components/PaletteDisplay';

function App() {
  const [baseColor, setBaseColor] = useState<string>('#1a1a1a');

  const handleColorChange = (color: string) => {
    setBaseColor(color);
    console.log('Selected base color:', color);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Color Palette Generator</h1>
      </header>
      <main className={styles.mainContent}>
        <section className={styles.colorInputSection}>
          <h2>Select a Base Color</h2>
          <ColorInput onColorChange={handleColorChange} initialColor={baseColor} />
        </section>
        <section className={styles.paletteDisplaySection}>
          <h2>Generated Palette</h2>
          <PaletteDisplay baseColor={baseColor} />
        </section>
      </main>
    </div>
  );
}

export default App;
