import EditorControl from "./EditorControl";
import type { Control } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface EditorControlGroupProps {
  id: number;
  title: string;
  controls: Control[];
  isOpen: boolean;
  handleOpen: (id: number) => void;
}

const EditorControlGroup = ({
  id,
  title,
  controls,
  isOpen,
  handleOpen,
}: EditorControlGroupProps) => {
  const toggleDropdown = () => handleOpen(id);

  return (
    <div className="relative flex flex-col space-y-1 w-full border-b-[0.5px] border-neutral-300 p-2">
      <div className="flex">
        <button
          onClick={toggleDropdown}
          className="ml-2 transform transition-transform duration-300 ease-in-out mr-2"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button onClick={toggleDropdown} className="text-sm rounded-md text-left text-xs w-full">
          {title}
        </button>
      </div>

      <div
        className={`transform transition-transform duration-300 ease-in-out overflow-hidden w-full border-l-[0.5px] border-neutral-300 pl-1 ${
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
