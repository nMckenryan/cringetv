import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Image from "next/image";
import cringeLogo from "../../public/favicon-32x32.png";

export default async function TopNav() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="navbar bg-primary-blue">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">
          Binge Cringe{" "}
          <Image src={cringeLogo} alt="logo" width={30} height={30}></Image>
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-secondary-purple rounded-t-none p-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}
