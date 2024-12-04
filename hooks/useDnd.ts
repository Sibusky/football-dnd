import { useCallback, useState } from "react";
import { initialPlayers } from "@/constants/players";
import { IPlayer } from "@/components/pages/home/list/player";

export interface Dnd {
  players: IPlayer[];
  movePlayer: (player: IPlayer, x: number, y: number) => void;
  canMovePlayer: (toX: number, toY: number) => boolean;
  removePlayer: (player: IPlayer) => void;
  reset: () => void;
}

export function useDnd(): Dnd {
  const [players, setPlayers] = useState<IPlayer[]>(initialPlayers);

  const movePlayer = useCallback(
    (player: IPlayer, toX: number, toY: number) => {
      const updatedPlayers = players.map((p) =>
        p.id === player.id ? { ...p, position: { x: toX, y: toY } } : p
      );
      setPlayers(updatedPlayers);
    },
    [players]
  );

  const canMovePlayer = useCallback(
    (toX: number, toY: number) => {
      return !players.some((p) => p.position.x === toX && p.position.y === toY);
    },
    [players]
  );

  const removePlayer = useCallback((player: IPlayer) => {
    const removedPlayer = { ...player, position: { x: null, y: null } };
    setPlayers((prevPlayers: IPlayer[]) => [
      ...prevPlayers.filter((p) => p.id !== player.id),
      removedPlayer,
    ]);
  }, []);

  const reset = useCallback(() => {
    setPlayers(initialPlayers);
  }, []);

  return { players, movePlayer, canMovePlayer, removePlayer, reset };
}
