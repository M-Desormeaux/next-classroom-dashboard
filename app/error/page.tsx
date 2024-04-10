import { Section } from "@/components/Section";
import { serif } from "../fonts";

export default function ErrorPage() {
  return (
    <Section>
      <h1 className={`text-xl font-bold ${serif.className}`}>
        Something went wrong, please try again later.
      </h1>
    </Section>
  );
}
