import Image from "next/image";
import React from "react";

interface FieldProps {
  className?: string;
}

export default function Field({ className }: FieldProps) {
  const FIELD_WIDTH = 7;
  const FIELD_LENGTH = 11;
  const TOTAL_SQUARES = FIELD_WIDTH * FIELD_LENGTH;

  return (
    <section className={className}>
      <Image
        className="w-full"
        src="/pages/home/field.svg"
        alt="Футбольное поле"
        width={452}
        height={684}
        priority
      />
      <ul className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[93%] flex flex-wrap">
        {Array.from({ length: TOTAL_SQUARES }, (_, index) => (
          <li
            className={`w-[calc(100%/${FIELD_WIDTH})] h-[calc(100%/${FIELD_LENGTH})] border`}
            key={index}
          ></li>
        ))}
      </ul>
    </section>
  );
}
