import { useRef } from "react";

export default function SearchBar() {
  /******  6507ac44-9462-482c-bf63-4e07f475f9e3  *******/ const searchTerm =
    useRef("");

  // const filterData = useMemo(
  //   () =>
  //     movieData
  //       ? movieData.filter((item: { name: string }) =>
  //           item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //         )
  //       : [],
  //   [movieData, searchTerm],
  // ) as TV_Show[];

  return (
    <input
      type="text"
      placeholder="Search Reviews"
      className="input input-bordered w-24 md:w-auto"
      onChange={(e) => (searchTerm.current = e.target.value)}
    />
  );
}
