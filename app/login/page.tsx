import { Section } from "@/components/Section";
import { login, signup } from "./actions";

import { serif } from "../fonts";

const defaultInfo = { email: "admin@example.com", pass: "adminpassword" };

export default function LoginPage() {
  return (
    <section className="flex flex-grow flex-col items-center gap-3 p-4">
      <header className="flex justify-center">
        <h1 className={`inline p-4 text-2xl font-bold ${serif.className}`}>
          Login / Sign up
        </h1>
      </header>

      <form className="flex w-fit flex-col gap-3">
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
        <div className="flex justify-center gap-2 py-4">
          <button className="padding bg-green-300 px-4 py-2" formAction={login}>
            Log in
          </button>
          <button className="padding border px-4 py-2" formAction={signup}>
            Sign up
          </button>
        </div>
      </form>

      <div className="flex w-fit max-w-64 flex-col gap-1 rounded border border-gray-500 bg-gray-100 p-3">
        If you are wanting to preview the app without signing up please use:
        <pre className="w-fit rounded bg-yellow-200 px-1 italic">
          {defaultInfo.email}
        </pre>
        <pre className="w-fit rounded bg-yellow-200 px-1 italic">
          {defaultInfo.pass}
        </pre>
      </div>
    </section>
  );
}
