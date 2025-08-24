// const auth = "auth";
// const admin = "admin";

// const generateRoutes = (base, routes) =>
//   routes.map((route) => `/${base}${route}`);

// const authPaths = [
//   "/index",
//   "/login",
//   "/register",
//   "/reset-password",
//   "/send-email-form",
//   "/otp-form",
//   "/forgot-password",
// ];

// const adminPaths = [
//   "/dashboard",
//   "/gender/list",
//   "/gender/form",
//   "/jobpost/list",
//   "/jobpost/form",
//   "/jobpost/level",
//   "/role/list",
//   "/role/form",
//   "/role/addform",

//   "/commodity_category/list",
//   "/commodity_category/form",

//   "/commodity/list",
//   "/commodity/form",

//   "/district/list",
//   "/district/form",

//   "/notice/list",
//   "/notice/form",

//   "/slider/list",
//   "/slider/form",

//   "/aboutus/list",
//   "/aboutus/form",

//   "/gallery/list",
//   "/gallery/form",

//   "/admission/list",
//   "/admission/form",

//   "/user/list",
//   "/user/form",
//   "/user/app/[id]",
  
//   "/ecozone/list",
//   "/ecozone/form",
//   "/season/list",
//   "/season/form"
// ];

// export const authRoutes = generateRoutes(auth, authPaths);
// export const adminRoutes = generateRoutes(admin, adminPaths);

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
  "/home/cta/list",
  "/home/gallery/list",
  "/home/homeschool/list",
  "/home/homeStudent/list",
  "/home/voice/list",
  "/home/image/list",

  // ===== About Us =====
  "/aboutus/hero/list",
  "/aboutus/hero/form",
  
  "/aboutus/mission-vision/list",
  "/aboutus/core-values/list",
  "/aboutus/history/list",
  "/aboutus/statistics/list",
  "/aboutus/leadership/list",
  "/aboutus/cta-newsletter/list",

  // ===== Fund =====
  "/fund/hero/list",
  "/fund/commitment/list",
  "/fund/financialaid/list",
  "/fund/faq/list",
  "/fund/cta/list",
  "/fund/importantdates/list",
  "/fund/merit/list",
  "/fund/payment/list",
  "/fund/tuition/list",

  // ===== Contact =====
  "/contact/hero/list",
  "/contact/touch/list",
  "/contact/department/list",
  "/contact/visit/list",
  "/contact/faq/list",

  // ===== Event =====
  "/event/hero/list",
  "/event/upcoming/list",
  "/event/calendar/list",
  "/event/semester/list",

  // ===== Gallery =====
  "/gallery/hero/list",
  "/gallery/category/list",
  "/gallery/grid/list"
];

export const authRoutes = generateRoutes(auth, authPaths);
export const adminRoutes = generateRoutes(admin, adminPaths);
