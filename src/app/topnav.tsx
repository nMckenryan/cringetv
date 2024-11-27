import Link from "next/link";
import { auth } from "~/server/auth";
import { api } from "~/trpc/server";
import Image from "next/image";
import cringeLogo from "../../public/android-chrome-192x192.png";

export default async function TopNav() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <div className="max-w-screen bg-primary-blue-light navbar">
      <div className="flex-1">
        <a className="flex flex-row items-end gap-1 text-xl">
          <Image src={cringeLogo} height={30} width={30} alt="logo"></Image>

          <h1 className="text2xl font-bold text-accent-gold">Binge Cringe</h1>
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
              className="0 rounded-full bg-secondary-purple px-10 py-3 font-semibold no-underline transition hover:bg-secondary-purple/50"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
