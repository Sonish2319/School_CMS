import React, { useRef } from "react";

const DocumentUpload = ({
  value = null,
  onChange,
  maxSizeKB = 200,
  label = "Upload Document",
  buttonText = "Upload & Crop Image",
  changeText = "Change Image",
  previewClassName = "w-32 h-auto border rounded"
}) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file); // This will update the formData through the Form component
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={handleUploadClick}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        {value ? changeText : buttonText}
      </button>
      {value && (
        <div className="mt-2">
          <img
            src={URL.createObjectURL(value)}
            alt="Document preview"
            className={previewClassName}
          />
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;