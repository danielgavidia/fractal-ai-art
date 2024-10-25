import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import EditorControl from "./EditorControl";
import type { Control } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownLong } from "@fortawesome/free-solid-svg-icons";

interface EditorControlGroupProps {
  title: string;
  controls: Control[];
}

const EditorControlGroup = ({ title, controls }: EditorControlGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative flex flex-col space-y-2 w-full">
      <div className="flex">
        <button onClick={toggleDropdown} className="text-sm rounded-md text-left text-xs w-full">
          {title}
        </button>
        <button onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faArrowDownLong} />
        </button>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden w-full border-l-[0.5px] border-neutral-300 pl-1 ${
          isOpen ? "opacity-100 translate-y-0 max-h-screen" : "opacity-0 -translate-y-4 max-h-0"
        }`}
      >
        {controls.map((control, key) => (
          <EditorControl key={key} control={control} />
        ))}
      </div>
    </div>
  );
};

export default EditorControlGroup;
