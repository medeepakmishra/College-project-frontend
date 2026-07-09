// import { useEffect, useState } from "react";
// import {
//   Plus,
//   Search,
//   Pencil,
//   Trash2,
//   Building2,
// } from "lucide-react";

// import {
//   getCompanies,
//   createCompany,
//   updateCompany,
//   deleteCompany,
// } from "../../services/company.service";

// export default function Companies() {

//   const [companies,setCompanies]=useState([]);

//   const [search,setSearch]=useState("");

//   const [loading,setLoading]=useState(true);

//   const [showModal,setShowModal]=useState(false);

//   const [editing,setEditing]=useState(null);

//   const [form,setForm]=useState({

//       name:"",
//       industry:"",
//       location:"",
//       website:"",
//       description:""

//   });



//   useEffect(()=>{

//       fetchCompanies();

//   },[]);



//   const fetchCompanies=async()=>{

//       try{

//           const res=await getCompanies();

//           setCompanies(
//             res.data.companies ||
//             res.data.data ||
//             []
//           );

//       }

//       catch(err){

//           console.log(err);

//       }

//       finally{

//           setLoading(false);

//       }

//   };



//   const handleChange=(e)=>{

//       setForm({

//           ...form,

//           [e.target.name]:e.target.value

//       });

//   };



//   const handleSubmit=async()=>{

//       try{

//           if(editing){

//               await updateCompany(
//                   editing,
//                   form
//               );

//           }

//           else{

//               await createCompany(
//                   form
//               );

//           }

//           setShowModal(false);

//           setEditing(null);

//           setForm({

//               name:"",
//               industry:"",
//               location:"",
//               website:"",
//               description:""

//           });

//           fetchCompanies();

//       }

//       catch(err){

//           console.log(err);

//       }

//   };



//   const handleDelete=async(id)=>{

//       if(!window.confirm("Delete Company?"))
//       return;

//       await deleteCompany(id);

//       fetchCompanies();

//   };



// const filteredCompanies = companies.filter((company) => {
//   const searchText = search.toLowerCase();

//   return (
//     (company.companyName || "")
//       .toLowerCase()
//       .includes(searchText) ||

//     (company.description || "")
//       .toLowerCase()
//       .includes(searchText) ||

//     (company.hrName || "")
//       .toLowerCase()
//       .includes(searchText) ||

//     (company.hrEmail || "")
//       .toLowerCase()
//       .includes(searchText)
//   );
// });


// return(

// <div className="p-8 text-white">

// <div className="flex justify-between items-center mb-8">

// <div>

// <h1 className="text-4xl font-bold">

// Companies

// </h1>

// <p className="text-zinc-500 mt-2">

// Manage recruiters

// </p>

// </div>

// <button

// onClick={()=>{

// setEditing(null);

// setShowModal(true);

// }}

// className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2"

// >

// <Plus size={18}/>

// Add Company

// </button>

// </div>



// <div className="relative mb-8">

// <Search
// size={18}
// className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
// />

// <input

// value={search}

// onChange={(e)=>setSearch(e.target.value)}

// placeholder="Search company"

// className="w-full bg-[#181818] border border-zinc-800 rounded-xl py-3 pl-12"

// />

// </div>




// <div className="bg-[#181818] rounded-xl border border-zinc-800 overflow-hidden">

// <table className="w-full">

// <thead className="bg-[#111]">

// <tr>

// <th className="text-left p-4">
// Company
// </th>

// <th>
// Industry
// </th>

// <th>
// Location
// </th>

// <th>
// Action
// </th>

// </tr>

// </thead>

// <tbody>

// {

// loading ?

// <tr>

// <td
// colSpan="4"
// className="text-center py-8"
// >

// Loading...

// </td>

// </tr>

// :

// filteredCompanies .map((company)=>(

// <tr
// key={company._id}
// className="border-t border-zinc-800"
// >

// <td className="p-4 flex items-center gap-3">

// <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex justify-center items-center">

// <Building2
// size={20}
// />

// </div>

// {company.name}

// </td>

// <td>

// {company.industry}

// </td>

// <td>

// {company.location}

