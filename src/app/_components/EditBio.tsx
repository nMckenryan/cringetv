"use client";

import React, { useState } from "react";
import PageModal from "./PageModal";
import { type User } from "@prisma/client";
import { api } from "~/trpc/react";
import { Pencil } from "lucide-react";

export default function EditBio({ user }: { user: User }) {
  const [newBio, setNewBio] = useState(user.userBio ?? "");
  const utils = api.useUtils();

  const editBio = api.users.editBio.useMutation({
    onSuccess: async () => {
      await utils.users.invalidate();
      setNewBio("");
    },
  });

  return (
    <PageModal
      buttonTitle={<Pencil />}
      modalTitle="Edit Bio"
      confirmFunction={() => editBio.mutate({ bio: newBio })}
    >
      <textarea
        className="textarea textarea-bordered textarea-lg mt-3 h-36 w-full max-w-lg pt-2"
        maxLength={128}
        value={newBio}
        onChange={(e) => setNewBio(e.target.value)}
      />
      <p className="text-center text-sm">{newBio.length} / 128 characters</p>
    </PageModal>
  );
}
