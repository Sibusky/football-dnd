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
      <div className="flex w-2/3 lg:flex-col-reverse lg:justify-start lg:gap-4">
        <Controls
          className="flex flex-col gap-2 flex-grow items-center"
          dnd={dnd}
        />
        <Field className="flex-grow lg:flex-grow-0" dnd={dnd} />
      </div>
      <List
        className="w-1/3 flex flex-col gap-10 md:gap-6 sm:gap-4"
        dnd={dnd}
      />
    </DndProvider>
  );
}
