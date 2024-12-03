import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { MdDangerous } from "react-icons/md";
import { FaRadiation } from "react-icons/fa";
import { FaSkull } from "react-icons/fa";

export default function RatingIcon({ reviewScore }: { reviewScore: number }) {
  const size = 30;

  const getRatingIcon = (): JSX.Element => {
    if (reviewScore >= 0.1 && reviewScore <= 0.9) {
      return <AiFillSafetyCertificate size={size} style={{ color: "green" }} />;
    }

    if (reviewScore >= 1.0 && reviewScore <= 1.9) {
      return <IoIosWarning size={size} style={{ color: "yellow" }} />;
    }

    if (reviewScore >= 2.0 && reviewScore <= 2.9) {
      return <MdDangerous size={size} style={{ color: "orange" }} />;
    }

    if (reviewScore >= 3.0 && reviewScore <= 4.0) {
      return <FaRadiation size={size} style={{ color: "red" }} />;
    }

    if (reviewScore >= 4.1 && reviewScore <= 5.0) {
      return <FaSkull size={size} style={{ color: "white" }} />;
    }

    throw new Error("Invalid review score");
  };

  return (
    <div className="flex w-24 flex-col items-center">
      {getRatingIcon()}
      <p className="text-sm">{getRatingText(reviewScore)}</p>
    </div>
  );
}

const getRatingText = (reviewScore: number): string => {
  if (reviewScore >= 0.1 && reviewScore <= 0.9) {
    return "Safe";
  }

  if (reviewScore >= 1.0 && reviewScore <= 1.9) {
    return "Caution";
  }

  if (reviewScore >= 2.0 && reviewScore <= 2.9) {
    return "Unsafe";
  }

  if (reviewScore >= 3.0 && reviewScore <= 4.0) {
    return "Cringe";
  }

  if (reviewScore >= 4.1 && reviewScore <= 5.0) {
    return "Dead";
  }

  throw new Error("Invalid review score");
};
