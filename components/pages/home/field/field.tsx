import Image from "next/image";
import React from "react";
import Square from "./square";
import { FIELD_WIDTH, TOTAL_SQUARES } from "@/constants/field";
import { Dnd } from "@/hooks/useDnd";
import { Player } from "../list/player";

interface FieldProps {
  dnd: Dnd;
  className?: string;
}

const RenderCounter = () => {
  console.count("Field rendered");
  return null;
};

export default function Field({ dnd, className }: FieldProps) {
  const { players } = dnd;

  function renderSquare(i: number) {
    const x = i % FIELD_WIDTH;
    const y = Math.floor(i / FIELD_WIDTH);
    const currentPlayer = players.find(
      (player) => player.position.x === x && player.position.y === y
    );

    return (
      <Square key={i} x={x} y={y} dnd={dnd}>
        {currentPlayer && (
          <Player player={currentPlayer} isOnField={true} dnd={dnd} />
        )}
      </Square>
    );
  }

  const squares = [];
  for (let i = 0; i < TOTAL_SQUARES; i += 1) {
    squares.push(renderSquare(i));
  }

  return (
    <>
      {<RenderCounter />}
      <section className={className}>
        <Image
          className="w-full"
          src="/pages/home/field.svg"
          alt="Футбольное поле"
          width={452}
          height={684}
          priority
        />
        <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[93%] flex flex-wrap">
          {squares}
        </ul>
      </section>
    </>
  );
}
