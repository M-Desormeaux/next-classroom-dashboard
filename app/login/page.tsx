import { Section } from "@/components/Section";
import { login, signup } from "./actions";

import { serif } from "../fonts";

export default function LoginPage() {
  return (
    <Section>
      <header className="flex justify-center">
        <h1 className={`inline p-2 text-2xl font-bold ${serif.className}`}>
          Login / Sign up
        </h1>
      </header>

      <form className="m-auto flex flex-col gap-2">
        <div>
          <label className="block" htmlFor="email">
            Email:
          </label>
          <input
            className="rounded outline outline-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            id="email"
            name="email"
            type="email"
            required
          />
        </div>
        <div>
          <label className="block" htmlFor="password">
            Password:
          </label>
          <input
            className="rounded outline outline-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="flex gap-2 px-2">
          <button className="padding bg-green-300 px-4 py-2" formAction={login}>
            Log in
          </button>
          <button className="padding border px-4 py-2" formAction={signup}>
            Sign up
          </button>
        </div>
      </form>
    </Section>
  );
}
