import { GithubIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer items-center bg-neutral p-4 text-neutral-content">
      <aside className="grid-flow-row items-center">
        <p>TV Series data retrieved from TheTVDB.com Api V4</p>
      </aside>
      <nav className="grid-row gap-4 md:place-self-center md:justify-self-end">
        <a className="flex-row" href="https://github.com/nmckenryan">
          <GithubIcon /> Created by nmckenryan - 2024
        </a>
      </nav>
    </footer>
  );
}
