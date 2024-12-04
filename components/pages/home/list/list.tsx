import React, { useMemo } from "react";
import { Player, IPlayer } from "./player";

interface ListProps {
  players: IPlayer[];
  className?: string;
}

export default function List({ players, className }: ListProps) {
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
          <Player key={player.id} player={player} />
        ))}
      </ul>
    </section>
  );
}
