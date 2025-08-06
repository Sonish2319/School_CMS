import React, { useState, useEffect, useRef } from "react";

const Form = ({ fields, onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState(
    initializeFormData(fields, initialValues)
  );
  const [imagePreview, setImagePreview] = useState({});
  const prevFieldsRef = useRef(fields);
  const prevInitialValuesRef = useRef(initialValues);

  useEffect(() => {
    if (
      JSON.stringify(prevFieldsRef.current) !== JSON.stringify(fields) ||
      JSON.stringify(prevInitialValuesRef.current) !==
      JSON.stringify(initialValues)
    ) {
      setFormData(initializeFormData(fields, initialValues));
      prevFieldsRef.current = fields;
      prevInitialValuesRef.current = initialValues;
    }
  }, [fields, initialValues]);

  // const handleChange = (e) => {
  //   const { name, type, value, files, checked } = e.target;

  //   if (type === "file") {
  //     const file = files[0];
  //     if (file) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [name]: file,
  //       }));

  //       const reader = new FileReader();
  //       reader.onload = () => {
  //         setImagePreview((prev) => ({
  //           ...prev,
  //           [name]: reader.result,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   } else {
  //     const newValue = type === "checkbox" ? checked : value;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: newValue,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, type, value, files, checked, multiple } = e.target;

    if (type === "file") {
      if (files.length === 1) {
        // single file upload (old behavior)
        const file = files[0];
        setFormData((prev) => ({
          ...prev,
          [name]: file,
        }));

        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview((prev) => ({
            ...prev,
            [name]: [reader.result], // store array for consistency
          }));
        };
        reader.readAsDataURL(file);
      } else if (files.length > 1) {
        // multiple files upload
        const filesArray = Array.from(files);
        setFormData((prev) => ({
          ...prev,
          [name]: filesArray,
        }));

        // generate previews for all files
        filesArray.forEach((file, idx) => {
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreview((prev) => {
              const prevPreviews = prev[name] || [];
              const newPreviews = [...prevPreviews];
              newPreviews[idx] = reader.result;
              return { ...prev, [name]: newPreviews };
            });
          };
          reader.readAsDataURL(file);
        });
      } else {
        // no files
        setFormData((prev) => ({
          ...prev,
          [name]: null,
        }));
        setImagePreview((prev) => ({
          ...prev,
          [name]: [],
        }));
      }
    } else {
      const newValue = type === "checkbox" ? checked : value;
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    }
  };



  const handleCustomFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update preview if it's a file
    if (value instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let payload;
    const hasFileField = Object.entries(formData).some(
      ([key, value]) => fields.find((field) => field.name === key &&
        (field.type === "file" || field.type === "custom")) &&
        value instanceof File
    );

    if (hasFileField) {
      payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value instanceof File ? value : String(value));
        }
      });
    } else {
      payload = formData;
    }

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" p-4 bg-white shadow-md rounded-lg"
      encType="multipart/form-data"
    >
      {fields.map((field) => {
        const { label, name, type, options, render, multiple } = field;

        return (
          <div key={name} className="mb-4 flex flex-col gap-[8px]">
            <label className="block form-title">
              {label}
            </label>

            {render ? (
              render({
                value: formData[name],
                onChange: (value) => handleCustomFieldChange(name, value)
              })
            ) : type === "file" ? (
              <>
                <input
                  type="file"
                  name={name}
                  accept="image/*"
                  onChange={handleChange}
                  multiple={multiple}
                  className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100"
                />
                {/* {imagePreview[name] && (
                  <img
                    src={imagePreview[name]}
                    alt={`${name} preview`}
                    className="mt-2 max-h-40 rounded-lg shadow-md"
                  />
                )}
              </> */}
              {imagePreview[name]?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {imagePreview[name].map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={`${name} preview ${i + 1}`}
                        className="max-h-40 rounded-lg shadow-md"
                      />
                    ))}
                  </div>
                )}
              </>
            ) : type === "checkbox" ? (
              <input
                type="checkbox"
                name={name}
                checked={!!formData[name]}
                onChange={handleChange}
                className="w-5 h-5"
              />
            ) : type === "option" ? (
              <select
                name={name}
                value={formData[name] !== undefined ? formData[name] : ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100"
              >
                <option value="">Select an option</option>
                {options?.map((option) => (
                  <option key={option.value} value={String(option.value)}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name] ?? ""}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-[2px] focus:outline-none focus:bg-gray-100"
              />
            )}
          </div>
        );
      })}
      {/* Save Button */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#5B73E8] text-white text-[14px] rounded hover:bg-blue-700 transition mt-5 mb-5"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const initializeFormData = (fields, initialValues) =>
  fields.reduce((acc, field) => {
    acc[field.name] = initialValues?.[field.name] ?? field.initialValue ?? "";
    return acc;
  }, {});

export default Form;