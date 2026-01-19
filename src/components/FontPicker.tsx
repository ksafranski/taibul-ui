"use client";


import { useFont } from './FontProvider';
import { Select } from './Select';

export const FontPicker = () => {
  const { headingFont, setHeadingFont, bodyFont, setBodyFont, availableFonts } = useFont();

  const fontOptions = availableFonts.map(font => ({
    label: font.name,
    value: font.value
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Select
        label="Heading Font"
        value={headingFont}
        onChange={(e) => setHeadingFont(e.target.value)}
        options={fontOptions}
        style={{ fontFamily: headingFont }}
      />

      <Select
        label="Body Font"
        value={bodyFont}
        onChange={(e) => setBodyFont(e.target.value)}
        options={fontOptions}
        style={{ fontFamily: bodyFont }}
      />
    </div>
  );
};
