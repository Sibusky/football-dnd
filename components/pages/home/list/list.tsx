import Image from "next/image";
import React from "react";

interface ListProps {
  className?: string;
}

const players = [
  { id: 1, name: "Иван Андреев" },
  { id: 2, name: "Петр Петров" },
  { id: 3, name: "Сидор Сидоров" },
];

export default function List({ className }: ListProps) {
  return (
    <section className={className}>
      <ul className="flex flex-col gap-4">
        {players.map((player) => (
          <li className="flex items-center gap-4" key={player.id}>
            <Image
              className="size-12 rounded-full"
              src={`/pages/home/avatars/${player.id}.jpg`}
              alt={player.name}
              width={4615}
              height={5336}
              priority
            />
            <h3 className="flex gap-2">
              <span className="font-semibold">{player.id}</span>
              <span>{player.name}</span>
            </h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
