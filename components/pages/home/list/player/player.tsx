"use client";

import React from "react";

import Image from "next/image";
import { useDrag } from "react-dnd";
import { ItemTypes } from "@/types/item-types";
import { Dnd } from "@/hooks/useDnd";
import { RolesRu, RoleType } from "@/constants/players";
import clsx from "clsx";

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
      className={clsx(
        "flex items-center cursor-grab group relative",
        isDragging && "opacity-50",
        isOnField
          ? "cursor-move flex-col gap-0"
          : "flex-row gap-4 border py-2 px-4 bg-slate-100 dark:bg-slate-800 md:gap-3 md:px-3"
      )}
      key={player.id}
      ref={(element: HTMLDivElement | HTMLLIElement | null) => {
        if (element) {
          drag(element);
        }
      }}
    >
      {isOnField && (
        <button
          onClick={handleRemoveFromField}
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        >
          ×
        </button>
      )}
      <Image
        className={clsx(
          "rounded-full",
          isOnField ? "size-8" : "size-12 md:size-10"
        )}
        src={player.avatar}
        alt={player.name}
        width={150}
        height={150}
        priority
      />
      <h3
        className={clsx(
          "flex",
          isOnField
            ? "flex-col text-sm items-center text-center gap-0 text-black dark:text-black font-bold"
            : "gap-2 sm:text-sm md:gap-1"
        )}
      >
        <span className="font-semibold">{player.id}</span>
        <span>{player.name}</span>
        {!isOnField && (
          <span>({RolesRu[player.role as keyof typeof RolesRu]})</span>
        )}
      </h3>
    </Tag>
  );
}