// </td>

// <td>

// <div className="flex justify-center gap-4">

// <button

// onClick={()=>{

// setEditing(company._id);

// setForm(company);

// setShowModal(true);

// }}

// >

// <Pencil
// size={18}
// className="text-yellow-400"
// />

// </button>

// <button

// onClick={()=>handleDelete(company._id)}

// >

// <Trash2
// size={18}
// className="text-red-500"
// />

// </button>

// </div>

// </td>

// </tr>

// ))

// }

// </tbody>

// </table>

// </div>




// {

// showModal &&

// <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

// <div className="bg-[#181818] rounded-2xl p-8 w-[550px]">

// <h2 className="text-2xl font-bold mb-6">

// {

// editing

// ?

// "Edit Company"

// :

// "Add Company"

// }

// </h2>

// <div className="space-y-4">

// <input
// name="name"
// value={form.name}
// onChange={handleChange}
// placeholder="Company Name"
// className="w-full bg-[#111] border border-zinc-700 rounded-xl p-3"
// />

// <input
// name="industry"
// value={form.industry}
// onChange={handleChange}
// placeholder="Industry"
// className="w-full bg-[#111] border border-zinc-700 rounded-xl p-3"
// />

// <input
// name="location"
// value={form.location}
// onChange={handleChange}
// placeholder="Location"
// className="w-full bg-[#111] border border-zinc-700 rounded-xl p-3"
// />

// <input
// name="website"
// value={form.website}
// onChange={handleChange}
// placeholder="Website"
// className="w-full bg-[#111] border border-zinc-700 rounded-xl p-3"
// />

// <textarea

// name="description"

// value={form.description}

// onChange={handleChange}

// placeholder="Description"

// className="w-full bg-[#111] border border-zinc-700 rounded-xl p-3"

// />

// </div>

// <div className="flex justify-end gap-4 mt-8">

// <button

// onClick={()=>setShowModal(false)}

// className="px-5 py-3 bg-zinc-700 rounded-xl"

// >

// Cancel

// </button>

// <button

// onClick={handleSubmit}

// className="px-5 py-3 bg-blue-600 rounded-xl"

// >

// Save

// </button>

// </div>

// </div>

// </div>

// }

// </div>

// );

// }



import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Building2,
  Globe,
  User,
  Mail,
  Phone,
} from "lucide-react";

import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../services/company.service";

