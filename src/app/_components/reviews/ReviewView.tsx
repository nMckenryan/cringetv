"use client";
import { Modal } from "../Modal";
import React, { useEffect, useState } from "react";
import { type Review } from "~/types";

import { getUserById } from "~/app/actions";
import Image from "next/image";

import RatingIcon from "../RatingIcon";

import { CircleHelp, Edit, Trash } from "lucide-react";
import ReviewForm from "./ReviewForm";
import { api } from "~/trpc/react";
export type UserDetails = {
  name: string | null;
  image: string | null;
};
export default function ReviewView({ review }: { review: Review }) {
  const [user, setUser] = useState<UserDetails>();
  const [isLoading, setIsLoading] = useState(true);

  const { mutate } = api.reviews.deleteReview.useMutation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUserById(review.userId);
        setUser(user as UserDetails);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchUser();
  }, [review.userId]);

  return (
    <div
      className="card w-full bg-primary-blue-light shadow-xl"
      key={review.review_id}
    >
      <div className="card-body items-center text-center">
        {isLoading ? (
          <span className="loading loading-bars loading-sm" />
        ) : (
          <>
            <div className="absolute right-2 top-2 flex flex-row gap-2">
              <Modal modalIdentifier="edit-modal" icon={<Edit />}>
                <h3 className="text-lg font-bold">Edit Review</h3>
                <ReviewForm selectedTvId={review.tvdb_id} />
              </Modal>

              <Modal
                modalIdentifier="delete-modal"
                icon={<Trash className="cursor-pointer" size={20} />}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    mutate({ review_id: review.review_id });
                  }}
                >
                  <h3 className="text-lg font-bold">Delete Review</h3>
                  <p>Are you sure you want to delete this review?</p>
                  <div className="flex flex-row justify-center">
                    <button
                      type="submit"
                      className="-ms-px inline-flex items-center gap-x-2 rounded-lg border border-neutral-700 bg-red-500 px-4 py-3 text-sm font-medium text-white shadow-sm first:ms-0 hover:bg-secondary-purple-dark/70 focus:z-10 focus:bg-red-500/90 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <Trash />
                    </button>
                  </div>
                </form>
              </Modal>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between gap-3">
                {user?.image ? (
                  <Image
                    src={user.image ?? ""}
                    alt="profile_pic"
                    className="rounded-full shadow-md"
                    width={40}
                    height={40}
                  />
                ) : (
                  <>
                    <CircleHelp className="rounded-full shadow-md" size={40} />
                  </>
                )}
                <p className="text-sm">{user?.name ?? "Unknown User"}</p>
                <RatingIcon reviewScore={review.cringe_score_vote} />
              </div>

              <p className="text-left text-sm">{review.review_content}</p>
            </div>
          </>
        )}{" "}
      </div>
    </div>
  );
}
