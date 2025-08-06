const auth = "auth";
const admin = "admin";

const generateRoutes = (base, routes) =>
  routes.map((route) => `/${base}${route}`);

const authPaths = [
  "/index",
  "/login",
  "/register",
  "/reset-password",
  "/send-email-form",
  "/otp-form",
  "/forgot-password",
];

const adminPaths = [
  "/dashboard",
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

  "/aboutus/list",
  "/aboutus/form",

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
  "/season/form"
];

export const authRoutes = generateRoutes(auth, authPaths);
export const adminRoutes = generateRoutes(admin, adminPaths);
