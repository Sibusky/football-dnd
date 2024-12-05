"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Field from "../field";
import List from "../list";
import { useDnd } from "@/hooks/useDnd";
import Controls from "../controls/controls";

export default function FieldWithList() {
  const dnd = useDnd();

  return (
    <DndProvider debugMode={true} backend={HTML5Backend}>
      <Field className="relative w-2/3" dnd={dnd} />
      <div className="w-1/3">
        <Controls dnd={dnd} />
        <List dnd={dnd} />
      </div>
    </DndProvider>
  );
}
