import { images } from "@/assets/images";
import React from "react";

const Voucher = () => {
  return (
    <div className="p-6 bg-white border border-gray-300 rounded-lg max-w-4xl mx-auto mt-2">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-600">
          परीक्षा दस्तुर भुक्तानी भएको भौचर
        </h2>
        <p className="text-sm text-gray-500">05/27/25 11:18 AM</p>
      </div>
      <h4 className="text-center text-lg font-semibold mb-4">
        राजस्व व्यवस्थापन सूचना प्रणाली बाट सिर्जित भौचर
      </h4>
      {/* Logo and Header Section */}
      <div className="flex items-start space-x-4">
        {/* Logo Section */}
        <div>
          <img src={images.nepallogo} alt="Nepal Logo" className="h-16 w-16" />
        </div>
        {/* Header Section */}
        <div>
          <h3 className="text-lg font-semibold">नेपाल सरकार</h3>
          <p className="text-sm">अर्थ मन्त्रालय</p>
          <p className="text-sm">महालेखा नियन्त्रक कार्यालय</p>
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="text-gray-700 font-semibold">भौचरको विवरण</h5>
          <p className="text-sm">आर्थिक वर्ष : २०८२/८३</p>
          <p className="text-sm">भौचरतििथि : २०८२/०८/०५</p>
          <p className="text-sm">कार्यालय संकेत : २०२३-२५४०६०८</p>
          <p className="text-sm">कार्यालय : २५२०३३२२४३-सिभिल सेवा आयोग</p>
        </div>
        <div>
          <h5 className="text-gray-700 font-semibold">
            राजस्व जम्मा गर्नेको विवरण
          </h5>
          <p className="text-sm">भुक्तानीकर्ता संकेत : २०२३२३०७०७६७०७</p>
          <p className="text-sm">पान नं : --</p>
          <p className="text-sm">नाम : सम्झना विक्रमचन</p>
          <p className="text-sm">
            ठेगाना : गोकर्णेश्वर, काठमाडौं, बागमती प्रदेश
          </p>
          <p className="text-sm">फोन : ९८२३६५३५८९</p>
        </div>
      </div>
      <div className="mt-6 border border-gray-300">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">सि नं</th>
              <th className="py-2 px-4 border">भौचर नं</th>
              <th className="py-2 px-4 border">सिर्षक विवरण</th>
              <th className="py-2 px-4 border">विवरण</th>
              <th className="py-2 px-4 border">रकम</th>
              <th className="py-2 px-4 border">आय वर्ष</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">१</td>
              <td className="py-2 px-4 border">६८२४२०३</td>
              <td className="py-2 px-4 border">परीक्षाशुल्क</td>
              <td className="py-2 px-4 border">---</td>
              <td className="py-2 px-4 border">१४००</td>
              <td className="py-2 px-4 border">२०८२/८३</td>
            </tr>
            <tr>
              <td
                colSpan="4"
                className="py-2 px-4 border font-semibold text-right"
              >
                जम्मा
              </td>
              <td className="py-2 px-4 border font-semibold">१४००</td>
              <td className="py-2 px-4 border">---</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-700">एक हजार चार सय रुपैयाँ मात्र</p>
      <div className="mt-6">
        <p className="text-sm">रकम भुक्तानी भएको मिति : २०८१-०७-०७</p>
        <p className="text-sm">स्थान : राष्ट्रिय वाणिज्य बैंक</p>
        <p className="text-sm font-semibold">रकम : १४००</p>
      </div>
    </div>
  );
};

export default Voucher;
