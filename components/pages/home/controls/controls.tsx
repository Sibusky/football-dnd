import React from "react";
import { Dnd } from "@/hooks/useDnd";

interface ControlsProps {
  dnd: Dnd;
}

export default function Controls({ dnd }: ControlsProps) {
  function handleReset() {
    dnd.reset();
  }

  function handleSetSchemeOne() {
    dnd.setSchemeOne();
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleReset}>Сброс</button>
      <button onClick={handleSetSchemeOne}>4-4-2</button>
      <span>Количество игроков на поле: {dnd.getPlayersOnFieldCount()}</span>
    </div>
  );
}