const initialForm = {
  companyName: "",
  website: "",
  description: "",
  hrName: "",
  hrEmail: "",
  hrContact: "",
};

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(initialForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCompanies();

      console.log("Companies response:", response.data);

      setCompanies(response.data.companies || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch companies"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
    setMessage("");
    setShowModal(true);
  };

  const openEditModal = (company) => {
    setEditingId(company._id);

    setForm({
      companyName: company.companyName || "",
      website: company.website || "",
      description: company.description || "",
      hrName: company.hrName || "",
      hrEmail: company.hrEmail || "",
      hrContact: company.hrContact || "",
    });

    setError("");
    setMessage("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      if (editingId) {
        await updateCompany(editingId, form);

        setMessage("Company updated successfully");
      } else {
        await createCompany(form);

        setMessage("Company created successfully");
      }

      closeModal();

      await fetchCompanies();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Company operation failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteCompany(id);

      setCompanies((prev) =>
        prev.filter((company) => company._id !== id)
      );

      setMessage("Company deleted successfully");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete company"
      );
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const text = search.toLowerCase().trim();

    return (
      (company.companyName || "")
        .toLowerCase()
        .includes(text) ||
      (company.hrName || "")
        .toLowerCase()
        .includes(text) ||
      (company.hrEmail || "")
        .toLowerCase()
        .includes(text) ||
      (company.description || "")
        .toLowerCase()
        .includes(text)
    );
  });

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mb-10">

        <div>
          <p className="text-blue-500 uppercase tracking-[4px] text-sm">
            Admin Center
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Companies
          </h1>

          <p className="text-gray-400 mt-2">
            Manage recruiters and company information.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <Plus size={20} />
          Add Company
        </button>

      </div>

      {/* MESSAGES */}

      {message && (
        <div className="mb-6 p-4 rounded-xl border border-green-800 bg-green-950/30 text-green-400">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-800 bg-red-950/30 text-red-400">
          {error}
        </div>
      )}

      {/* SEARCH */}

      <div className="relative mb-8">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company, HR or email..."
          className="w-full bg-[#111] border border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* LOADING */}

      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading companies...
        </div>
      )}

      {/* EMPTY */}

      {!loading && filteredCompanies.length === 0 && (
        <div className="border border-gray-800 rounded-2xl p-16 text-center">

          <Building2
            size={40}
            className="mx-auto text-gray-700 mb-4"
          />

          <p className="text-gray-500">
            No companies found.
          </p>

        </div>
      )}

      {/* COMPANY CARDS */}

      {!loading && filteredCompanies.length > 0 && (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredCompanies.map((company) => (

            <div
              key={company._id}
              className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-blue-500/50 transition"
            >

              {/* CARD HEADER */}

              <div className="flex justify-between gap-4">

                <div className="flex gap-4 items-center">

                  <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">

                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.companyName}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <Building2 size={23} />
                    )}

                  </div>

                  <div>
                    <h2 className="font-semibold text-lg">
                      {company.companyName}
                    </h2>

                    <p className="text-gray-500 text-sm">
                      Recruiter
                    </p>
                  </div>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      openEditModal(company)
                    }
                    className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-lg hover:border-yellow-500 hover:text-yellow-400 transition cursor-pointer"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(company._id)
                    }
                    className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-lg hover:border-red-500 hover:text-red-400 transition cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

              {/* DESCRIPTION */}

              <p className="text-gray-400 mt-5 min-h-[48px]">
                {company.description ||
                  "No company description available."}
              </p>

              {/* DETAILS */}

              <div className="border-t border-gray-800 mt-5 pt-5 space-y-3">

                <p className="flex items-center gap-3 text-gray-400">
                  <User size={17} />
                  {company.hrName || "HR not specified"}
                </p>

                <p className="flex items-center gap-3 text-gray-400">
                  <Mail size={17} />
                  {company.hrEmail || "Email not specified"}
                </p>

                <p className="flex items-center gap-3 text-gray-400">
                  <Phone size={17} />
                  {company.hrContact ||
                    "Contact not specified"}
                </p>

                {company.website && (
                  <p className="flex items-center gap-3">

                    <Globe
                      size={17}
                      className="text-gray-400"
                    />

                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:text-blue-300 truncate"
                    >
                      {company.website}
                    </a>

                  </p>
                )}

              </div>

            </div>

          ))}

        </div>
      )}

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

            {/* MODAL HEADER */}

            <div className="sticky top-0 bg-[#111] z-10 flex justify-between items-center px-6 py-5 border-b border-gray-800">

              <div>
                <h2 className="text-2xl font-bold">
                  {editingId
                    ? "Edit Company"
                    : "Add Company"}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Enter recruiter and company details.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={21} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >

              <div className="grid md:grid-cols-2 gap-5">

                <FormInput
                  label="Company Name"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="e.g. TechNova Solutions"
                  required
                />

                <FormInput
                  label="Website"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />

                <FormInput
                  label="HR Name"
                  name="hrName"
                  value={form.hrName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                />

                <FormInput
                  label="HR Email"
                  name="hrEmail"
                  type="email"
                  value={form.hrEmail}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                />

                <FormInput
                  label="HR Contact"
                  name="hrContact"
                  value={form.hrContact}
                  onChange={handleChange}
                  placeholder="9876543211"
                />

              </div>

              <div className="mt-5">

                <label className="block text-sm text-gray-400 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Brief company description..."
                  rows="5"
                  className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-gray-700 hover:border-gray-500 px-6 py-3 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-7 py-3 rounded-xl transition cursor-pointer"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Company"
                    : "Create Company"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function FormInput({
  label,
  ...props
}) {
  return (
    <div>

      <label className="block text-sm text-gray-400 mb-2">
        {label}
      </label>

      <input
        {...props}
        className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      />

    </div>
  );
}