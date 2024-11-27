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
    <div className="max-w-screen bg-primary-blue-light navbar sticky top-0 z-50 flex max-h-10 flex-row justify-around">
      <a className="flex flex-row items-end gap-1 text-xl">
        <Image src={cringeLogo} height={30} width={30} alt="logo"></Image>

        <h1 className="text2xl font-bold text-accent-gold">Binge Cringe</h1>
      </a>

      <ul className="menu menu-horizontal">
        {session ? (
          <li>
            <Link
              href={"profile"}
              className="0 rounded-full bg-secondary-purple px-10 font-semibold text-white no-underline transition hover:bg-secondary-purple/50"
            >
              Profile
            </Link>
          </li>
        ) : null}
        <li>
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="0 border-1 rounded-full bg-secondary-purple px-10 py-3 font-semibold text-white no-underline transition hover:bg-secondary-purple/50"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </li>
      </ul>
    </div>
  );
}
