import { serif } from "@/app/layout";
import type { PropsWithChildren } from "react";

interface Card extends PropsWithChildren {
  heading: string;
}

export const Card = ({ heading, children }: Card) => {
  return (
    <div className="flex flex-col rounded-lg bg-white p-2 shadow-md">
      <h2 className={`py-2 text-xl font-bold ${serif.className}`}>{heading}</h2>
      {children}
    </div>
  );
};
