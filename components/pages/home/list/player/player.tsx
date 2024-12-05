"use client";

import React from "react";

import Image from "next/image";
import { useDrag } from "react-dnd";
import { ItemTypes } from "@/types/item-types";
import { Dnd } from "@/hooks/useDnd";
import { RolesRu, RoleType } from "@/constants/players";

export interface IPlayer {
  id: number;
  name: string;
  avatar: string;
  position: {
    x: number | null;
    y: number | null;
  };
  role: RoleType;
}

interface PlayerProps {
  player: IPlayer;
  isOnField?: boolean;
  dnd: Dnd;
}

export function Player({ player, isOnField, dnd }: PlayerProps) {
  const Tag = isOnField ? "div" : "li";
  const { removePlayer } = dnd;
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
    removePlayer(player);
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
        src={player.avatar}
        alt={player.name}
        width={150}
        height={150}
        priority
      />
      <h3 className="flex gap-2">
        <span className="font-semibold">{player.id}</span>
        <span>{player.name}</span>
        <span>({RolesRu[player.role as keyof typeof RolesRu]})</span>
      </h3>
    </Tag>
  );
}
