import { FaCircle } from "react-icons/fa";

const NEXT_PUBLIC_MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

export function renderImage(filePath, onClick) {
  if (!filePath) return "—";

  const extension = filePath.split(".").pop().toLowerCase();
  const fileUrl = `${NEXT_PUBLIC_MEDIA_URL}${filePath}`;


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
    { key: "title", title: "Title (EN)" },

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

  return {
      district: [...baseColumns, statusColumn],
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


    };


}
