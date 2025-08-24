// import {
//   FaBriefcase,
//   FaFileAlt,
//   FaPaperclip,
//   FaEnvelope,
//   FaInbox,
//   FaCogs,
//   FaUsers,
//   FaUserTag,
//   FaClipboard,
//   FaCertificate,
//   FaWrench
// } from "react-icons/fa";

// export const jobPostsRoutes = [
//   { name: "Gallery", icon: FaBriefcase, link: "/admin/gallery/list" },
//   { name: "Slider", icon: FaBriefcase, link: "/admin/slider/list" },
//   { name: "About Us", icon: FaBriefcase, link: "/admin/aboutus/list" },
//   { name: "Feedback", icon: FaBriefcase, link: "/admin/commodity_category/list" },
//   { name: "Contact", icon: FaBriefcase, link: "/admin/commodity/list" }
// ];

// export const settingsRoutes = [
//   { name: "Notice", icon: FaCogs, link: "/admin/notice/list" },
//   { name: "Admission", icon: FaCogs, link: "/admin/admission/list" },
//   { name: "Users", icon: FaCogs, link: "/admin/user/list" }

// ];

// export const accessRightsRoutes = [
//   { name: "role", icon: FaUserTag, link: "/admin/role/list" }
// ];

import {
  FaBriefcase,
  FaEnvelope,
  FaCalendarAlt,
  FaImage,
  FaHome,
  FaMoneyBill,
  FaUniversity,
  FaFileInvoiceDollar,
  FaComments,
  FaUsers,
  FaQuestionCircle,
  FaClock,
  FaChartBar,
  FaSchool,
  FaBullhorn,
  FaEye,
  FaStar,
  FaPaperPlane,
  FaCogs,
  FaHistory,
  FaFileAlt,
  FaPaperclip,
  FaWrench,
  FaFileSignature,
  FaFileContract,
  FaFileArchive,
  FaFileCode,
  FaUserTag,
  FaMapMarkerAlt
}  from "react-icons/fa";

