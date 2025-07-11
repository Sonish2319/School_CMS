import { useSearchContext } from "@/context/SearchContext";
import { useFetchData } from "@/store/hooks/useFetchData";
import React from "react";
import { images } from "@/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { searchQuery } = useSearchContext();

  const { data, error, loading } = useFetchData(`job-list?search=${searchQuery}`, {
    method: "GET",
  });

  const handleNavigation = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Header Strip */}
      <div className="bg-blue-900 w-full h-auto py-2">
        <div className="w-full max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row justify-between sm:items-center text-white text-sm space-y-2 md:space-y-0">
          <h1>01-6637873/01-6638151, 01-6637872 (Fax)</h1>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-gray-200">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white text-white mb-12 border-b shadow-md">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-4 flex flex-col gap-[8px] sm:gap-0 md:flex-row justify-between sm:items-center space-y-4 md:space-y-0">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4 mb-0">
            <img
              src={images.nepallogo}
              alt="Nepal Government Logo"
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <h1 className="text-blue-900 text-base sm:text-[14px] font-bold">नेपाल सरकार</h1>
              <h2 className="text-blue-900 text-sm sm:text-base sm:text-[16px]">शिक्षक सेवा आयोग</h2>
            </div>
          </div>

          {/* Portal Title */}
          <div className="sm:text-center m-0">
            <h1 className="text-gray-600 text-[24px] font-bold">
              शिक्षक सेवा आयोग दरखास्त पोर्टल
            </h1>
          </div>  

          {/* User Guide Link */}
          <div>
            <a href="#" className="hover:underline text-black sm:text-[16px] font-bold text-gray-600">
              प्रयोगकर्ता पुस्तिका
            </a>
          </div>
        </div>
      </header>

      {/* Notification + Main Section */}
      <div className="w-full max-w-[1440px] mx-auto px-4">
        <div className="bg-white rounded-[8px] p-4 sm:p-6">
          {/* Notification Section */}
          <div className="space-y-4">
            <div className="bg-[#CFF4FC] border border-[#63b3c5] rounded-lg p-4">
              <p className="font-bold mb-2 text-[#055160]">
                शिक्षक सेवा आयोग दरखास्त पोर्टल एसएमएस (SMS) सुविधाका बारेमा:
              </p>
              <ul className="list-disc ml-6 space-y-1 text-sm sm:text-base text-[#055160]">
                <li>
                  रजिस्टर गर्दा तथा पासवर्ड परिवर्तन गर्नु पर्दा आफ्नो मोबाइलमा SMS बाट OTP
                  कोड पाउनु,
                </li>
                <li>
                  आफ्नो प्रोफाइल अपडेट गर्न पाउनु तथा आफूले पहिले ट्याक्ट गरेको तहको जानकारी पाउनु।
                </li>
                <li>प्रारम्भिक तहमा TSCL SPACE PRI टाइप गरी 34001 मा SMS पठाउनुहोस्।</li>
                <li>माध्यमिक तहमा TSCL SPACE SEC टाइप गरी 34001 मा SMS पठाउनुहोस्।</li>
              </ul>
            </div>

            <div className="bg-[#F8D7DA] border border-[#c33642] rounded-lg p-4 text-sm sm:text-base">
              <p className="text-[#842029]">
                <strong>एक ID बाट एक भन्दा बढी उम्मेदवारले दरखास्त फारम भर्न पाइने छैन।</strong>{" "}
                <br />
                दरखास्त फारम भरेपछि{" "}
                <span className="font-bold text-red-500">Logout गर्न नबिर्सनुहोला।</span>
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="mt-6">
            {/* Action Section */}
            <div className="flex flex-col items-center mb-6">
              <button
                onClick={handleNavigation}
                className="bg-black text-white py-2 px-4 rounded-[5px] text-sm sm:text-base mb-4"
              >
                Account Login/Register
              </button>
              <h2 className="text-lg sm:text-[32px] font-light">
                Open License Applications List
              </h2>
            </div>

            {/* Data Display */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error loading data.</p>}
            {data && data.results && data.results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.results.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-300 rounded-lg p-4 shadow text-sm sm:text-base"
                  >
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2">
                      <strong>Submission Date:</strong>{" "}
                      {item.last_submission_date_bs || "N/A"}{" "}
                      {item.last_submission_time || ""}
                    </p>
                    <p>
                      <strong>Double Charge Submission Date:</strong>{" "}
                      {item.double_charge_last_submission_date_bs || "N/A"}{" "}
                      {item.double_charge_last_submission_time || ""}
                    </p>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              !loading && <p>No applications found.</p>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
