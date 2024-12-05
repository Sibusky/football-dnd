import React, { useEffect, useState } from "react";
import { Dnd } from "@/hooks/useDnd";
import { RoleType } from "@/constants/players";
import {
  positionsFourFiveOne,
  positionsFourFourTwo,
  positionsFourFourTwoRhombus,
  positionsFourThreeThree,
} from "@/constants/positions";
import Button from "@/components/shared/button";

interface ControlsProps {
  dnd: Dnd;
  className?: string;
}

export default function Controls({ dnd, className }: ControlsProps) {
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
    <div className={className}>
      <div className="flex flex-col gap-2 w-[200px] lg:flex-row lg:w-full lg:justify-center lg:gap-4 sm:flex-col sm:w-[200px] sm:gap-2">
        <Button onClick={handleReset}>Сброс</Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleSetScheme(positionsFourFourTwo)}
        >
          4-4-2
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleSetScheme(positionsFourFourTwoRhombus)}
        >
          4-4-2 ромб
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleSetScheme(positionsFourThreeThree)}
        >
          4-3-3
        </Button>
        <Button
          disabled={isDisabled}
          onClick={() => handleSetScheme(positionsFourFiveOne)}
        >
          4-5-1
        </Button>
      </div>
      <span>Игроков на поле: {dnd.getPlayersOnFieldCount()}</span>
    </div>
  );
}
