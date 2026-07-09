import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Clock3,
  MapPin,
  MessageSquareText,
  RefreshCw,
  Search,
  Trophy,
} from "lucide-react";

import {
  getMyApplications,
} from "../../services/application.service";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyApplications();

      console.log(
        "My applications:",
        response.data
      );

      setApplications(
        response.data.applications || []
      );
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications =
    applications.filter((application) => {
      const text = search
        .toLowerCase()
        .trim();

      const drive = application.drive;

      const matchesSearch =
        (drive?.title || "")
          .toLowerCase()
          .includes(text) ||
        (drive?.jobRole || "")
          .toLowerCase()
          .includes(text) ||
        (drive?.company?.companyName || "")
          .toLowerCase()
          .includes(text);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

  const counts = {
    total: applications.length,

    applied: applications.filter(
      (app) => app.status === "applied"
    ).length,

    shortlisted: applications.filter(
      (app) =>
        app.status === "shortlisted"
    ).length,

    selected: applications.filter(
      (app) => app.status === "selected"
    ).length,
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

        <div>
          <p className="uppercase tracking-[4px] text-blue-500 text-sm">
            Placement Journey
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            My Applications
          </h1>

          <p className="text-gray-400 mt-3">
            Track all your placement applications and
            their current status.
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

      {/* ERROR */}

      {error && (
        <div className="mb-6 bg-red-950/30 border border-red-800 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        <StatCard
          label="Total Applications"
          value={counts.total}
        />

        <StatCard
          label="Applied"
          value={counts.applied}
        />

        <StatCard
          label="Shortlisted"
          value={counts.shortlisted}
        />

        <StatCard
          label="Selected"
          value={counts.selected}
        />

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <div className="relative flex-1">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search company, role or drive..."
            className="w-full bg-[#111] border border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="bg-[#111] border border-gray-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500 cursor-pointer"
        >
          <option value="all">
            All Status
          </option>

          <option value="applied">
            Applied
          </option>

          <option value="shortlisted">
            Shortlisted
          </option>

          <option value="interview">
            Interview
          </option>

          <option value="selected">
            Selected
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>

      </div>

      {/* LOADING */}

      {loading && (
        <div className="flex justify-center items-center py-20 text-gray-400">

          <RefreshCw
            size={20}
            className="animate-spin mr-3"
          />

          Loading applications...

        </div>
      )}

      {/* EMPTY */}

      {!loading &&
        filteredApplications.length === 0 && (

          <div className="border border-gray-800 rounded-2xl p-16 text-center">

            <BriefcaseBusiness
              size={45}
              className="mx-auto text-gray-700 mb-4"
            />

            <h2 className="text-xl font-semibold">
              No applications found
            </h2>

            <p className="text-gray-500 mt-2">
              Your submitted placement applications
              will appear here.
            </p>

          </div>

        )}

      {/* APPLICATION CARDS */}

      {!loading && (
        <div className="space-y-5">

          {filteredApplications.map(
            (application) => {

              const drive =
                application.drive;

              const company =
                drive?.company;

              return (

                <div
                  key={application._id}
                  className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition"
                >

                  <div className="p-6">

                    {/* TOP */}

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                      <div className="flex gap-4 items-center">

                        <div className="w-14 h-14 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center overflow-hidden">

                          {company?.logo ? (

                            <img
                              src={company.logo}
                              alt=""
                              className="w-full h-full object-contain"
                            />

                          ) : (

                            <Building2 size={25} />

                          )}

                        </div>

                        <div>

                          <h2 className="text-xl font-bold">
                            {drive?.jobRole ||
                              "Job Role"}
                          </h2>

                          <p className="text-gray-400 mt-1">
                            {company?.companyName ||
                              "Company"}
                          </p>

                        </div>

                      </div>

                      <StatusBadge
                        status={application.status}
                      />

                    </div>

                    {/* DETAILS */}

                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-7">

                      <Detail
                        icon={<BriefcaseBusiness size={17} />}
                        label="Drive"
                        value={
                          drive?.title ||
                          "Not available"
                        }
                      />

                      <Detail
                        icon={<MapPin size={17} />}
                        label="Location"
                        value={
                          drive?.jobLocation ||
                          "Not available"
                        }
                      />

                      <Detail
                        icon={<CalendarDays size={17} />}
                        label="Applied On"
                        value={formatDate(
                          application.createdAt
                        )}
                      />

                      <Detail
                        icon={<Trophy size={17} />}
                        label="Package"
                        value={
                          drive?.ctc
                            ? `₹${drive.ctc} LPA`
                            : "Not available"
                        }
                      />

                    </div>

                    {/* INTERVIEW INFORMATION */}

                    {application.status ===
                      "interview" && (

                      <div className="mt-6 bg-blue-950/20 border border-blue-900/50 rounded-xl p-5">

                        <h3 className="text-blue-400 font-semibold mb-4">
                          Interview Details
                        </h3>

                        <div className="grid md:grid-cols-2 gap-4 text-gray-300">

                          <p className="flex items-center gap-3">

                            <CalendarDays size={18} />

                            {formatDateTime(
                              application.interviewDate
                            )}

                          </p>

                          <p className="flex items-center gap-3">

                            <MapPin size={18} />

                            {application.interviewVenue ||
                              "Venue not announced"}

                          </p>

                        </div>

                      </div>

                    )}

                    {/* ADMIN REMARK */}

                    {application.adminRemark && (

                      <div className="mt-5 flex gap-3 bg-[#090909] border border-gray-800 rounded-xl p-4">

                        <MessageSquareText
                          size={19}
                          className="text-gray-500 mt-0.5"
                        />

                        <div>

                          <p className="text-xs text-gray-500">
                            Admin Remark
                          </p>

                          <p className="text-gray-300 mt-1">
                            {
                              application.adminRemark
                            }
                          </p>

                        </div>

                      </div>

                    )}

                  </div>

                  {/* PROGRESS */}

                  <ApplicationProgress
                    status={application.status}
                  />

                </div>

              );
            }
          )}

        </div>
      )}

    </div>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */


function StatCard({ label, value }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

      <p className="text-gray-500 text-sm">
        {label}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>

    </div>
  );
}


function Detail({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-[#090909] rounded-xl p-4">

      <div className="flex items-center gap-2 text-gray-500 text-xs">
        {icon}
        {label}
      </div>

      <p className="mt-2 text-gray-300">
        {value}
      </p>

    </div>
  );
}


function StatusBadge({ status }) {

  const styles = {
    applied:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    shortlisted:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    interview:
      "bg-purple-500/10 text-purple-400 border-purple-500/20",

    selected:
      "bg-green-500/10 text-green-400 border-green-500/20",

    rejected:
      "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <span
      className={`px-4 py-2 rounded-full border text-sm capitalize ${
        styles[status] ||
        "bg-gray-500/10 text-gray-400 border-gray-500/20"
      }`}
    >
      {status}
    </span>
  );
}


function ApplicationProgress({ status }) {

  const steps = [
    "applied",
    "shortlisted",
    "interview",
    "selected",
  ];

  if (status === "rejected") {

    return (
      <div className="border-t border-gray-800 px-6 py-4 bg-red-950/10">

        <p className="text-red-400 text-sm">
          Application not selected for the next stage.
        </p>

      </div>
    );
  }

  const currentIndex =
    steps.indexOf(status);

  return (
    <div className="border-t border-gray-800 px-6 py-5">

      <div className="flex items-center">

        {steps.map((step, index) => (

          <div
            key={step}
            className="flex items-center flex-1 last:flex-none"
          >

            <div>

              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  index <= currentIndex
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-500"
                }`}
              >
                {index + 1}
              </div>

              <p
                className={`text-xs capitalize mt-2 ${
                  index <= currentIndex
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                {step}
              </p>

            </div>

            {index < steps.length - 1 && (

              <div
                className={`h-[2px] flex-1 mx-3 ${
                  index < currentIndex
                    ? "bg-blue-600"
                    : "bg-gray-800"
                }`}
              />

            )}

          </div>

        ))}

      </div>

    </div>
  );
}


/* =====================================================
   DATE HELPERS
===================================================== */


function formatDate(date) {

  if (!date) return "Not available";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


function formatDateTime(date) {

  if (!date) return "Not announced";

  return new Date(date).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}