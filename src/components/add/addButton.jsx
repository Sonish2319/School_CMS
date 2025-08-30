// import { useRouter } from 'next/router';
// import { useTranslations } from "next-intl";

// const AddButton = ({ path }) => {
//   const router = useRouter();
//   const t = useTranslations();

//   const handleClick = () => {
//     router.push(path);
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
//     >

//       {t('add_new')}
//     </button>
//   );
// };

// export default AddButton;


// AddButton.jsx
import { useTranslations } from "next-intl";

const AddButton = ({ onClick }) => {

  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
    >
      {("add_new")}
    </button>
  );
};

export default AddButton;
