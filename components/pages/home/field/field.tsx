import Image from "next/image";
import React from "react";
import Square from "./square";
import { FIELD_WIDTH, TOTAL_SQUARES } from "@/constants/field";
import { IPlayer } from "../list/player";

interface FieldProps {
  players: IPlayer[];
  setPlayersState: React.Dispatch<React.SetStateAction<IPlayer[]>>;
  className?: string;
}

export default function Field({
  className,
  players,
  setPlayersState,
}: FieldProps) {
  function handlePlayerDrop(player: IPlayer, x: number, y: number) {
    const updatedPlayers = players.map((p) =>
      p.id === player.id ? { ...p, position: { x, y } } : p
    );
    setPlayersState(updatedPlayers);
  }

  function handleCanDrop(x: number, y: number) {
    return !players.some(
      (player) => player.position.x === x && player.position.y === y
    );
  }

  function renderSquare(i: number) {
    const x = i % FIELD_WIDTH;
    const y = Math.floor(i / FIELD_WIDTH);
    const currentPlayer = players.find(
      (player) => player.position.x === x && player.position.y === y
    );

    return (
      <Square
        key={i}
        player={currentPlayer || null}
        x={x}
        y={y}
        onPlayerDrop={handlePlayerDrop}
        handleCanDrop={handleCanDrop}
        setPlayersState={setPlayersState}
      />
    );
  }

  const squares = [];
  for (let i = 0; i < TOTAL_SQUARES; i += 1) {
    squares.push(renderSquare(i));
  }

  return (
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
  );
}
