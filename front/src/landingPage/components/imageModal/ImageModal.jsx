import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "react-bootstrap";

import "./ImageModal.css";

export default function ImageModal({
  modalImageIndex,
  sourcesArray,
  closeModal,
  isModalOpen,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(modalImageIndex);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prevIndex) =>
          prevIndex < sourcesArray.length - 1 ? prevIndex + 1 : 0
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : sourcesArray.length - 1
        );
      }
    },
    [closeModal, sourcesArray]
  );

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, isModalOpen]);

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < sourcesArray.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : sourcesArray.length - 1
    );
  };

  return (
    <>
      <Modal
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="img_modal"
        show={isModalOpen}
        onHide={closeModal}
        style={{ borderRadius: 10 }}
      >
        <Modal.Header className="border-bottom-0" closeButton></Modal.Header>
        <Modal.Body className="d-flex justify-content-center flex-column items-center">
          {selectedImageIndex !== null && (
            <img
              src={sourcesArray[selectedImageIndex]}
              className="zoomed_image"
              alt={"media"}
            />
          )}
          <button
            className="zoomed_image_previous_btn btn"
            onClick={handlePrevious}
          >
            &lt;
          </button>
          <button className="zoomed_image_next_btn btn" onClick={handleNext}>
            &gt;
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}
