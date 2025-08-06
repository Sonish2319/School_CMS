import { FaCircle } from "react-icons/fa";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


const NEXT_PUBLIC_MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

export function renderImage(filePath, onClick) {
  if (!filePath) return "—";

  const extension = filePath.split(".").pop().toLowerCase();
  const fileUrl = `${NEXT_PUBLIC_MEDIA_URL}${filePath}`;

  console.log(`ENV: ${NEXT_PUBLIC_MEDIA_URL}`);
console.log(`Rendering file: ${filePath} → ${NEXT_PUBLIC_MEDIA_URL}${filePath}`);



  console.log(`Rendering file: ${filePath} with URL: ${fileUrl}`);

  // Render image
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
    return (
      <img
        src={fileUrl}
        alt="Attachment"
        onClick={onClick}
        className="h-12 w-auto cursor-pointer rounded object-cover"
        style={{ maxWidth: "100px", height: "auto" }}
      />
    );
  }

  // Render link for PDF or DOCs
  return (
    <a
      href={fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      View file
    </a>
  );
}



export default function getColumns(showModal) {
  const baseColumns = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title (EN)" },
    { key: "title_np", title: "Title (NP)" },
  ];

  const statusColumn = {
    key: "status",
    title: "Status",
    render: (value) => {
      // Handle all possible cases:
      // - boolean true/false (current backend response)
      // - number 1/0 (if you change backend later)
      // - string "active"/"inactive" (legacy support)
      const isActive = value === true || value === 1 || value === "active";
      
      return (
        <span
          style={{
            color: isActive ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      );
    },
  };


  const noticeColumns = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },

    {
      key: "description",
      title: "Description",
      // show first 80 chars so the table stays compact
      render: (val) =>
        val && val.length > 80 ? `${val.slice(0, 77)}…` : val || "—",
    },

    {
      key: "file",
      title: "Attachment",
      render: (filePath, row) =>
        renderImage(filePath, () => showModal(filePath, row)),
    },

    statusColumn,
  ];

  const sliderColumns = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },
    {
      key: "images",
      title: "Attachments",
      render: (images, row) => {
        let parsedImages = [];
    
        try {
          parsedImages = typeof images === "string" ? JSON.parse(images) : images;
        } catch (error) {
          console.warn("Invalid images JSON:", error);
        }
    
        if (!parsedImages.length) return "—";
    
        return (
          <div className="flex gap-2 flex-wrap">
            {parsedImages.map((img, index) => {
              // Remove redundant "uploads/" if needed
              const cleanedPath = img.startsWith("uploads/") ? img.replace("uploads/", "") : img;
              return (
                <div key={index}>
                  {renderImage(cleanedPath, () => showModal(cleanedPath, row))}
                </div>
              );
            })}
          </div>
        );
      },
    },    
    statusColumn,
  ];

  const aboutColumns = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },
    {
      key: "description",
      title: "Description",
      render: (val) =>
        val && val.length > 80 ? `${val.slice(0, 77)}…` : val || "—",
    },
    {
      key: "images",
      title: "Attachments",
      render: (images) => {
        let parsedImages = [];
  
        try {
          parsedImages = typeof images === "string" ? JSON.parse(images) : images;
        } catch (error) {
          console.warn("Invalid images JSON:", error);
        }
  
        if (!parsedImages || parsedImages.length === 0) return "—";
  
        return (
          <div className="flex gap-2 flex-wrap">
            {parsedImages.map((img, index) => {
              // Remove redundant "/uploads/" prefix from img if it exists
              const cleanedPath = img.startsWith("/uploads/")
                ? img.slice("/uploads/".length)
                : img.startsWith("uploads/")
                ? img.slice("uploads/".length)
                : img;
  
              return (
                <div key={index}>
                  {renderImage(cleanedPath)}
                </div>
              );
            })}
          </div>
        );
      },
    },
    statusColumn,
  ];

  const galleryColumns = [
    { key: "id", title: "ID", dataIndex: "id" },
    { key: "title", title: "Title", dataIndex: "title" },
    {
      key: "type",
      title: "Type",
      dataIndex: "type",
      render: (val) => val?.toUpperCase(),
    },
    {
      key: "mode",
      title: "Mode",
      dataIndex: "mode",
      render: (val) => val?.toUpperCase(),
    },
    {
      key: "files",
      title: "Files",
      dataIndex: "files",
      render: (value, row) => {
        let files = [];
        try {
          files = JSON.parse(value);
        } catch {
          return "Invalid File Format";
        }
  
        return (
          <div className="flex gap-2 flex-wrap">
            {files.slice(0, 4).map((filePath, i) => {
              const ext = filePath.split(".").pop().toLowerCase();
              const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
              const isAudio = row.type === "audio";
              const isVideo = row.type === "video";
  
              if (isAudio || isVideo) {
                return (
                  <a
                    key={i}
                    href={filePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-xs underline break-all"
                  >
                    {filePath}
                  </a>
                );
              }
  
              // For image types
              const cleanedPath = filePath.startsWith("/uploads/")
                ? filePath.substring("/uploads/".length)
                : filePath.startsWith("uploads/")
                ? filePath.substring("uploads/".length)
                : filePath;
  
              const thumb = `${process.env.NEXT_PUBLIC_MEDIA_URL}/${cleanedPath}`;
  
              return (
                <img
                  key={i}
                  src={thumb}
                  alt="thumb"
                  className="h-8 w-8 rounded object-cover cursor-pointer"
                />
              );
            })}
            {files.length > 4 && (
              <span className="text-xs text-gray-500">
                +{files.length - 4}
              </span>
            )}
          </div>
        );
      },
    },
  ];
  
  
  

  return {
      ecozone: [...baseColumns, statusColumn],
     commodity_category: [
          { key: "title_en", title: "Title (EN)" },
          { key: "title_np", title: "Title (NP)" },
          {
            key: "status",
            title: "Status",
            render: (value) => (
              <span
                style={{
                  color: value === "active" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {value === "active" ? "Active" : "Inactive"}
              </span>
            ),
          },
        ],

      commodity: [
        { key: "category.title_en", title: "Category (EN)" }, // using relation
        { key: "title", title: "Title (EN)" },
        { key: "title_np", title: "Title (NP)" },
        { key: "scientific_name", title: "Scientific Name" },
      ],

      nutrient_composition: [
        { key: "commodity_id", title: "Commodity ID" },
        { key: "district", title: "Title (NP)" },
        { key: "ecozone", title: "Status" },
        { key: "season", title: "Status" },
        { key: "energy", title: "Status" },
        { key: "cprotein", title: "Status" },
        { key: "crudefiber", title: "Status" }
      ],

      /* finally register it */
    notice: noticeColumns,
    slider: sliderColumns,
    about: aboutColumns,
    gallery: galleryColumns,


    admission: [
  { key: "id", title: "ID" },
  { key: "title", title: "Title" },
  { key: "shortSubtext", title: "Short Subtext" },
  {
    key: "description",
    title: "Description",
    render: (val) =>
      val && val.length > 80 ? `${val.slice(0, 77)}…` : val || "—",
  },
  {
    key: "programsOffered",
    title: "Programs Offered",
    render: (val) => {
      try {
        const programs = JSON.parse(val);
        return (
          <div className="flex flex-col text-sm">
            {programs.grades?.length && (
              <div><strong>Grades:</strong> {programs.grades.join(", ")}</div>
            )}
            {programs.mediums?.length && (
              <div><strong>Mediums:</strong> {programs.mediums.join(", ")}</div>
            )}
            {programs.curriculum && (
              <div><strong>Curriculum:</strong> {programs.curriculum}</div>
            )}
            {programs.special?.length && (
              <div><strong>Special:</strong> {programs.special.join(", ")}</div>
            )}
          </div>
        );
      } catch (e) {
        return "—";
      }
    },
  },
  {
    key: "image",
    title: "Image",
    render: (filePath, row) =>
      renderImage(filePath, () => showModal(filePath, row)),
  },
  { key: "eligibilityCriteria", title: "Eligibility" },
  { key: "importantNotices", title: "Important Notes" },
  {
    key: "admissionOpenDate",
    title: "Open Date",
    render: (val) => val || "—",
  },
  {
    key: "entranceTestDate",
    title: "Test Date",
    render: (val) => val || "—",
  },
  {
    key: "orientationDay",
    title: "Orientation Day",
    render: (val) => val || "—",
  },
  statusColumn,
],

user: [
      {
        key: "id",
        title: "ID",
        width: 70
      },
      {
        key: "name",
        title: "Username",
        width: 150
      },
      // {
      //   key: "is_active",
      //   title: "Status",
      //   render: (value) => (
      //     <span
      //       className={`px-2 py-1 rounded-full text-[12px] font-semibold ${value
      //         ? "text-green-700 bg-green-100 border border-green-700"
      //         : "text-red-700 bg-red-100 border border-red-700"
      //         }`}
      //     >
      //       {value ? "Active" : "Inactive"}
      //     </span>
      //   ),
      //   width: 100
      // },

      {
        key: "is_superuser",
        title: "Superuser",
        width: 100,
        render: (value) => (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
          >
            {value ? <FaCheckCircle /> : <FaTimesCircle />}
            {value ? "Yes" : "No"}
          </span>
        ),
      },

      {
        key: "is_staff",
        title: "Staff",
        width: 100,
        render: (value) => (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
          >
            {value ? <FaCheckCircle /> : <FaTimesCircle />}
            {value ? "Yes" : "No"}
          </span>
        ),
      },
    ],

    };
}
