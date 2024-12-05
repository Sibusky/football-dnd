import { Roles } from "./players";
import { RoleType } from "./players";

export const positionsFourFourTwo: Record<
  RoleType,
  { x: number; y: number }[]
> = {
  [Roles.GOALKEEPER]: [{ x: 4, y: 12 }],
  [Roles.DEFENDER]: [
    { x: 1, y: 9 },
    { x: 7, y: 9 },
    { x: 3, y: 10 },
    { x: 5, y: 10 },
  ],
  [Roles.MIDFIELDER]: [
    { x: 1, y: 6 },
    { x: 7, y: 6 },
    { x: 3, y: 7 },
    { x: 5, y: 7 },
  ],
  [Roles.FORWARD]: [
    { x: 2, y: 3 },
    { x: 6, y: 3 },
  ],
};

export const positionsFourFourTwoRhombus: Record<
  RoleType,
  { x: number; y: number }[]
> = {
  [Roles.GOALKEEPER]: [{ x: 4, y: 12 }],
  [Roles.DEFENDER]: [
    { x: 1, y: 9 },
    { x: 7, y: 9 },
    { x: 3, y: 10 },
    { x: 5, y: 10 },
  ],
  [Roles.MIDFIELDER]: [
    { x: 1, y: 6 },
    { x: 7, y: 6 },
    { x: 4, y: 7 },
    { x: 4, y: 5 },
  ],
  [Roles.FORWARD]: [
    { x: 2, y: 3 },
    { x: 6, y: 3 },
  ],
};

export const positionsFourThreeThree: Record<
  RoleType,
  { x: number; y: number }[]
> = {
  [Roles.GOALKEEPER]: [{ x: 4, y: 12 }],
  [Roles.DEFENDER]: [
    { x: 1, y: 9 },
    { x: 7, y: 9 },
    { x: 3, y: 10 },
    { x: 5, y: 10 },
  ],
  [Roles.MIDFIELDER]: [
    { x: 1, y: 6 },
    { x: 7, y: 6 },
    { x: 4, y: 7 },
  ],
  [Roles.FORWARD]: [
    { x: 2, y: 3 },
    { x: 6, y: 3 },
    { x: 4, y: 2 },
  ],
};

export const positionsFourFiveOne: Record<
  RoleType,
  { x: number; y: number }[]
> = {
  [Roles.GOALKEEPER]: [{ x: 4, y: 12 }],
  [Roles.DEFENDER]: [
    { x: 1, y: 9 },
    { x: 7, y: 9 },
    { x: 3, y: 10 },
    { x: 5, y: 10 },
  ],
  [Roles.MIDFIELDER]: [
    { x: 1, y: 5 },
    { x: 7, y: 5 },
    { x: 4, y: 7 },
    { x: 2, y: 6 },
    { x: 6, y: 6 },
  ],
  [Roles.FORWARD]: [{ x: 4, y: 2 }],
};
