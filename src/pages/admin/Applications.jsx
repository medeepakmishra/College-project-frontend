import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  User,
  Building2,
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  X,
} from "lucide-react";

import {
  getAllApplications,
  updateApplicationStatus,
} from "../../services/application.service";

const statusOptions = [
  "applied",
  "shortlisted",
  "interview",
  "selected",
  "rejected",
];

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [previewApplication, setPreviewApplication] = useState(null);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [updateForm, setUpdateForm] = useState({
    status: "",
    interviewDate: "",
    interviewVenue: "",
    adminRemark: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllApplications();
console.log(
 "APPLICATION DATA:",
 response.data.applications
);
      setApplications(response.data.applications || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (application) => {
    setSelectedApplication(application);

    setUpdateForm({
      status: application.status || "applied",

      interviewDate: application.interviewDate
        ? application.interviewDate.slice(0, 16)
        : "",

      interviewVenue: application.interviewVenue || "",

      adminRemark: application.adminRemark || "",
    });

    setError("");
    setMessage("");
  };

  const closeModal = () => {
    setSelectedApplication(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusUpdate = async (e) => {
    e.preventDefault();

    if (!selectedApplication) return;

    try {
      setUpdatingId(selectedApplication._id);
      setError("");
      setMessage("");

      const payload = {
        status: updateForm.status,
        adminRemark: updateForm.adminRemark,
      };

      if (updateForm.interviewDate) {
        payload.interviewDate = updateForm.interviewDate;
      }

      if (updateForm.interviewVenue) {
        payload.interviewVenue = updateForm.interviewVenue;
      }

      const response = await updateApplicationStatus(
        selectedApplication._id,
        payload,
      );

      setApplications((prev) =>
        prev.map((application) =>
          application._id === selectedApplication._id
            ? {
                ...application,
                ...response.data.application,
              }
            : application,
        ),
      );

      setMessage("Application status updated successfully");

      closeModal();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update application");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredApplications = applications.filter((application) => {
    const studentName = application.student?.user?.name || "";

    const studentEmail = application.student?.user?.email || "";

    const driveTitle = application.drive?.title || "";

    const companyName = application.drive?.company?.companyName || "";

    const searchText = search.toLowerCase();

    const matchesSearch =
      studentName.toLowerCase().includes(searchText) ||
      studentEmail.toLowerCase().includes(searchText) ||
      driveTitle.toLowerCase().includes(searchText) ||
      companyName.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "selected":
        return "bg-green-500/10 text-green-400 border-green-500/20";

      case "rejected":
        return "bg-red-500/10 text-red-400 border-red-500/20";

      case "interview":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";

      case "shortlisted":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";

      default:
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <RefreshCw size={20} className="animate-spin" />
          Loading applications...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">
      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">
        <div>
          <p className="uppercase tracking-[4px] text-blue-500 text-sm">
            Admin Center
          </p>

          <h1 className="text-3xl font-bold mt-2">Applications</h1>

          <p className="text-gray-400 mt-2">
            Review student applications and manage selection progress.
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="flex items-center justify-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* MESSAGE */}

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

      {/* STATS */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statusOptions.map((status) => {
          const count = applications.filter(
            (application) => application.status === status,
          ).length;

          return (
            <div
              key={status}
              className="bg-[#111] border border-gray-800 rounded-xl p-5"
            >
              <p className="text-gray-500 capitalize">{status}</p>

              <h2 className="text-3xl font-bold mt-2">{count}</h2>
            </div>
          );
        })}
      </div>

      {/* FILTER */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-xl">
          <Search size={18} className="absolute left-4 top-3.5 text-gray-500" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, company or drive..."
            className="w-full bg-[#111] border border-gray-800 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#111] border border-gray-800 rounded-xl px-4 py-3 outline-none cursor-pointer"
        >
          <option value="all">All Status</option>

          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* APPLICATIONS */}

      {filteredApplications.length === 0 ? (
        <div className="border border-gray-800 rounded-2xl p-16 text-center">
          <p className="text-gray-500">No applications found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((application) => {
            const student = application.student;

            const user = student?.user;

            const drive = application.drive;

            return (
              <div
                key={application._id}
                className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
              >
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                  {/* STUDENT */}

                  <div className="flex items-center gap-4 min-w-[220px]">
                    <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">
                      <User size={22} />
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg">
                        {user?.name || "Unknown Student"}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {user?.email || "No email"}
                      </p>
                    </div>
                  </div>

                  {/* DRIVE */}

                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-gray-300">
                      <BriefcaseBusiness size={17} />

                      {drive?.title || "Unknown Drive"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-500 text-sm">
                      <Building2 size={16} />

                      {drive?.company?.companyName || "Unknown Company"}
                    </p>
                  </div>

                  {/* STATUS */}

                  <div>
                    <span
                      className={`inline-block border px-3 py-1.5 rounded-full text-sm capitalize ${getStatusStyle(
                        application.status,
                      )}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  {/* ACTION */}

                 

                  <div className="flex gap-3">
<button

onClick={()=>{

const resumeUrl = application.student?.resume?.url;


if(resumeUrl){

window.open(

`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(resumeUrl)}`,

"_blank"

);

}
else{

alert("Resume not uploaded");

}

}}

className="
border
border-gray-700
hover:border-blue-500
px-5
py-2.5
rounded-xl
transition
cursor-pointer
"

>

📄 Resume

</button>


<button
onClick={() => openUpdateModal(application)}
className="
bg-blue-600
hover:bg-blue-700
px-5
py-2.5
rounded-xl
transition
cursor-pointer
"
>
Manage
</button>

</div>
                </div>

                {/* INTERVIEW DETAILS */}

                {application.status === "interview" && (
                  <div className="mt-5 pt-5 border-t border-gray-800 flex flex-wrap gap-6 text-sm text-gray-400">
                    {application.interviewDate && (
                      <p className="flex items-center gap-2">
                        <CalendarDays size={16} />

                        {new Date(application.interviewDate).toLocaleString()}
                      </p>
                    )}

                    {application.interviewVenue && (
                      <p className="flex items-center gap-2">
                        <MapPin size={16} />

                        {application.interviewVenue}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* UPDATE MODAL */}

      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-xl max-h-[90vh] bg-[#111] border border-gray-800 rounded-2xl flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <div>
                <h2 className="text-xl font-semibold">Update Application</h2>

                <p className="text-gray-500 text-sm mt-1">
                  {selectedApplication.student?.user?.name}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                <X />
              </button>
            </div>

            <form
              onSubmit={handleStatusUpdate}
              className="p-6 space-y-5 overflow-y-auto"
            >
              {/* STUDENT PROFILE SUMMARY */}

              <div className="bg-[#090909] border border-gray-800 rounded-xl p-5">
                <h3 className="text-lg font-semibold mb-4">Student Profile</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">CGPA</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.cgpa ?? "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Backlogs</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.backlogs ?? "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Department</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.department || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Batch</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.batch || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Semester</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.semester ?? "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Course</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.course || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Roll Number</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.rollNumber || "N/A"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Placement Status</p>

                    <p className="font-semibold mt-1">
                      {selectedApplication.student?.isPlaced
                        ? "Placed"
                        : "Not Placed"}
                    </p>
                  </div>
                </div>

                {/* SKILLS */}

                <div className="mt-5">
                  <p className="text-xs text-gray-500 mb-2">Skills</p>

                  <div className="flex flex-wrap gap-2">
                    {selectedApplication.student?.skills?.length > 0 ? (
                      selectedApplication.student.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">
                        No skills added
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Application Status
                </label>

                <select
                  name="status"
                  value={updateForm.status}
                  onChange={handleFormChange}
                  className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {updateForm.status === "interview" && (
                <>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Interview Date
                    </label>

                    <input
                      type="datetime-local"
                      name="interviewDate"
                      value={updateForm.interviewDate}
                      onChange={handleFormChange}
                      className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Interview Venue
                    </label>

                    <input
                      name="interviewVenue"
                      value={updateForm.interviewVenue}
                      onChange={handleFormChange}
                      placeholder="Placement Cell, Main Campus"
                      className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Admin Remark
                </label>

                <textarea
                  name="adminRemark"
                  value={updateForm.adminRemark}
                  onChange={handleFormChange}
                  rows="4"
                  placeholder="Add remark for student..."
                  className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-gray-700 px-5 py-3 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  disabled={updatingId === selectedApplication._id}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl cursor-pointer"
                >
                  {updatingId ? "Updating..." : "Update Status"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
