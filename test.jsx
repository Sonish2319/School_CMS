const [selectedTab, setSelectedTab] = useState("Levels");

const tabs = ["Levels", "Vacancy Items", "Subjects"];

return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-md rounded p-4">
            <h1 className="text-2xl font-bold mb-4">Vacancy Management</h1>

            {/* Tab Navigation */}
            <div className="flex border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`mr-4 py-2 px-4 font-medium ${selectedTab === tab
                            ? "border-b-2 border-blue-600 text-blue-600"
                            : "text-gray-600"
                            }`}
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Levels</h2>
            <p className="text-gray-500">अध्यापन अनुमति पत्र</p>

            <button
                className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                onClick={() => openModal("Add Level")}
            >
                तह थप्नुहोस्
            </button>

            {/* Levels Tab Content */}
            {selectedTab === "Levels" && (
                <>
                    <div className="flex flex-wrap gap-4 mt-4">
                        {allData.map((vacancy, index) => (
                            <div key={vacancy.id || index} className="w-full">
                                <h2 className="text-lg font-semibold">{vacancy?.job_level_detail?.title_np}</h2>
                                <div className="flex items-center mt-2">
                                    <button className="text-red-500" onClick={() => deleteVacancy(vacancy.id)}>
                                        🗑️ Remove Level / Type
                                    </button>
                                    <p className="ml-4">Certificate Decision Date: {vacancy.certificate_decision_date_ad || "N/A"}</p>
                                    <button
                                        className="ml-4 bg-blue-100 text-blue-700 py-1 px-2 rounded"
                                        onClick={() => {
                                            openModal("Edit Decision Date", vacancy);
                                            setRealVacancy(vacancy.id);
                                        }}
                                    >
                                        Edit Decision Date
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Vacancy Items Tab Content */}
            {selectedTab === "Vacancy Items" && (
                <>
                    <h2 className="text-xl font-semibold mb-2">Vacancy Items</h2>

                    {allData.map((vacancy) => (
                        <div key={vacancy.id} className="mt-4">
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full bg-white border border-gray-300 rounded">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-4 py-2 border">Vacancy Number</th>
                                            <th className="px-4 py-2 border">Subjects</th>
                                            <th className="px-4 py-2 border">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {vacancy.vacancy_items?.map((item) => (
                                            <tr key={item.id}>
                                                <td className="px-4 py-2 border text-center">{item.vacancy_number || "N/A"}</td>
                                                <td className="px-4 py-2 border text-center">
                                                    {item.subjects || "N/A"} subjects
                                                    <button
                                                        className="ml-2 bg-blue-500 text-white py-1 px-2 rounded"
                                                        onClick={() => openModal("Add Vacancy Subject", item)}
                                                    >
                                                        Manage
                                                    </button>
                                                </td>
                                                <td className="px-4 py-2 border text-center">
                                                    <button
                                                        className="text-red-500 mr-2"
                                                        onClick={() => deleteVacancyItem(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="bg-blue-500 text-white py-1 px-2 rounded"
                                                        onClick={() => {
                                                            openModal("Edit Vacancy Number", item);
                                                            setRealVacancy(item.id);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <button
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => {
                                    openModal("Add Vacancy Number", vacancy);
                                    setRealVacancy(vacancy.id);
                                }}
                            >
                                Add Vacancy
                            </button>
                        </div>
                    ))}
                </>
            )}

            {/* Subjects Tab Content */}
            {selectedTab === "Subjects" && (
                <>
                    <h2 className="text-xl font-semibold mb-2">Subjects</h2>
                    <p className="text-gray-600 mb-2">Assign subjects to vacancies using the “Manage” button in the Vacancy Items tab.</p>
                </>
            )}
        </div>

        {/* Modal Component stays unchanged */}
    </div>
);
