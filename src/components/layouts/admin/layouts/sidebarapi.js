import {
  FaBriefcase,
  FaFileAlt,
  FaPaperclip,
  FaEnvelope,
  FaInbox,
  FaCogs,
  FaUsers,
  FaUserTag,
  FaClipboard,
  FaCertificate,
  FaWrench
} from "react-icons/fa";

export const jobPostsRoutes = [
  { name: "Gallery", icon: FaBriefcase, link: "/admin/jobpost/list" },
  { name: "Feedback", icon: FaBriefcase, link: "/admin/commodity_category/list" },
  { name: "Contact", icon: FaBriefcase, link: "/admin/commodity/list" }
];

export const settingsRoutes = [
  { name: "Notice", icon: FaCogs, link: "/admin/notice/list" },
  { name: "Admission", icon: FaCogs, link: "/admin/ecozone/list" },
  { name: "Users", icon: FaCogs, link: "/admin/season/list" }

];

export const accessRightsRoutes = [
  { name: "role", icon: FaUserTag, link: "/admin/role/list" }
];
