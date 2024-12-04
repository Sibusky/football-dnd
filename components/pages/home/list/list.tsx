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
      <ul className="flex flex-col gap-4">
        {playersWithoutPosition.map((player) => (
          <Player key={player.id} player={player} dnd={dnd} />
        ))}
      </ul>
    </section>
  );
}
