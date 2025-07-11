import { FaCircle } from "react-icons/fa";

export default function getColumns({
  handleJob,
  handleApplication,
  handleResult,
  showModal,
}) {
  const baseColumns = [
    { key: "id", title: "ID" },
    { key: "title", title: "Title" },
    { key: "seq", title: "Rank" },
  ];

  const isPublishedColumn = {
    key: "is_published",
    title: "Is Published",
    render: (value) => (
      <span
        style={{
          color: value === true ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        {value === true ? "Published" : "Not Published"}
      </span>
    ),
  };

  return {
    job_posts: [
      {
        key: "title",
        title: "Title",
        render: (_, record) => (
          <div
            className="flex items-center space-x-2"
            style={{ width: "211px" }}
          >
            <span>{record.title || "N/A"}</span>
            <button
              className="text-[#5B73E8] text-[12px] hover:text-blue-700 px-3 py-1 border rounded border-none bg-[#ECF2FF]"
              style={{ minWidth: "100px" }}
              onClick={() => handleJob(record.id)}
            >
              Click to manage
            </button>
          </div>
        ),
      },
      {
        key: "type.title",
        title: "Post Type",
        render: (_, record) => record.type?.title || "N/A",
      },
      { key: "details", title: "Details" },
      { key: "last_submission_date_bs", title: "Last Submission Date (BS)" },
      {
        key: "double_charge_last_submission_date_bs",
        title: "Double Charge Last Submission Date (BS)",
      },
      {
        key: "application_count",
        title: "Application",
        render: (_, record) => (
          <div className="flex items-center">
            <button
              className="text-blue-500 hover:text-blue-700 px-3 py-1 border rounded border-none bg-blue-100"
              onClick={() => handleApplication(record.id)}
            >
              { record.application_count }
            </button>
          </div>
        ),
      },
      {
        key: "is_published",
        title: "Status",
        render: (_, record) => (
          <div style={{ width: "120px" }}>
            <div className="flex">
              <FaCircle
                color={record.is_published ? "green" : "red"}
                title={
                  record.is_published ? "Published" : "Not Published"
                }
                style={{ fontSize: "1rem", verticalAlign: "middle" }}
              />
              <span style={{ marginLeft: "8px" }}>
                {record.is_published ? "Published" : "Not Published"}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "admitcard",
        title: "Admit Card",
        render: (_, record) => (
          <div style={{ width: "120px" }}>
            <div className="flex">
              <FaCircle
                color={record.is_admit_card_published ? "green" : "red"}
                title={
                  record.is_admit_card_published ? "Published" : "Not Published"
                }
                style={{ fontSize: "1rem", verticalAlign: "middle" }}
              />
              <span style={{ marginLeft: "8px" }}>
                {record.is_admit_card_published ? "Published" : "Not Published"}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "result",
        title: "Result",
        render: (_, record) => (
          <div style={{ width: "120px" }}>
            <div className="flex">
              <FaCircle
                color={record.is_result_published ? "green" : "red"}
                title={
                  record.is_result_published ? "Published" : "Not Published"
                }
                style={{ fontSize: "1rem", verticalAlign: "middle" }}
              />
              <span style={{ marginLeft: "8px" }}>
                {record.is_result_published ? "Published" : "Not Published"}
              </span>
            </div>
            <div>
              <button
                className="text-[#5B73E8] text-[12px] hover:text-blue-700 px-3 py-1 border rounded border-none bg-[#ECF2FF] mt-2"
                style={{ minWidth: "100px" }}
                onClick={() => handleResult(record.id)}
              >
                Click to manage
              </button>
            </div>
          </div>
        ),
      },
    ],
  };
}
