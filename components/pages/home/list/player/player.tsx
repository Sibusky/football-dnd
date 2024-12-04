"use client";

import React from "react";

import Image from "next/image";
import { useDrag } from "react-dnd";
import { ItemTypes } from "@/types/item-types";

export interface IPlayer {
  id: number;
  name: string;
  position: {
    x: number | null;
    y: number | null;
  };
}

interface PlayerProps {
  player: IPlayer;
  isOnField?: boolean;
  setPlayersState?: React.Dispatch<React.SetStateAction<IPlayer[]>>;
}

export function Player({ player, isOnField, setPlayersState }: PlayerProps) {
  const Tag = isOnField ? "div" : "li";

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.PLAYER,
      item: player,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  function handleRemoveFromField() {
    if (setPlayersState) {
      const removedPlayer = { ...player, position: { x: null, y: null } };
      setPlayersState((prevPlayersState: IPlayer[]) => [
        ...prevPlayersState.filter((p) => p.id !== player.id),
        removedPlayer,
      ]);
    }
  }

  return (
    <Tag
      className="flex items-center gap-4"
      key={player.id}
      ref={(element: HTMLDivElement | HTMLLIElement | null) => {
        if (element) {
          drag(element);
        }
      }}
    >
      {isOnField && <button onClick={handleRemoveFromField}>R</button>}
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
    </Tag>
  );
}
