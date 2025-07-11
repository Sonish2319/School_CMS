import { useFetchDataGroup } from "@/store/hooks/useFetchDataGroup";
import { useApiRequest } from "@/utils/helper";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const VacancyManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [levels, setLevels] = useState([]);
  const [decisionDate, setDecisionDate] = useState("");
  const [vacancyNumber, setVacancyNumber] = useState("");
  const [newVacancyNumber, setNewVacancyNumber] = useState("");
  const [newVacancyId, setNewVacancyId] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [realVacancy, setRealVacancy] = useState("");
  const [vacancyItemTable, setVacancyItemTable] = useState([]);
  const [allData, setAllData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(null);

  const router = useRouter();
  const { id } = router.query;
  const { sendRequest, loading: submitLoading, error: submitError } = useApiRequest();
  const { data, errors, loading } = useFetchDataGroup([
    `job-vacancy/${id}`,
    "job-level",
    "subject-setup",
  ]);

  useEffect(() => {
    if (data?.length) {
      const [vacancyData, levelData, subjectData] = data;

      if (vacancyData) {
        setDecisionDate(vacancyData?.vacancies?.certificate_decision_date_ad || "");
        setVacancyItemTable(vacancyData?.vacancies?.vacancy_items || []);
        setAllData(vacancyData?.vacancies || []);
        if (!selectedTab && Array.isArray(vacancyData?.vacancies) && vacancyData?.vacancies.length) {
          setSelectedTab(0); // auto-select first level
        }
      }

      if (levelData?.results) {
        setLevels(levelData.results);
      }

      if (subjectData?.results) {
        setSubjectList(subjectData.results);
      }
    }
  }, [data, errors]);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
    setSelectedLevel("");
    setVacancyNumber("");
    setNewVacancyNumber("");
    setNewVacancyId("");
    setSelectedSubjects([]);
  };

  const handleCheckboxChange = (subjectId) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subjectId)
        ? prevSelected.filter((id) => id !== subjectId)
        : [...prevSelected, subjectId]
    );
  };

  const handleAddLevel = async () => {
    if (!selectedLevel) return;

    const formData = { job_level: selectedLevel, post: id };

    try {
      await sendRequest("job-vacancy/", "POST", formData);
      closeModal();
    } catch (err) {
      console.error("Failed to save level", err);
    }
  };

  const handleEditDecisionDate = async () => {
    if (!decisionDate) return;

    const formData = { certificate_decision_date_bs: decisionDate, post_id: id };

    try {
      await sendRequest(`update-certificate-date/${realVacancy}/`, "PUT", formData);
      closeModal();
    } catch (err) {
      console.error("Failed to save decision date", err);
    }
  };

  const handleAddVacancy = async () => {
    if (!newVacancyNumber) return;

    const formData = { vacancy_id: realVacancy, vacancy_number: newVacancyNumber };

    try {
      await sendRequest("job-vacancy-items/", "POST", formData);
      closeModal();
    } catch (err) {
      console.error("Failed to add vacancy", err);
    }
  };

  const handleAddSubject = async () => {
    if (!selectedSubjects.length) return;

    const formData = { vacancy: realVacancy, subject: selectedSubjects, is_published: true };

    try {
      await sendRequest("vacancy-subject/", "POST", formData);
      closeModal();
    } catch (err) {
      console.error("Failed to add subject", err);
    }
  };

  const deleteVacancyItem = async (vacancyId) => {
    try {
      await sendRequest(`job-vacancy-items/${vacancyId}/`, "DELETE");
      closeModal();
    } catch (err) {
      console.error("Failed to delete vacancy", err);
    }
  };

  const deleteVacancy = async (id) => {
    try {
      await sendRequest(`job-vacancy/${id}/`, "DELETE");
      closeModal();
    } catch (err) {
      console.error("Failed to delete vacancy", err);
    }
  };


  const handleEditVacancyNumber = async () => {
    const formData = { vacancy_number: vacancyNumber };
    try {
      await sendRequest(`job-vacancy-items/${realVacancy}/`, "PUT", formData);
      closeModal();
    } catch (err) {
      console.error("Failed to delete vacancy", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between bg-white shadow-md rounded-lg p-4 sm:p-6">
          <div>
            <h1 className="list-title font-light">Last Level</h1>
            <p className="text-sm text-[#99A6AD]">अध्यापन अनुमति पत्र</p>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6">
          <button
            className="bg-[#28A745] text-white py-2 px-4 rounded w-full sm:w-auto text-sm sm:text-base"
            onClick={() => openModal("Add Level")}
          >
            तह थप्नुहोस्
          </button>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 border-b border-[#58666E]">
            {allData.map((item, index) => (
              <button
                key={item.id || index}
                className={`px-4 py-2 border-b-2 text-sm font-light ${selectedTab === index
                  ? "border-blue-500 font-bold text-[#1C2B36]"
                  : "border-transparent text-[#1C2B36]"
                  }`}
                onClick={() => setSelectedTab(index)}
              >
                {item?.job_level_detail?.title_np || `Level ${index + 1}`}
              </button>
            ))}
          </div>

          {/* Selected Vacancy Data */}
          {allData[selectedTab] && (
            <div className="mt-4">
              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4">
                {/* Removal, Certificate Decision Date, Edit */}
                <div className="flex flex-col gap-2 mt-2">
                  <button
                    className="text-red-500 flex items-center text-sm"
                    onClick={() => deleteVacancy(allData[selectedTab].id)}
                  >
                    <span className="mr-1">🗑️</span> Remove Level / Type
                  </button>

                  <p className="text-sm">
                    Certificate Decision Date:{" "}
                    {allData[selectedTab].certificate_decision_date_ad || "N/A"}
                  </p>

                  <button
                    className="px-4 py-2 bg-[#5B73E8] text-white text-sm rounded hover:bg-blue-700 transition"
                    onClick={() => {
                      openModal("Edit Decision Date", allData[selectedTab]);
                      setRealVacancy(allData[selectedTab].id);
                    }}
                  >
                    Edit Decision Date
                  </button>
                </div>

                {/* Add Vacancy Button */}
                <button
                  className="px-4 py-2 bg-[#5B73E8] text-white text-sm rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    openModal("Add Vacancy Number", allData[selectedTab]);
                    setRealVacancy(allData[selectedTab].id);
                  }}
                >
                  Add Vacancy
                </button>
              </div>

              {/* Vacancy Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full table-auto border-collapse rounded-lg shadow-md">
                  <thead>
                    <tr className="text-gray-500 text-left border-b bg-[#EBEEF6]">
                      <th className="py-3 px-5 text-xs font-medium border border-gray-300">Vacancy Number</th>
                      <th className="py-3 px-5 text-xs font-medium border border-gray-300">Subjects</th>
                      <th className="py-3 px-5 text-xs font-medium border border-gray-300">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allData[selectedTab].vacancy_items?.map((item, idx) => (
                      <tr key={item.id || idx}>
                        <td className="py-3 px-5 text-sm text-[#212529] border border-gray-300">
                          {item.vacancy_number || "N/A"}
                        </td>
                        <td className="py-3 px-5 text-sm text-[#212529] border border-gray-300">
                          {item.subjects || "N/A"} subjects
                          <button
                            className="ml-2 px-3 py-1 bg-[#5B73E8] text-white text-sm rounded hover:bg-blue-700 transition"
                            onClick={() => {
                              openModal("Add Vacancy Subject", item);
                              setRealVacancy(item.vacancy);
                            }}
                          >
                            Manage
                          </button>
                        </td>
                        <td className="py-3 px-5 text-sm text-[#212529] border border-gray-300">
                          <div className="flex flex-wrap gap-2">
                            <button
                              className="px-3 py-1 bg-[#5B73E8] text-white rounded hover:bg-blue-700 transition"
                              onClick={() => {
                                openModal("Edit Vacancy Number", item);
                                setRealVacancy(item.id);
                              }}
                            >
                              Edit
                            </button>

                            <button
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                              onClick={() => deleteVacancyItem(item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white rounded shadow-md p-4 mx-4 sm:mx-auto mt-20 w-full max-w-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        closeTimeoutMS={300}
      >
        <h2 className="text-[21px] font-light text-[#1C2B36] mb-4">{modalContent}</h2>

        {/* Add Level */}
        {modalContent === "Add Level" && (
          <div className="">
            <label className="block form-title">
              Select Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100"
            >
              <option value="">Select Level</option>
              {levels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.title_np}
                </option>
              ))}
            </select>

            {/* Apply and Close Buttons */}
            <div className="flex gap-[20px] border-t border-gray-200 mt-5">
              <button
                className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
                onClick={handleAddLevel}
              >
                Apply
              </button>

              <button
                className=" text-gray-600 text-[14px] rounded hover:underline transition mt-5 mb-5"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Edit Decision Date */}
        {modalContent === "Edit Decision Date" && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Certificate Decision Date</h2>

            <div className="mb-4">
              <label
                htmlFor="decision-date"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Decision Date
              </label>
              <input
                id="decision-date"
                type="date"
                value={decisionDate}
                onChange={(e) => setDecisionDate(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 border-t pt-4 border-gray-200 mt-6">
              <button
                className="bg-[#5B73E8] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded shadow-sm transition"
                onClick={handleEditDecisionDate}
              >
                Save Changes
              </button>
              <button
                className="text-sm text-gray-600 hover:underline transition"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}


        {/* Edit Vacancy Number */}
        {modalContent === "Edit Vacancy Number" && (
          <div>
            <label className="block form-title">Vacancy Number</label>
            <input
              type="text"
              value={vacancyNumber}
              onChange={(e) => setVacancyNumber(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100"
            />

            {/* Apply and Close Buttons */}
            <div className="flex gap-[20px] border-t border-gray-200 mt-5">
              <button
                className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
                onClick={handleEditVacancyNumber}
              >
                Save
              </button>

              <button
                className=" text-gray-600 text-[14px] rounded hover:underline transition mt-5 mb-5"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Vacancy Number */}
        {modalContent === "Add Vacancy Number" && (
          <div>
            <label className="block form-title">Vacancy Number</label>
            <input
              type="text"
              value={newVacancyNumber}
              onChange={(e) => setNewVacancyNumber(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100"
            />

            {/* Apply and Close Buttons */}
            <div className="flex gap-[20px] border-t border-gray-200 mt-5">
              <button
                className="bg-[#5B73E8] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded shadow-sm transition"
                onClick={handleAddVacancy}
              >
                Confirm
              </button>

              <button
                className=" text-gray-600 text-[14px] rounded hover:underline transition mt-5 mb-5"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Vacancy Subject */}
        {modalContent === "Add Vacancy Subject" && (
          <div>
            <h2 className="block form-title mb-4">Select Subjects to Add</h2>

            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded-md p-3 space-y-2 bg-gray-50">
              {subjectList.length > 0 ? (
                subjectList.map((subject) => (
                  <label
                    key={subject.id}
                    htmlFor={`subject-${subject.id}`}
                    className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={`subject-${subject.id}`}
                      value={subject.id}
                      checked={selectedSubjects.includes(subject.id)}
                      onChange={() => handleCheckboxChange(subject.id)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span>
                      {subject.title_np}{" "}
                      <span className="text-gray-500 text-xs">({subject.title})</span>
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-gray-500">No subjects available.</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6 border-t border-gray-200 pt-4">
              <button
                className="bg-[#5B73E8] hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded shadow-sm transition"
                onClick={handleAddSubject}
              >
                Confirm Selection
              </button>
              <button
                className="text-sm text-gray-600 hover:underline transition"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        )}


        {/* Manage Subjects */}
        {modalContent === "Manage Subjects" && (
          <div>
            <label className="block text-gray-700 mb-2">Manage Subjects</label>
            <p className="text-gray-600">Feature coming soon...</p>
          </div>
        )}

        {/* <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          onClick={closeModal}
        >
          Close
        </button> */}
      </Modal>
    </div>

  );

};

export default VacancyManagement;
