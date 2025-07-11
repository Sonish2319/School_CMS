import {
  FaBriefcase,
  FaFileAlt,
  FaPaperclip,
  FaEnvelope,
  FaInbox,
  FaCogs,
  FaUsers,
  FaUserTag,
} from "react-icons/fa";

export const myprofile = [
  {
    name: "personal_detail",
    icon: FaCogs,
    link: "/candidate/personaldetail/list",
    permission: "personaldetails"
  },
  {
    name: "education_qualification",
    icon: FaCogs,
    link: "/candidate/educationqualification/list",
    permission: "candidateeducation"
  },
  {
    name: "training_detail",
    icon: FaCogs,
    link: "/candidate/trainingdetails/list",
    permission: "candidatetraining"
  },
  {
    name: "document_releated",
    icon: FaCogs,
    link: "/candidate/documents/list",
    permission: "documenttype"
  },
  {
    name: "Open Vacancy",
    icon: FaCogs,
    link: "/candidate/openvacancy/list",
    permission: "documenttype"
  },
  {
    name: "Submitted Application",
    icon: FaCogs,
    link: "/candidate/apply/list",
    permission: "documenttype"
  },
];
