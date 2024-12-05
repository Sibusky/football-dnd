import { FIELD_WIDTH } from "@/constants/field";
import { FIELD_LENGTH } from "@/constants/field";
import { ItemTypes } from "@/types/item-types";
import React from "react";
import { useDrop } from "react-dnd";
import clsx from "clsx";
import { IPlayer } from "../../list/player";
import { Dnd } from "@/hooks/useDnd";

interface SquareProps {
  x: number;
  y: number;
  dnd: Dnd;
  children?: React.ReactNode;
}

const squareStyle = {
  width: `calc(100%/${FIELD_WIDTH})`,
  height: `calc(100%/${FIELD_LENGTH})`,
};

export default function Square({ x, y, dnd, children }: SquareProps) {
  const { movePlayer, canMovePlayer } = dnd;

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ItemTypes.PLAYER,
      canDrop: () => {
        return canMovePlayer(x, y);
      },
      drop: (draggedPlayer: IPlayer) => {
        movePlayer(draggedPlayer, x, y);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [movePlayer, canMovePlayer, x, y]
  );

  return (
    <li
      className={clsx(
        "transition duration-300 ease-in-out",
        isOver && canDrop
          ? "bg-blue-500 border-2 border-dashed border-blue-700 scale-105 opacity-40"
          : isOver && !canDrop
          ? "bg-red-500 opacity-40"
          : "bg-transparent"
      )}
      ref={drop as unknown as React.LegacyRef<HTMLLIElement>}
      style={squareStyle}
    >
      {children}
    </li>
  );
}
