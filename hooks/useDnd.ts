import { useCallback, useState } from "react";
import { initialPlayers, Roles, RoleType } from "@/constants/players";
import { IPlayer } from "@/components/pages/home/list/player";

export interface Dnd {
  players: IPlayer[];
  movePlayer: (player: IPlayer, x: number, y: number) => void;
  canMovePlayer: (toX: number, toY: number) => boolean;
  removePlayer: (player: IPlayer) => void;
  reset: () => void;
  setScheme: (positions: Record<RoleType, { x: number; y: number }[]>) => void;
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

  const setScheme = useCallback(
    (positions: Record<RoleType, { x: number; y: number }[]>) => {
      setPlayers(() => {
        const getPlayersForRole = (role: RoleType, count: number) =>
          initialPlayers.filter((p) => p.role === role).slice(0, count);

        const goalkeeper = getPlayersForRole(
          Roles.GOALKEEPER,
          positions[Roles.GOALKEEPER].length
        );
        const defenders = getPlayersForRole(
          Roles.DEFENDER,
          positions[Roles.DEFENDER].length
        );
        const midfielders = getPlayersForRole(
          Roles.MIDFIELDER,
          positions[Roles.MIDFIELDER].length
        );
        const forwards = getPlayersForRole(
          Roles.FORWARD,
          positions[Roles.FORWARD].length
        );

        return initialPlayers.map((player) => {
          const rolePositions = positions[player.role as keyof typeof Roles];
          if (rolePositions) {
            const index =
              player.role === Roles.GOALKEEPER && player.id === goalkeeper[0].id
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
      });
    },
    []
  );

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
    setScheme,
    getPlayersOnFieldCount,
  };
}
