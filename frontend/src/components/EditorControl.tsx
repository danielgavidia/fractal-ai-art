import { hslToRgb } from "@/utils/colorUtils";
import { useEffect, useState } from "react";
import type { Control } from "../types/types";

interface EditorControlProps {
  control: Control;
}

const EditorControl = ({ control }: EditorControlProps) => {
  const { title, handler, min, max, defaultValue, colorEditor } = control;
  const [value, setValue] = useState<number>(defaultValue);

  useEffect(() => {
    handler(value);
  }, [value]);

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(parseInt(e.target.value));
  }

  // If color boolean is present
  const { r, g, b } = hslToRgb(value, 100, 50);
  const rgb = `rgb(${r}, ${g}, ${b})`;

  return (
    <div className="flex space-x-2 text-xs p-1 items-center">
      <span className="w-40">{title}</span>
      {colorEditor ? (
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleValueChange}
          style={{
            background: rgb,
          }}
        />
      ) : (
        <input type="range" min={min} max={max} value={value} onChange={handleValueChange} />
      )}

      <div className="w-10 bg-stone-200 text-center border-[0.5px] border-neutral-400 text-xs">
        {colorEditor ? <div className="p-2" style={{ background: rgb }}></div> : <div>{value}</div>}
      </div>
    </div>
  );
};

export default EditorControl;
