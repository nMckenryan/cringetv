import {
  ShieldCheck,
  OctagonAlert,
  Radiation,
  Skull,
  CircleHelp,
} from "lucide-react";
import { RatingCode } from "~/types";

export function getRatingIcon(reviewScore: number | null): JSX.Element {
  if (reviewScore === null)
    return <CircleHelp className="text-gray-300" size={35} />;
  if (reviewScore >= 0 && reviewScore <= RatingCode.BaseSafeLimit.valueOf()) {
    return <ShieldCheck className="text-green-500" size={35} />;
  } else if (
    reviewScore > RatingCode.BaseSafeLimit.valueOf() &&
    reviewScore <= RatingCode.BaseCautionLimit.valueOf()
  ) {
    return <OctagonAlert className="text-yellow-500" size={35} />;
  } else if (
    reviewScore > RatingCode.BaseCautionLimit.valueOf() &&
    reviewScore <= RatingCode.BaseUnsafeLimit.valueOf()
  ) {
    return <Radiation className="text-orange-500" size={35} />;
  } else if (reviewScore >= RatingCode.BaseUnsafeLimit.valueOf()) {
    return <Skull className="text-red-600" size={35} />;
  } else {
    return <p>{reviewScore}</p>;
  }
}

export function getRatingText(reviewScore: number | null): string {
  if (reviewScore === null) return "Not Rated";
  if (reviewScore >= 0 && reviewScore <= RatingCode.BaseSafeLimit.valueOf()) {
    return "Safe";
  } else if (
    reviewScore > RatingCode.BaseSafeLimit.valueOf() &&
    reviewScore <= RatingCode.BaseCautionLimit.valueOf()
  ) {
    return "Caution";
  } else if (
    reviewScore > RatingCode.BaseCautionLimit.valueOf() &&
    reviewScore <= RatingCode.BaseUnsafeLimit.valueOf()
  ) {
    return "Danger";
  } else if (reviewScore >= RatingCode.BaseUnsafeLimit.valueOf()) {
    return "RIP";
  } else {
    return reviewScore.toString();
  }
}

export default function RatingIcon({ reviewScore }: { reviewScore: number }) {
  return (
    <div className="flex flex-col items-center text-xs">
      {getRatingIcon(reviewScore)}
    </div>
  );
}
