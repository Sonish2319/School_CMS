import { FaEye } from "react-icons/fa";

export default function getColumns({ handleView }) {
  return {
    application: [
      { key: "id", title: "ID" },
      { key: "job_detail.title", title: "Job", render: (_, record) => record.job_detail?.title || "N/A" },
      { key: "applied_subject", title: "Applied Subject" },
      { key: "vacancy", title: "Vacancy" },
      { key: "province_detail.title_np", title: "Competing Province", render: (_, record) => record.province_detail?.title_np || "N/A" },

      { key: "candidate_detail.first_name_np", title: "Candidate ID", render: (_, record) => record.candidate_detail?.first_name_np || "N/A" },

      { key: "created_date", title: "Created Date" },
      {
        key: "action",
        title: "Action",
        render: (filePath, record) => (
          <a
            onClick={() => handleView(record)}
            style={{ cursor: "pointer", color: "blue", textDecoration: "none" }}
          >
            <FaEye size={20} />
          </a>
        ),
      },
    ],
  };
}
