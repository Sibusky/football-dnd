import React, { useEffect, useState } from "react";
import { Dnd } from "@/hooks/useDnd";
import { RoleType } from "@/constants/players";
import {
  positionsFourFiveOne,
  positionsFourFourTwo,
  positionsFourFourTwoRhombus,
  positionsFourThreeThree,
} from "@/constants/positions";

interface ControlsProps {
  dnd: Dnd;
}

export default function Controls({ dnd }: ControlsProps) {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const playersOnFieldCount = dnd.getPlayersOnFieldCount();

  useEffect(() => {
    if (playersOnFieldCount > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [playersOnFieldCount]);

  function handleReset() {
    dnd.reset();
    setIsDisabled(false);
  }

  function handleSetScheme(
    scheme: Record<RoleType, { x: number; y: number }[]>
  ) {
    handleReset();
    dnd.setScheme(scheme);
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleReset}>Сброс</button>
      <button
        disabled={isDisabled}
        onClick={() => handleSetScheme(positionsFourFourTwo)}
      >
        4-4-2
      </button>
      <button
        disabled={isDisabled}
        onClick={() => handleSetScheme(positionsFourFourTwoRhombus)}
      >
        4-4-2 ромб
      </button>
      <button
        disabled={isDisabled}
        onClick={() => handleSetScheme(positionsFourThreeThree)}
      >
        4-3-3
      </button>
      <button
        disabled={isDisabled}
        onClick={() => handleSetScheme(positionsFourFiveOne)}
      >
        4-5-1
      </button>
      <span>Количество игроков на поле: {dnd.getPlayersOnFieldCount()}</span>
    </div>
  );
}
