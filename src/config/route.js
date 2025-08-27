const auth = "auth";
const admin = "admin";

// Helper to prepend base path
const generateRoutes = (base, routes) =>
  routes.map((route) => `/${base}${route}`);

// Auth routes
const authPaths = [
  "/index",
  "/login",
  "/register",
  "/reset-password",
  "/send-email-form",
  "/otp-form",
  "/forgot-password",
];

// Admin routes
const adminPaths = [
  "/dashboard",

  // Generic Entities
  "/gender/list",
  "/gender/form",

  "/jobpost/list",
  "/jobpost/form",
  "/jobpost/level",

  "/role/list",
  "/role/form",
  "/role/addform",

  "/commodity_category/list",
  "/commodity_category/form",

  "/commodity/list",
  "/commodity/form",

  "/district/list",
  "/district/form",

  "/notice/list",
  "/notice/form",

  "/slider/list",
  "/slider/form",

  "/gallery/list",
  "/gallery/form",

  "/admission/list",
  "/admission/form",

  "/user/list",
  "/user/form",
  "/user/app/[id]",

  "/ecozone/list",
  "/ecozone/form",

  "/season/list",
  "/season/form",

  // ===== Home =====
  "/home/hero/list",
  "/home/hero/form",

  "/home/cta/list",
  "/home/cta/form",

  "/home/gallery/list",
  "/home/gallery/form",

  "/home/homeschool/list",
  "/home/homeschool/form",

  "/home/homeStudent/list",
  "/home/homeStudent/form",

  "/home/voice/list",
  "/home/voice/form",

  "/home/image/list",
  "/home/image/form",

  // ===== About Us =====
  "/aboutus/hero/list",
  "/aboutus/hero/form",
  
  "/aboutus/mission-vision/list",
  "/aboutus/mission-vision/form",

  "/aboutus/core-values/list",
  "/aboutus/core-values/form",
  
  "/aboutus/history/list",
  "/aboutus/history/form",
  
  "/aboutus/statistics/list",
  "/aboutus/statistics/form",

  "/aboutus/leadership/list",
  "/aboutus/leadership/form",

  "/aboutus/newsletter/list",
  "/aboutus/newsletter/form",

  "/aboutus/cta/list",
  "/aboutus/cta/form",

  // ===== Admission =====

  "/admission/hero/list",
  "/admission/hero/form",
  
  "/admission/applicationProcess/list",
  "/admission/applicationProcess/form",

  "/admission/contact/list",
  "/admission/contact/form",
  
  "/admission/faq/list",
  "/admission/faq/form",
  
  "/admission/requirement/list",
  "/admission/requirement/form",

  "/admission/director/list",
  "/admission/director/form",

  "/admission/timeline/list",
  "/admission/timeline/form",
  
  // ===== Fund =====
  "/fund/hero/list",
  "/fund/hero/form",

  "/fund/commitment/list",
  "/fund/commitment/form",

  "/fund/financialaid/list",
  "/fund/financialaid/form",

  "/fund/faq/list",
  "/fund/faq/form",

  "/fund/cta/list",
  "/fund/cta/form",

  "/fund/importantdates/list",
  "/fund/importantdates/form",

  "/fund/merit/list",
  "/fund/merit/form",

  "/fund/payment/list",
  "/fund/payment/form",

  "/fund/tuition/list",
  "/fund/tuition/form",

  // ===== Contact =====
  "/contact/hero/list",
  "/contact/hero/form",

  "/contact/touch/list",
  "/contact/touch/form",

  "/contact/department/list",
  "/contact/department/form",

  "/contact/visit/list",  
  "/contact/visit/form",

  "/contact/faq/list",
  "/contact/faq/form",

  // ===== Event =====
  "/event/hero/list",
  "/event/hero/form",

  "/event/upcoming/list",
  "/event/upcoming/form",

  "/event/calender/list",
  "/event/calender/form",

  "/event/semester/list",
  "/event/semester/form",
  
  // ===== Gallery =====
  "/gallery/hero/list",
  "/gallery/hero/form",

  "/gallery/category/list",
  "/gallery/category/form",

  "/gallery/photos/list",
  "/gallery/photos/form"
  
];

export const authRoutes = generateRoutes(auth, authPaths);
export const adminRoutes = generateRoutes(admin, adminPaths);
