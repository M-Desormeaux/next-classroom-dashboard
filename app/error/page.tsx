import { Section } from "@/components/Section";
import { serif } from "../fonts";

export default function GlobalError() {
  return (
    <Section>
      <div className="rounded border-2 border-red-600 bg-red-50 px-6 py-4">
        <h1 className={`text-xl font-bold ${serif.className}`}>
          Woah, something Critical happened.
        </h1>
        <p>
          I apologize for the inconvenience and I am, likely, fixing this as we
          speak.
        </p>
      </div>
    </Section>
  );
}
