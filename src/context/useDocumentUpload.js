import { useState } from "react";

export default function useDocumentUpload(initialValue = null) {
  const [documentFile, setDocumentFile] = useState(initialValue);
  const [showCropper, setShowCropper] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  // const handleFileSelect = (file, maxSizeKB = 200) => {
  //   const fileSizeKB = file.size / 1024;
    
  //   if (fileSizeKB <= maxSizeKB) {
  //     setDocumentFile(file);
  //   } else {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setImageSrc(reader.result);
  //       setShowCropper(true);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileSelect = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };
  

  return {
    documentFile,
    setDocumentFile,
    showCropper,
    setShowCropper,
    imageSrc,
    setImageSrc,
    handleFileSelect,
    reset: () => {
      setDocumentFile(null);
      setShowCropper(false);
      setImageSrc(null);
    }
  };
}