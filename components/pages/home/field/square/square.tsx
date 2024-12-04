import { FIELD_WIDTH } from "@/constants/field";
import { FIELD_LENGTH } from "@/constants/field";
import { ItemTypes } from "@/types/item-types";
import React from "react";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import { IPlayer, Player } from "../../list/player";

interface SquareProps {
  player: IPlayer | null;
  x: number;
  y: number;
  onPlayerDrop: (player: IPlayer, x: number, y: number) => void;
  handleCanDrop: (x: number, y: number) => boolean;
  setPlayersState?: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}

export default function Square({
  player,
  x,
  y,
  onPlayerDrop,
  handleCanDrop,
  setPlayersState,
}: SquareProps) {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PLAYER,
      canDrop: () => {
        return handleCanDrop(x, y);
      },
      drop: (draggedPlayer: IPlayer) => {
        onPlayerDrop(draggedPlayer, x, y);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [onPlayerDrop, x, y]
  );

  return (
    <li
      className={clsx("border", isOver && "bg-red-500")}
      ref={drop as unknown as React.LegacyRef<HTMLLIElement>}
      style={{
        width: `calc(100%/${FIELD_WIDTH})`,
        height: `calc(100%/${FIELD_LENGTH})`,
      }}
    >
      {player && (
        <Player
          player={player}
          isOnField={true}
          setPlayersState={setPlayersState}
        />
      )}
    </li>
  );
}
