import EditorControlGroup from "./EditorControlGroup";
import type { Control } from "../types/types";
import { useState } from "react";

type ControlGroup = {
  id: number;
  title: string;
  controls: Control[];
  isOpen: boolean;
};

interface EditorControlDashboardProps {
  controlGroups: ControlGroup[];
}

const EditorControlDashboard = ({ controlGroups }: EditorControlDashboardProps) => {
  const [controlGroupState, setControlGroupState] = useState<ControlGroup[]>(controlGroups);
  function handleOpen(id: number) {
    const newGroups = controlGroupState.map((group) => {
      if (group.id === id) {
        return { ...group, isOpen: !group.isOpen };
      } else {
        return { ...group, isOpen: false };
      }
    });
    setControlGroupState(newGroups);
  }
  return (
    <div className="flex flex-col space-y-1 min-h-64">
      {controlGroupState.map((controlGroup, key) => (
        <EditorControlGroup
          key={key}
          id={key}
          title={controlGroup.title}
          controls={controlGroup.controls}
          isOpen={controlGroup.isOpen}
          handleOpen={handleOpen}
        />
      ))}
    </div>
  );
};

export default EditorControlDashboard;
