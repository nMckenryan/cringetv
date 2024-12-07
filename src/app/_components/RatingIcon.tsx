import { ShieldCheck, OctagonAlert, Radiation, Skull } from "lucide-react";

export default function RatingIcon({ reviewScore }: { reviewScore: number }) {
  const size = 30;

  const getRatingIcon = (): JSX.Element => {
    if (reviewScore >= 0.1 && reviewScore <= 0.9) {
      return <ShieldCheck size={size} className="text-green-500" />;
    }

    if (reviewScore >= 1.0 && reviewScore <= 1.9) {
      return <OctagonAlert size={size} className="text-yellow-500" />;
    }

    if (reviewScore >= 2.0 && reviewScore <= 2.9) {
      return <Radiation size={size} className="text-orange-500" />;
    }

    if (reviewScore >= 3.0 && reviewScore <= 4.0) {
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
    return "Brutal";
  }

  throw new Error("Invalid review score");
};
