import Link from "next/link";
import { auth } from "~/server/auth";
import Image from "next/image";
import cringeLogo from "../../../public/android-chrome-192x192.png";

import SearchBar from "./search-components/SearchBar";
import { api } from "~/trpc/server";
import { type TV_Show } from "~/types";

export default async function TopNav() {
  const session = await auth();

  const tvQuery = await api.tvShows.getAllTvShows();

  return (
    <div className="max-w-screen navbar sticky top-0 z-50 flex max-h-10 flex-row justify-between bg-primary-blue-light shadow-2xl">
      <Link className="flex flex-row items-end gap-1 text-xl" href={"/"}>
        <Image src={cringeLogo} height={40} width={40} alt="logo"></Image>

        <h1 className="hidden text-lg font-bold text-accent-gold md:block">
          Binge Cringe
        </h1>
      </Link>

      <div className="flex flex-row gap-1">
        <SearchBar tvList={tvQuery as unknown as TV_Show[]} />
        {session ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10 rounded-full">
                <Image
                  src={session.user.image ? session.user.image : "none"}
                  height={30}
                  width={30}
                  alt="profile_pic"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/profile/[id]" as={`/profile/${session?.user?.id}`}>
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/api/auth/signout">Sign out</Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/api/auth/signin"
            className="0 border-1 rounded-full bg-secondary-purple px-10 py-3 font-semibold text-white no-underline transition hover:bg-secondary-purple/50"
          >
            Sign in
          </Link>
        )}{" "}
      </div>
    </div>
  );
}
