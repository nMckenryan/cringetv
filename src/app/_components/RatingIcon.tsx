import { ShieldCheck, OctagonAlert, Radiation, Skull } from "lucide-react";
import { RatingCode } from "~/types";

export const getRatingIcon = (
  reviewScore: number,
  size: number,
): JSX.Element => {
  if (reviewScore >= 0 && reviewScore <= RatingCode.BaseSafeLimit.valueOf()) {
    return <ShieldCheck size={size} className="text-green-500" />;
  } else if (
    reviewScore > RatingCode.BaseSafeLimit.valueOf() &&
    reviewScore <= RatingCode.BaseCautionLimit.valueOf()
  ) {
    return <OctagonAlert size={size} className="text-yellow-500" />;
  } else if (
    reviewScore > RatingCode.BaseCautionLimit.valueOf() &&
    reviewScore <= RatingCode.BaseUnsafeLimit.valueOf()
  ) {
    return <Radiation size={size} className="text-orange-500" />;
  } else if (reviewScore >= RatingCode.BaseUnsafeLimit.valueOf()) {
    return <Skull size={size} className="text-red-600" />;
  } else {
    return <p>{reviewScore}</p>;
  }
};

export function getRatingText(reviewScore: number): string {
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
    <div className="flex w-24 flex-col items-center">
      {getRatingIcon(reviewScore, 30)}
      <p className="text-sm">{getRatingText(reviewScore)}</p>
    </div>
  );
}
