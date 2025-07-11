const filters = {
  gender: [
    { name: "title", label: "Title", type: "text" },
    {
      name: "is_published",
      label: "Published",
      type: "select",
      options: [
        { label: "Published", value: "true" },
        { label: "Unpublished", value: "false" },
      ],
    },
    { name: "created_date", label: "Created Date", type: "date" },
    { name: "published_date", label: "Published Date", type: "date" },
  ],

  educationlevel: [
    { name: "title", label: "Title", type: "text" },
    {
      name: "is_published",
      label: "Published",
      type: "select",
      options: [
        { label: "Published", value: "true" },
        { label: "Unpublished", value: "false" },
      ],
    },
    { name: "created_date", label: "Created Date", type: "date" },
    { name: "published_date", label: "Published Date", type: "date" },
  ],

  application : [
    { name: "candidate_id", label: "Candidate ID", type: "text" },
    {
      name: "status",
      label: "Application Status",
      type: "select",
      options: [
        { value: "verified", label: "Verified" },
        { value: "rejected", label: "Rejected" },
        { value: "pending", label: "Pending" },
        { value: "amendment", label: "Amendment Required" }
      ]
    },
    {
      name: "payment_status",
      label: "Payment Status",
      type: "select",
      options: [
        { value: "paid", label: "Paid" },
        { value: "unpaid", label: "Unpaid" },
        { value: "paid_mismatch", label: "Payment Mismatch" },
        { value: "paid_late", label: "Late Payment" }
      ]
    },
    {
      name: "applied_date",
      label: "Applied Date",
      type: "group",
      children: [
        {
          name: "start",
          label: "Start date",
          type: "date"
        },
        {
          name: "end",
          label: "End date",
          type: "date"
        }
      ]
    }
    ,
    { name: "search", label: "Name/DOB/Citizenship No.", type: "text" },
    { name: "vacancy_number", label: "Vacancy Number", type: "text" },
    
      {
        name: "applied_position",
        label: "Applied Position",
        type: "group",
        children: [
          {
            name: "level", // this should be `level` not `applied_level`
            label: "Applied Level",
            type: "select",
            options: [
              { value: "1", label: "प्राथमिक तह" },
              { value: "2", label: "निम्‍न माध्यमिक तह" },
              { value: "3", label: "माध्यमिक तह" }
            ]
          },
          {
            name: "class", // this should be `class` not `applied_class`
            label: "Applied Class",
            type: "select",
            options: [
              { value: "1", label: "प्रथम श्रेणी" },
              { value: "2", label: "द्वितीय श्रेणी" },
              { value: "3", label: "तृतीय श्रेणी" }
            ]
          }
        ]
      }
    ,
    {
      label: "Job Post",
      name: "job_post",
      type: "select",
      placeholder: "Select Job Post",
      options: [], // You will populate this from API (e.g., [{ label: 'Teacher', value: 18 }, ...])
      apiEndpoint: "/api/job-posts/", // Optional: if you're fetching options dynamically
      optionLabel: "title",   // Field from API response to show in dropdown
      optionValue: "id",      // Field from API response to send as value
      show: true,
      header: true, // Pass value in request header
    },

    {
      name: "province",
      label: "Province",
      type: "select",
      options: [
        { value: "1", label: "कोशी प्रदेश" },
        { value: "2", label: "मधेश प्रदेश" },
        { value: "3", label: "बागमती प्रदेश" },
        { value: "4", label: "गण्डकी प्रदेश" },
        { value: "5", label: "लुम्बिनी प्रदेश" },
        { value: "6", label: "कर्णाली प्रदेश" },
        { value: "7", label: "सुदूरपश्चिम प्रदेश" }
      ]
    }
  ],
  
};

export default filters;
