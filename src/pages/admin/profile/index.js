import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/admin/AdminLayout";

export default function AdminProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    citizenship: "",
    codeNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}personal-info/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        const data = await res.json();
        const userData = Array.isArray(data) ? data[0] : data;

        const fullName = [
          userData.first_name_np,
          userData.middle_name_np,
          userData.last_name_np,
        ]
          .filter(Boolean)
          .join(" ");

        setProfile(userData);
        setForm((prev) => ({
          ...prev,
          fullName,
          dob: userData.dob_bs || "",
          citizenship: userData.citizenship_number || "",
          codeNumber: userData.code_number || "",
        }));
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleProfileUpdate = () => {
    console.log("Update Profile:", form);
    // TODO: PUT/PATCH profile API logic
  };

  const handlePasswordUpdate = () => {
    console.log("Update Password:", form);
    // TODO: Password update API logic
  };

  if (!profile) return <p className="p-4">Loading...</p>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className=" p-4 rounded shadow-sm bg-white">
          <h1 className="list-title font-light ">मेरो खाता</h1>
          <p className="text-[12px] text-[#99A6AD]">
            आफ्नो खाताको विवरणहरू अद्यावधिक गर्नुहोस्, जस्तै नाम र पासवर्ड।
          </p>
        </div>

        {/* Profile + Password Form Section */}
        <div className=" rounded shadow-sm overflow-hidden">
          {/* Profile Update Fields */}
          <div className="bg-white p-6 flex flex-col md:flex-row gap-10  border-b border-gray-300">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-[18px] text-[#1C2B36] font-light mb-1">प्रोफाइल अद्यावधिक गर्नुहोस् ।</h2>
              <p className="text-[12px] text-[#99A6AD]">Update your name or personal details.</p>
            </div>

            <div className="md:w-1/2 space-y-4">
              <div>
                <label className="block form-title">पुरा नाम *</label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div>
                <label className="block form-title">जन्म मिति (वि.सं)</label>
                <input
                  type="text"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div>
                <label className="block form-title">नागरिकता नम्बर</label>
                <input
                  type="text"
                  name="citizenship"
                  value={form.citizenship}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div>
                <label className="block form-title">कोड नम्बर</label>
                <input
                  type="text"
                  name="codeNumber"
                  value={form.codeNumber}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="text-right">
                <button
                  onClick={handleProfileUpdate}
                  className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          {/* Password Form Section */}
          <div className="bg-white p-6 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2 space-y-8">
              <h2 className="text-[18px] text-[#1C2B36] font-light mb-1">पासवर्ड परिवर्तन गर्नुहोस् ।</h2>
              <p className="text-[12px] text-[#99A6AD]">
                Ensure your account is using a long, random password.
              </p>
            </div>


            {/* Password Fields */}
            <div className="md:w-1/2 space-y-4">
              <div>
                <label className="block form-title">अहिलेको पासवर्ड</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="mt-4">
                <label className="block form-title">नयाँ पासवर्ड</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="mt-4">
                <label className="block form-title">नयाँ पासवर्ड पुनः प्रविष्ट गर्नुहोस्</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="text-right mt-4">
                <button
                  onClick={handlePasswordUpdate}
                  className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Profile + Password Form Section */}
        {/* <div className="bg-white p-6 rounded shadow-sm flex flex-col md:flex-row gap-10">
          <div className="md:w-1/2 space-y-8">
            <div>
              <h2 className="text-[18px] text-[#1C2B36] font-light mb-1">प्रोफाइल अद्यावधिक गर्नुहोस् ।</h2>
              <p className="text-[12px] text-[#99A6AD]">Update your name or personal details.</p>
            </div>

            <div>
              <h2 className="text-[18px] text-[#1C2B36] font-light mb-1">पासवर्ड परिवर्तन गर्नुहोस् ।</h2>
              <p className="text-[12px] text-[#99A6AD]">
                Ensure your account is using a long, random password.
              </p>
            </div>
          </div>

          <div className="md:w-1/2 space-y-4">

            <div>
              <h2 className="text-[18px] text-[#1C2B36] font-light mb-1">पासवर्ड परिवर्तन गर्नुहोस् ।</h2>
              <p className="text-[12px] text-[#99A6AD]">
                Ensure your account is using a long, random password.
              </p>
            </div>


            <div className="">
              <div>
                <label className="block form-title">अहिलेको पासवर्ड</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="mt-4">
                <label className="block form-title">नयाँ पासवर्ड</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="mt-4">
                <label className="block form-title">नयाँ पासवर्ड पुनः प्रविष्ट गर्नुहोस्</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100 mt-2 text-[14px] text-[#1c2b36] font-normal"
                />
              </div>

              <div className="text-right mt-4">
                <button
                  onClick={handlePasswordUpdate}
                  className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
}
