import { useState } from 'react';
import styles from './ColorInput.module.css';

interface ColorInputProps {
  onColorChange: (color: string) => void;
  initialColor?: string;
}

const ColorInput: React.FC<ColorInputProps> = ({ onColorChange, initialColor = '#000000' }) => {
  const [hexColor, setHexColor] = useState<string>(initialColor);

  const handleHexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = event.target.value;
    setHexColor(newHex);
    if (/^#[0-9A-Fa-f]{6}$/i.test(newHex) || /^#[0-9A-Fa-f]{3}$/i.test(newHex)) {
      onColorChange(newHex);
    }
  };

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setHexColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className={styles.colorInputContainer}>
      <div className={styles.inputGroup}>
        <label htmlFor="colorPicker" className={styles.label}>Select Color:</label>
        <input
          type="color"
          id="colorPicker"
          value={hexColor}
          onChange={handleColorPickerChange}
          className={styles.colorPicker}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="hexInput" className={styles.label}>Hex Code:</label>
        <input
          type="text"
          id="hexInput"
          value={hexColor}
          onChange={handleHexChange}
          placeholder="#000000"
          className={styles.hexInput}
        />
      </div>
    </div>
  );
};

export default ColorInput;
