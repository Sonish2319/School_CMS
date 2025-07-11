import React, { useRef, useState, useCallback, useEffect } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

const TARGET_SIZE_KB = 190;
const MAX_SIZE_KB = 200;
const MIN_QUALITY = 0.6;

export default function CropperModal({ isOpen, imageSrc, onClose, onCrop }) {
  const cropperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  // ✅ Sync imageSrc to image state
  useEffect(() => {
    if (imageSrc) {
      setImage(imageSrc);
    }
  }, [imageSrc]);

  const compressToTargetSize = (blob, callback) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = function () {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      let minQuality = MIN_QUALITY;
      let maxQuality = 0.9;
      let optimalBlob = blob;

      const tryQuality = (quality) =>
        new Promise((resolve) => {
          canvas.toBlob(
            (resultBlob) => {
              const sizeKB = resultBlob.size / 1024;
              if (sizeKB <= MAX_SIZE_KB && sizeKB >= TARGET_SIZE_KB - 10) {
                optimalBlob = resultBlob;
                resolve(true);
              } else if (sizeKB > MAX_SIZE_KB) {
                resolve(false);
              } else {
                optimalBlob = resultBlob;
                resolve(true);
              }
            },
            "image/jpeg",
            quality
          );
        });

      const findOptimalQuality = async () => {
        let iterations = 0;
        let currentQuality = (minQuality + maxQuality) / 2;
        while (iterations < 5) {
          iterations++;
          const isGood = await tryQuality(currentQuality);
          if (isGood) {
            maxQuality = currentQuality;
          } else {
            minQuality = currentQuality;
          }
          currentQuality = (minQuality + maxQuality) / 2;
        }
        return optimalBlob;
      };

      findOptimalQuality().then((finalBlob) => {
        const finalFile = new File([finalBlob], "cropped_image.jpg", {
          type: "image/jpeg",
        });
        callback(finalFile);
        URL.revokeObjectURL(url);
      });
    };
    img.src = url;
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    cropper?.getCroppedCanvas().toBlob(
      (blob) => {
        if (blob) {
          const sizeKB = blob.size / 1024;
          if (sizeKB > MAX_SIZE_KB) {
            compressToTargetSize(blob, (compressedBlob) => {
              onCrop(compressedBlob);
              onClose();
            });
          } else {
            const file = new File([blob], "cropped_image.jpg", {
              type: "image/jpeg",
            });
            onCrop(file);
            onClose();
          }
        }
      },
      "image/jpeg",
      0.9
    );
  };

  const handleRotate = (deg) => {
    cropperRef.current?.cropper.rotate(deg);
  };

  const handleZoom = (factor) => {
    cropperRef.current?.cropper.zoom(factor);
  };

  const handleMove = (x, y) => {
    cropperRef.current?.cropper.move(x, y);
  };

  const handleFlip = (axis) => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    if (axis === "x") {
      const newScaleX = -scaleX;
      cropper.scaleX(newScaleX);
      setScaleX(newScaleX);
    } else if (axis === "y") {
      const newScaleY = -scaleY;
      cropper.scaleY(newScaleY);
      setScaleY(newScaleY);
    }
  };

  const handleReset = () => {
    cropperRef.current?.cropper.reset();
    setScaleX(1);
    setScaleY(1);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const preventDefault = (e) => e.preventDefault();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center z-50 p-4"
      onDrop={handleDrop}
      onDragOver={preventDefault}
    >
      <div className="bg-white rounded p-4 max-w-2xl w-full">
        {image && (
          <Cropper
            src={image}
            style={{ height: 400, width: "100%" }}
            aspectRatio={NaN}
            guides={true}
            ref={cropperRef}
            viewMode={0}
            dragMode="move"
            responsive={true}
            autoCropArea={1}
            background={false}
            checkOrientation={false}
          />
        )}

        <div className="mt-4 flex flex-wrap gap-2 justify-between">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => handleZoom(0.1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Zoom In
            </button>
            <button
              onClick={() => handleZoom(-0.1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Zoom Out
            </button>
            <button
              onClick={() => handleMove(-10, 0)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              ←
            </button>
            <button
              onClick={() => handleMove(10, 0)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              →
            </button>
            <button
              onClick={() => handleMove(0, -10)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              ↑
            </button>
            <button
              onClick={() => handleMove(0, 10)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              ↓
            </button>
            <button
              onClick={() => handleRotate(-90)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Rotate Left
            </button>
            <button
              onClick={() => handleRotate(90)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Rotate Right
            </button>
            <button
              onClick={() => handleFlip("x")}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Flip X
            </button>
            <button
              onClick={() => handleFlip("y")}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              Flip Y
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 bg-red-300 rounded"
            >
              Reset
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Crop Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
