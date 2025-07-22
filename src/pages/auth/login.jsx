// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import Form from "../../components/form/form.js";
// import {roles} from '@/config/validation.js'

// export default function Login() {
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [generatedCaptcha, setGeneratedCaptcha] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

//   const handleCaptchaChange = (newCaptcha) => {
//     setGeneratedCaptcha(newCaptcha);
//   };

//   const handleLogin = async (formData) => {
//     const { username, password } = formData;

//     if (!username || !password) {
//       setError("Please fill out all fields including CAPTCHA.");
//       return;
//     }

//     if (captchaInput.trim() !== generatedCaptcha.trim()) {
//       setError("Invalid CAPTCHA. Try again.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       if (!BASE_URL) {
//         throw new Error("Internal server error. Please try again later.");
//       }

//       const url = `${BASE_URL}token/`;

//       const response = await fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       localStorage.setItem("access", data.access);

//       // Set roles and permissions
//       var roleName = null;
//       if (data.userdata && data.userdata.groups) {
//         roleName = data.userdata.groups[0].name;
//         localStorage.setItem("role_name", roleName);
//       }

//       if (data.userdata && data.userdata.permissions) {
//         localStorage.setItem("permissions", JSON.stringify(data.userdata.permissions));
//       }

//       // Redirection logic
//       let redirectTo = null;
//       if (roleName === roles.candidate) {
//         redirectTo = "candidate";
//       } else if (roleName === roles.admin) {
//         redirectTo = "admin";
//       } else {
//         throw new Error("Unauthorized role. Please contact support.");
//       }

//       router.push(`/${redirectTo}/dashboard`);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleForgetPasssword = () => {
//     router.push('/auth/forgot-password')
//   }

//   const fields = [
//     { label: "Username", name: "username", type: "text", initialValue: "" },
//     { label: "Password", name: "password", type: "password", initialValue: "" },
//     { label: "CAPTCHA", name: "captchaInput", type: "text", initialValue: "" },
//   ];

//   return (
//     // <div className="min-h-screen flex items-center justify-center">
//     //   <div className=" w-[502px] flex flex-col gap-[24px]">
//     //     <div>
//     //       <h1 className="text-[28px] font-medium text-center text-gray-700">शिक्षक सेवा आयोग</h1>
//     //     </div>

//     //     <div className=" bg-white p-4">
//     //       <h2 className="text-[20px] font-medium mb-6 text-gray-700">Sign in to your account</h2>
//     //       {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//     //       {loading && <p className="text-center text-gray-500 mb-4">Logging in...</p>}
//     //       <Form fields={fields} onSubmit={handleLogin} />

//     //       <div className="flex flex-col gap-[12px] mt-4 px-4">
//     //         {/* Account Register */}
//     //         <span className="text-[14px] text-[#58666E]">Don't have account?
//     //           <button className="text-[#5B73E8] hover:cursor-pointer" onClick={() => handleForgetPasssword()}>Click here</button> to register
//     //         </span>

//     //         {/* Forgot Password */}
//     //         <span className="text-[14px] text-[#58666E]">Forgot password?
//     //           <button className="text-[#5B73E8] hover:cursor-pointer" onClick={() => handleForgetPasssword()}>Click here</button> to reset
//     //         </span>
//     //       </div>
//     //     </div>

//     //     {/* Copyright */}
//     //     <div className="flex flex-col gap-[12px] text-center">
//     //       <span className="text-[12px] text-[#58666E]">© सर्वाधिकार 2025 "शिक्षक सेवा आयोग"</span>
//     //       <span className="text-[12px] text-[#58666E]">Developed by: Conceptual Frame Solution Pvt. Ltd</span>
//     //     </div>
//     //   </div>
//     // </div>

//     <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#EBEEF6]">
//       <div className="w-full max-w-[502px] flex flex-col gap-6">
//         {/* Heading */}
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-medium text-center text-gray-700">
//             शिक्षक सेवा आयोग
//           </h1>
//         </div>

