import React, { useMemo } from "react";
import { Player } from "./player";

import { Dnd } from "@/hooks/useDnd";

interface ListProps {
  dnd: Dnd;
  className?: string;
}

export default function List({ dnd, className }: ListProps) {
  const { players } = dnd;

  const playersWithoutPosition = useMemo(
    () =>
      players.filter(
        (player) => player.position.x === null && player.position.y === null
      ),
    [players]
  );

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold sm:text-xl">Список игроков:</h2>
      <ul className="flex flex-col gap-1 w-4/5 lg:w-full h-[80vh] overflow-y-hidden hover:overflow-y-auto overflow-x-hidden">
        {playersWithoutPosition.map((player) => (
          <Player key={player.id} player={player} dnd={dnd} />
        ))}
      </ul>
    </section>
  );
}
