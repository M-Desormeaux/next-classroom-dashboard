import { PropsWithChildren } from "react";

export const Section = ({ children }: PropsWithChildren) => {
  return <section className="flex flex-col gap-3 p-4">{children}</section>;
};
