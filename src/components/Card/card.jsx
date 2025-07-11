import Image from "next/image";

export default function DocumentCard({
  fileUrl,
  labelText,
  uploadedAt,
  fileSize,
  onUpload,
  buttonLabel,
}) {
  // Format date/time
  const formattedDate = uploadedAt
    ? new Date(uploadedAt).toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "—";

  // Convert bytes to KB (2 decimal places)
  const formattedSize = fileSize
    ? `${(fileSize / 1024).toFixed(2)} KB`
    : "—";

  return (
    <div className="max-w-md p-4 bg-white rounded-xl shadow-md border">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={fileUrl}
          alt="Uploaded file"
          width={512}
          height={384}
          className="w-full object-cover"
        />
      </div>

      <p className="text-sm text-gray-600 italic mt-2">
        अपलोड गरिएको मिति : {formattedDate}{" "}
        <span className="text-xs text-gray-500">({formattedSize})</span>
      </p>

      <p className="mt-2 font-semibold text-gray-800">{labelText}</p>

      <button
        onClick={onUpload}
        className="mt-4 text-blue-600 bg-blue-50 px-3 py-2 rounded-md text-center w-full hover:bg-blue-100"
      >
        {buttonLabel || `${labelText} अपलोड गर्नुहोस्`}
      </button>
    </div>
  );
}
