"use client";

import { X } from "lucide-react";
import React, { useState } from "react";

const Modal = ({
  isOpen,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-box rounded bg-primary-blue-light p-4 shadow-lg">
        {children}
      </div>
    </div>
  );
};

const PageModal = ({
  buttonTitle,
  modalTitle,
  confirmFunction,
  children,
}: {
  buttonTitle: React.ReactNode | string;
  modalTitle: string;
  confirmFunction: () => void;
  children: React.ReactNode;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div id="bioform">
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-sm rounded bg-secondary-purple text-white"
      >
        {buttonTitle}
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-lg font-bold">{modalTitle}</h1>
            <button
              className="flex flex-row"
              onClick={() => setModalOpen(false)}
            >
              <X />
            </button>
          </div>
          {children}
          <div className="flex flex-row justify-between">
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </button>

            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                confirmFunction();
                setModalOpen(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PageModal;