export const jobPostsRoutes = [
  // { name: "Gallery", icon: FaBriefcase, link: "/admin/gallery/list" },
  // { name: "Slider", icon: FaBriefcase, link: "/admin/slider/list" },

  {
    name: "Home",
    icon: FaHome,
    children: [
      { name: "Hero", icon: FaBullhorn, link: "/admin/home/hero/list" },
      { name: "CTA", icon: FaBullhorn, link: "/admin/home/cta/list" },
      { name: "Gallery", icon: FaImage, link: "/admin/home/gallery/list" },
      { name: "School Info", icon: FaUniversity, link: "/admin/home/homeschool/list" },
      { name: "Student Info", icon: FaUsers, link: "/admin/home/homeStudent/list" },
      { name: "Voice", icon: FaComments, link: "/admin/home/voice/list" },
      { name: "Image Section", icon: FaImage, link: "/admin/home/image/list" },
    ]
  },

  {
    name: "About Us",
    icon: FaUsers,
    children: [
      { name: "Hero Section", icon: FaEye, link: "/admin/aboutus/hero/list" },
      { name: "Mission & Vision", icon: FaStar, link: "/admin/aboutus/mission-vision/list" },
      { name: "Core Values", icon: FaBriefcase, link: "/admin/aboutus/core-values/list" },
      { name: "History", icon: FaHistory, link: "/admin/aboutus/history/list" },
      { name: "Statistics", icon: FaChartBar, link: "/admin/aboutus/statistics/list" },
      { name: "Leadership", icon: FaUsers, link: "/admin/aboutus/leadership/list" },
      { name: "Newsletter", icon: FaPaperPlane, link: "/admin/aboutus/newsletter/list" },
      { name: "CTA", icon: FaPaperPlane, link: "/admin/aboutus/cta/list" }

    ]
  },

  {
    name: "Admission",
    icon: FaUsers,
    children: [
      { name: "Hero Section", icon: FaEye, link: "/admin/admission/hero/list" },
      { name: "Application Process", icon: FaStar, link: "/admin/admission/applicationProcess/list" },
      { name: "Financial Aid", icon: FaBriefcase, link: "/admin/admission/financialAid/list" },
      { name: "Funding FAQ", icon: FaHistory, link: "/admin/admission/fundingFAQ/list" },
      { name: "Fund CTA", icon: FaChartBar, link: "/admin/admission/fundCta/list" },
      { name: "Important Dates", icon: FaUsers, link: "/admin/admission/importantDates/list" },
      { name: "Merit", icon: FaPaperPlane, link: "/admin/admission/merit/list" },
      { name: "Payment Plan", icon: FaCogs, link: "/admin/admission/paymentPlan/list" },
      { name: "Tuition Fees", icon: FaCogs, link: "/admin/admission/tuitionFees/list" }
    ]
  },
  {
    name: "Fund",
    icon: FaMoneyBill,
    children: [
      { name: "Hero Section", icon: FaBullhorn, link: "/admin/fund/hero/list" },
      { name: "Commitment", icon: FaFileInvoiceDollar, link: "/admin/fund/commitment/list" },
      { name: "Financial Aid", icon: FaFileInvoiceDollar, link: "/admin/fund/financialaid/list" },
      { name: "FAQ", icon: FaQuestionCircle, link: "/admin/fund/faq/list" },
      { name: "CTA", icon: FaBullhorn, link: "/admin/fund/cta/list" },
      { name: "Important Dates", icon: FaClock, link: "/admin/fund/importantdates/list" },
      { name: "Merit", icon: FaUniversity, link: "/admin/fund/merit/list" },
      { name: "Payment Plan", icon: FaFileInvoiceDollar, link: "/admin/fund/payment/list" },
      { name: "Tuition Fees", icon: FaFileInvoiceDollar, link: "/admin/fund/tuition/list" }
    ]
  },
  {
    name: "Contact",
    icon: FaEnvelope,
    children: [
      { name: "Hero Section", icon: FaBullhorn, link: "/admin/contact/hero/list" },
      { name: "Get In Touch", icon: FaComments, link: "/admin/contact/touch/list" },
      { name: "Departments", icon: FaUsers, link: "/admin/contact/department/list" },
      { name: "Visit Us", icon: FaMapMarkerAlt, link: "/admin/contact/visit/list" },
      { name: "FAQ", icon: FaQuestionCircle, link: "/admin/contact/faq/list" }
    ]
  },
  {
    name: "Event",
    icon: FaCalendarAlt,
    children: [
      { name: "Hero Section", icon: FaBullhorn, link: "/admin/event/hero/list" },
      { name: "Upcoming Events", icon: FaCalendarAlt, link: "/admin/event/upcoming/list" },
      { name: "Calendar", icon: FaCalendarAlt, link: "/admin/event/calendar/list" },
      { name: "Semester Plan", icon: FaSchool, link: "/admin/event/semester/list" }
    ]
  },
  {
    name: "Gallery",
    icon: FaImage,
    children: [
      { name: "Hero Section", icon: FaBullhorn, link: "/admin/gallery/hero/list" },
      { name: "Categories", icon: FaBriefcase, link: "/admin/gallery/category/list" },
      { name: "Gallery Grid", icon: FaImage, link: "/admin/gallery/grid/list" }
    ]
  }

  // { name: "Feedback", icon: FaBriefcase, link: "/admin/commodity_category/list" },
  // { name: "Contact", icon: FaBriefcase, link: "/admin/commodity/list" }
];

export const settingsRoutes = [
  // { name: "Notice", icon: FaCogs, link: "/admin/notice/list" },
  // { name: "Admission", icon: FaCogs, link: "/admin/admission/list" },
  { name: "Users", icon: FaCogs, link: "/admin/user/list" }
];

export const accessRightsRoutes = [
  { name: "role", icon: FaUserTag, link: "/admin/role/list" }
];
