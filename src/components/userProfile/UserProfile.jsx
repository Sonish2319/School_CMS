import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";

export default function UserProfile({ user, onLogout, userType = "admin" }) {
  const router = useRouter();

  // Define profile routes based on user type
  const profileRoutes = {
    admin: "/admin/profile",
    candidate: "/candidate/profile"
  };

  // Get the appropriate profile route based on userType
  const profileRoute = profileRoutes[userType] || profileRoutes.admin;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <img
          src={user?.profileImage || "/default-avatar.png"}
          alt="User avatar"
          className="w-10 h-10 rounded-full border-2 border-gray-300"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-800 truncate">{user?.email}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
      </div>

      <div className="text-sm space-y-3">
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#5B73E8] transition"
          onClick={() => router.push(profileRoute)}
        >
          <FaUser className="text-[#5B73E8]" />
          <span>मेरो खाता / पासवर्ड</span>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#5B73E8] transition"
          onClick={onLogout}
        >
          <FaSignOutAlt className="text-[#5B73E8]" />
          <span>साइन आउट गर्नुहोस्</span>
        </div>
      </div>
    </div>
  );
}