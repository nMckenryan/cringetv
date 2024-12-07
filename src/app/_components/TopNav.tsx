import Link from "next/link";
import { auth } from "~/server/auth";
import Image from "next/image";
import cringeLogo from "../../../public/android-chrome-192x192.png";
import { type TV_Show } from "~/types";
import SearchBar from "../search/SearchBar";

export default async function TopNav() {
  const session = await auth();

  const shows: TV_Show[] = [
    {
      name: "The Office",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "G",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2004"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BZjA0YjUzYTAtYmQyOS00NjI3LTg1YmQtZmI3NTFhZGRlNjE0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 0,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "Parks and Recreation",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2009"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BZmI2NWIyMTQtMWZjYS00NWI3LWEzYjQtNDM4YzUwMDc1YjY5XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 1,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "The Good Place",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2016"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BYmY3ZjcxY2QtM2Y3NC00YTUwLWEzYjktZmYwYTcxOGYxNDAyXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 2,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "Brooklyn Nine-Nine",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2013"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BZDM4MjE0MTQtMzcxZS00NzcxLWE5OGEtN2M2NGM0ODg1MjE4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 3,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "Arrested Development",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2003"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BZmE3NWE3NjQtMWQ0Ny00ZjY4LWI2MDQtODVjMzU0ZjZlYmNlXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 4,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "The Big Bang Theory",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2007"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BNzQ5MjQxMzQ1OF5BMl5BanBnXkFtZTgwNzA4MDMzMTE@._V1_.jpg",
      tvdb_id: 5,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "The Marvelous Mrs. Maisel",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "USA",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2017"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BY2I4MWE5YmUtNjg3NC00ZjE5LWIwOWMtMmE4NzhiY2Q1NjQ4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 6,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "USA",
    },
    {
      name: "Schitt's Creek",
      description: "The best show ever",
      content_rating: [
        {
          id: 1,
          name: "PG",
          country: "Canada",
          description: "No description available",
          contentType: null,
          order: null,
          fullName: null,
        },
      ],
      aggregate_cringe_rating: 2.4,
      reviews: [],
      first_air_date: new Date("2/4/2015"),
      final_air_date: new Date(),
      series_status: "Ended",
      poster_link:
        "https://m.media-amazon.com/images/M/MV5BZmI3ZjcxY2QtM2Y3NC00YTUwLWEzYjktZmYwYTcxOGYxNDAyXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
      tvdb_id: 7,
      genre: [
        {
          id: 0,
          name: "Comedy",
        },
      ],
      original_country: "Canada",
    },
  ];

  return (
    <div className="max-w-screen navbar sticky top-0 z-50 flex max-h-10 flex-row justify-between bg-primary-blue-light">
      <Link className="flex flex-row items-end gap-1 text-xl" href={"/"}>
        <Image src={cringeLogo} height={30} width={30} alt="logo"></Image>

        <h1 className="text2xl font-bold text-accent-gold">Binge Cringe</h1>
      </Link>

      <div className="flex flex-row gap-1">
        <SearchBar tvList={shows} />
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
