"use client";

import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Field from "../field";
import List from "../list";
import { IPlayer } from "../list/player";

export default function FieldWithList({ players }: { players: IPlayer[] }) {
  const [playersState, setPlayersState] = useState<IPlayer[]>(players);

  return (
    <DndProvider backend={HTML5Backend}>
      <Field
        className="relative w-2/3"
        players={playersState}
        setPlayersState={setPlayersState}
      />
      <List className="w-1/3" players={playersState} />
    </DndProvider>
  );
}
