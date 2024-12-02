import Link from "next/link";
import Image from "next/image";
import cringeLogo from "../../public/android-chrome-512x512.png";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link className="flex flex-col items-center gap-1 text-xl" href={"/"}>
        <Image src={cringeLogo} width={200} height={200} alt="logo"></Image>
        <h1 className="text-6xl font-bold text-accent-gold">Page not found</h1>
      </Link>
    </div>
  );
}
