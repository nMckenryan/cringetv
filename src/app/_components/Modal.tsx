import { X } from "lucide-react";
import React from "react";
export function Modal({
  children,
  icon,
  modalIdentifier,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  modalIdentifier: string;
}) {
  return (
    <>
      <dialog
        id={modalIdentifier}
        className="modal modal-bottom bg-zinc-700/80 sm:modal-middle"
      >
        <div className="modal-box bg-primary-blue shadow-xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              <X />
            </button>
          </form>
          <div className="mx-auto flex flex-col gap-2">{children}</div>
        </div>
      </dialog>

      <button
        className="my-5"
        onClick={() =>
          (
            document.getElementById(modalIdentifier) as HTMLDialogElement
          ).showModal()
        }
      >
        {icon}
      </button>
    </>
  );
}
