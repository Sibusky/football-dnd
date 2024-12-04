import React from "react";
import { Dnd } from "@/hooks/useDnd";

interface ControlsProps {
  dnd: Dnd;
}

export default function Controls({ dnd }: ControlsProps) {
  function handleReset() {
    dnd.reset();
  }

  return (
    <div>
      <button onClick={handleReset}>Сброс</button>
    </div>
  );
}
