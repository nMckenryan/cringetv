import { ShieldCheck, OctagonAlert, Radiation, Skull } from "lucide-react";
import { RatingCode } from "~/types";

export default function RatingIcon({ reviewScore }: { reviewScore: number }) {
  const size = 30;

  const getRatingIcon = (): JSX.Element => {
    if (reviewScore >= 0 && reviewScore < RatingCode.BaseSafeLimit.valueOf()) {
      return <ShieldCheck size={size} className="text-green-500" />;
    }

    if (
      reviewScore > RatingCode.BaseSafeLimit.valueOf() &&
      reviewScore <= RatingCode.BaseCautionLimit.valueOf()
    ) {
      return <OctagonAlert size={size} className="text-yellow-500" />;
    }

    if (
      reviewScore > RatingCode.BaseCautionLimit.valueOf() &&
      reviewScore <= RatingCode.BaseUnsafeLimit.valueOf()
    ) {
      return <Radiation size={size} className="text-orange-500" />;
    }

    if (reviewScore >= RatingCode.BaseUnsafeLimit.valueOf()) {
      return <Skull size={size} className="text-red-600" />;
    }

    throw new Error("Invalid review score: " + reviewScore);
  };

  return (
    <div className="flex w-24 flex-col items-center">
      {getRatingIcon()}
      <p className="text-sm">{getRatingText(reviewScore)}</p>
    </div>
  );
}

const getRatingText = (reviewScore: number): string => {
  if (reviewScore >= 0 && reviewScore < RatingCode.BaseSafeLimit.valueOf()) {
    return "Safe";
  }

  if (
    reviewScore > RatingCode.BaseSafeLimit.valueOf() &&
    reviewScore <= RatingCode.BaseCautionLimit.valueOf()
  ) {
    return "Caution";
  }

  if (
    reviewScore > RatingCode.BaseCautionLimit.valueOf() &&
    reviewScore <= RatingCode.BaseUnsafeLimit.valueOf()
  ) {
    return "Danger";
  }

  if (reviewScore >= RatingCode.BaseUnsafeLimit.valueOf()) {
    return "RIP";
  }

  throw new Error("Invalid review score");
};