//         {/* Login Box */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-lg sm:text-xl font-medium mb-6 text-gray-700">
//             Sign in to your account
//           </h2>

//           {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//           {loading && <p className="text-center text-gray-500 mb-4">Logging in...</p>}

//           <Form fields={fields} onSubmit={handleLogin} />

//           {/* Links */}
//           <div className="flex flex-col gap-3 mt-4">
//             <span className="text-sm text-[#58666E]">
//               Don't have an account?{" "}
//               <button
//                 className="text-[#5B73E8] hover:underline"
//                 onClick={() => handleForgetPasssword()}
//               >
//                 Click here
//               </button>{" "}
//               to register
//             </span>

//             <span className="text-sm text-[#58666E]">
//               Forgot password?{" "}
//               <button
//                 className="text-[#5B73E8] hover:underline"
//                 onClick={() => handleForgetPasssword()}
//               >
//                 Click here
//               </button>{" "}
//               to reset
//             </span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-xs text-[#58666E] space-y-1">
//           <p>© सर्वाधिकार {new Date().getFullYear()} "शिक्षक सेवा आयोग"</p>
//           <p>Developed by: Conceptual Frame Solution Pvt. Ltd</p>
//         </div>
//       </div>
//     </div>


//   );
// }




import React, { useState } from "react";
import { useRouter } from "next/router";
import Form from "../../components/form/form.js";
import CanvasCaptcha from "./canvas.jsx"; // <-- Import your CAPTCHA
import { roles } from '@/config/validation.js'

export default function Login() {
  const [captchaInput, setCaptchaInput] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleCaptchaChange = (newCaptcha) => {
    setGeneratedCaptcha(newCaptcha);
  };

  const handleLogin = async (formData) => {
    const { email, password } = formData;

    // if (captchaInput.trim() !== generatedCaptcha.trim()) {
    //   setError("Invalid CAPTCHA. Try again.");
    //   return;
    // }

    setLoading(true);
    setError("");

    try {
      if (!BASE_URL) {
        throw new Error("Internal server error. Please try again later.");
      }

      const url = `${BASE_URL}auth/login`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("access", data.accessToken);
      localStorage.setItem("refresh", data.refreshToken);
      localStorage.setItem("role", data.role);
      localStorage.setItem("email", data.email);
      localStorage.setItem("full_name", data.name);

      if (["admin", "entryuser"].includes(data.role)) {
        router.push("/admin/dashboard");
      } else {
        throw new Error("Unauthorized role. Please contact support.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  const fields = [
    { label: "Username", name: "email", type: "email", initialValue: "" },
    { label: "Password", name: "password", type: "password", initialValue: "" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-[#EBEEF6]">
      <div className="w-full max-w-[502px] flex flex-col gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-center text-gray-700">
           School name 
          </h1>
        </div>

        <img
          src="/images/narc.png"
          alt="Company Logo"
          className="mx-auto mb-4 w-30 h-30 object-contain"
        />

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg sm:text-xl font-medium mb-6 text-gray-700">
            Sign in to your account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {loading && <p className="text-center text-gray-500 mb-4">Logging in...</p>}

          {/* Render Form */}
          <Form fields={fields} onSubmit={handleLogin} />

          {/* CAPTCHA */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CAPTCHA
            </label>
            <CanvasCaptcha onCaptchaChange={handleCaptchaChange} />
            <input
              type="text"
              placeholder="Enter CAPTCHA"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3 mt-4">
            <span className="text-sm text-[#58666E]">
              Don't have an account?{" "}
              <button
                className="text-[#5B73E8] hover:underline"
                onClick={handleRegister}
              >
                Click here
              </button>{" "}
              to register
            </span>
          </div>
        </div>

        <div className="text-center text-xs text-[#58666E] space-y-1">
          <p>© cc {new Date().getFullYear()} "School CMS"</p>
          <p>Developed by: Diwash Joshi</p>
        </div>
      </div>
    </div>
  );
}
