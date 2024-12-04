import { useCallback, useState } from "react";
import { initialPlayers, Roles } from "@/constants/players";
import { IPlayer } from "@/components/pages/home/list/player";

export interface Dnd {
  players: IPlayer[];
  movePlayer: (player: IPlayer, x: number, y: number) => void;
  canMovePlayer: (toX: number, toY: number) => boolean;
  removePlayer: (player: IPlayer) => void;
  reset: () => void;
  setSchemeOne: () => void;
  getPlayersOnFieldCount: () => number;
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

  const setSchemeOne = useCallback(() => {
    const goalkeeper = players.find((p) => p.role === Roles.GOALKEEPER);
    const defenders = players
      .filter((p) => p.role === Roles.DEFENDER)
      .slice(0, 4);
    const midfielders = players
      .filter((p) => p.role === Roles.MIDFIELDER)
      .slice(0, 4);
    const forwards = players
      .filter((p) => p.role === Roles.FORWARD)
      .slice(0, 2);

    const positions = {
      [Roles.GOALKEEPER]: [{ x: 3, y: 10 }],
      [Roles.DEFENDER]: [
        { x: 1, y: 7 },
        { x: 5, y: 7 },
        { x: 2, y: 8 },
        { x: 4, y: 8 },
      ],
      [Roles.MIDFIELDER]: [
        { x: 1, y: 4 },
        { x: 5, y: 4 },
        { x: 2, y: 5 },
        { x: 4, y: 5 },
      ],
      [Roles.FORWARD]: [
        { x: 2, y: 2 },
        { x: 4, y: 2 },
      ],
    };

    const updatedPlayers = players.map((player) => {
      const rolePositions = positions[player.role];
      if (rolePositions) {
        const index =
          player.role === Roles.GOALKEEPER && player.id === goalkeeper?.id
            ? 0
            : player.role === Roles.DEFENDER
            ? defenders.findIndex((d) => d.id === player.id)
            : player.role === Roles.MIDFIELDER
            ? midfielders.findIndex((m) => m.id === player.id)
            : forwards.findIndex((f) => f.id === player.id);
        if (index !== -1) {
          return { ...player, position: rolePositions[index] };
        }
      }
      return player;
    });

    setPlayers(updatedPlayers);
  }, [players]);

  const getPlayersOnFieldCount = useCallback(() => {
    return players.filter(
      (player) => player.position.x !== null && player.position.y !== null
    ).length;
  }, [players]);

  return {
    players,
    movePlayer,
    canMovePlayer,
    removePlayer,
    reset,
    setSchemeOne,
    getPlayersOnFieldCount,
  };
}
