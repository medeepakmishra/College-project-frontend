import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  MapPin,
  RefreshCw,
  Search,
  Users,
} from "lucide-react";

import { getEligibleDrives } from "../../services/drive.service";
import { applyToDrive } from "../../services/application.service";

export default function EligibleDrives() {
  const [drives, setDrives] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);

  const [appliedIds, setAppliedIds] = useState([]);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEligibleDrives();
  }, []);

  const fetchEligibleDrives = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEligibleDrives();

      console.log(
        "Eligible drives:",
        response.data
      );

      setDrives(response.data.drives || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load eligible drives"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (driveId) => {
    const confirmed = window.confirm(
      "Do you want to apply for this placement drive?"
    );

    if (!confirmed) return;

    try {
      setApplyingId(driveId);
      setError("");
      setMessage("");

      const response = await applyToDrive(driveId);

      setAppliedIds((prev) => [
        ...prev,
        driveId,
      ]);

      setMessage(
        response.data.message ||
          "Application submitted successfully"
      );
    } catch (err) {
      console.error(err);

      const backendMessage =
        err.response?.data?.message ||
        "Failed to apply for drive";

      setError(backendMessage);

      if (
        err.response?.status === 409 ||
        backendMessage
          .toLowerCase()
          .includes("already applied")
      ) {
        setAppliedIds((prev) => [
          ...prev,
          driveId,
        ]);
      }
    } finally {
      setApplyingId(null);
    }
  };

  const filteredDrives = drives.filter(
    (drive) => {
      const text = search.toLowerCase().trim();

      return (
        (drive.title || "")
          .toLowerCase()
          .includes(text) ||
        (drive.jobRole || "")
          .toLowerCase()
          .includes(text) ||
        (drive.jobLocation || "")
          .toLowerCase()
          .includes(text) ||
        (drive.company?.companyName || "")
          .toLowerCase()
          .includes(text)
      );
    }
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <RefreshCw
            size={20}
            className="animate-spin"
          />
          Loading eligible drives...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

        <div>
          <p className="uppercase tracking-[4px] text-blue-500 text-sm">
            Placement Opportunities
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Eligible Drives
          </h1>

          <p className="text-gray-400 mt-3 max-w-2xl">
            Placement opportunities matching your
            academic profile, department, batch and
            eligibility criteria.
          </p>
        </div>

        <button
          onClick={fetchEligibleDrives}
          className="flex items-center justify-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* MESSAGE */}

      {message && (
        <div className="mb-6 p-4 rounded-xl border border-green-800 bg-green-950/30 text-green-400 flex items-center gap-3">
          <CheckCircle2 size={20} />
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 rounded-xl border border-red-800 bg-red-950/30 text-red-400">
          {error}
        </div>
      )}

      {/* SUMMARY */}

      <div className="grid sm:grid-cols-2 gap-5 mb-8 max-w-2xl">

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

          <p className="text-gray-500 text-sm">
            Eligible Opportunities
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {drives.length}
          </h2>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

          <p className="text-gray-500 text-sm">
            Applied This Session
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {appliedIds.length}
          </h2>

        </div>

      </div>

      {/* SEARCH */}

      <div className="relative max-w-2xl mb-8">

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
          placeholder="Search company, role or location..."
          className="w-full bg-[#111] border border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* EMPTY */}

      {filteredDrives.length === 0 ? (

        <div className="border border-gray-800 rounded-2xl p-16 text-center">

          <BriefcaseBusiness
            size={45}
            className="mx-auto text-gray-700 mb-4"
          />

          <h2 className="text-xl font-semibold">
            No eligible drives found
          </h2>

          <p className="text-gray-500 mt-2">
            New opportunities matching your profile
            will appear here.
          </p>

        </div>

      ) : (

        /* DRIVE GRID */

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredDrives.map((drive) => {
            const alreadyApplied =
              appliedIds.includes(drive._id);

            return (
              <div
                key={drive._id}
                className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition"
              >

                {/* TOP */}

                <div className="p-6">

                  <div className="flex justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center overflow-hidden">

                        {drive.company?.logo ? (
                          <img
                            src={drive.company.logo}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Building2 size={23} />
                        )}

                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {drive.company
                            ?.companyName ||
                            "Company"}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          Placement Drive
                        </p>

                      </div>

                    </div>

                    <span className="h-fit bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs capitalize">
                      {drive.status}
                    </span>

                  </div>

                  {/* TITLE */}

                  <div className="mt-6">

                    <h2 className="text-xl font-bold">
                      {drive.title}
                    </h2>

                    <p className="text-blue-400 mt-1">
                      {drive.jobRole}
                    </p>

                  </div>

                  {/* BASIC DETAILS */}

                  <div className="space-y-3 mt-6 text-gray-400">

                    <p className="flex items-center gap-3">
                      <MapPin size={17} />
                      {drive.jobLocation}
                    </p>

                    <p className="flex items-center gap-3">
                      <BriefcaseBusiness
                        size={17}
                      />
                      {formatJobType(
                        drive.jobType
                      )}
                    </p>

                    <p className="flex items-center gap-3">
                      <CalendarDays size={17} />

                      Drive:{" "}
                      {formatDate(
                        drive.driveDate
                      )}
                    </p>

                  </div>

                  {/* PACKAGE */}

                  <div className="grid grid-cols-2 gap-3 mt-6">

                    <div className="bg-[#090909] rounded-xl p-4">

                      <p className="text-gray-500 text-xs">
                        Package
                      </p>

                      <p className="font-semibold text-lg mt-1">
                        ₹{drive.ctc} LPA
                      </p>

                    </div>

                    <div className="bg-[#090909] rounded-xl p-4">

                      <p className="text-gray-500 text-xs">
                        Min CGPA
                      </p>

                      <p className="font-semibold text-lg mt-1">
                        {drive.minCGPA}
                      </p>

                    </div>

                  </div>

                  {/* ELIGIBILITY */}

                  <div className="mt-6">

                    <p className="text-sm text-gray-500 mb-3">
                      Eligibility
                    </p>

                    <div className="space-y-2 text-sm text-gray-400">

                      <p className="flex items-start gap-2">
                        <GraduationCap
                          size={16}
                          className="mt-0.5"
                        />

                        {drive.eligibleDepartments
                          ?.join(", ") ||
                          "All departments"}
                      </p>

                      <p className="flex items-start gap-2">
                        <Users
                          size={16}
                          className="mt-0.5"
                        />

                        Batch:{" "}
                        {drive.eligibleBatches
                          ?.join(", ") ||
                          "Not specified"}
                      </p>

                    </div>

                  </div>

                </div>

                {/* FOOTER */}

                <div className="border-t border-gray-800 p-5">

                  <p className="text-xs text-gray-500 mb-4">
                    Apply before{" "}
                    <span className="text-gray-300">
                      {formatDate(
                        drive.applicationDeadline
                      )}
                    </span>
                  </p>

                  <button
                    onClick={() =>
                      handleApply(drive._id)
                    }
                    disabled={
                      applyingId === drive._id ||
                      alreadyApplied
                    }
                    className={`w-full py-3 rounded-xl font-medium transition ${
                      alreadyApplied
                        ? "bg-green-500/10 text-green-400 border border-green-500/20 cursor-default"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    } disabled:opacity-70`}
                  >
                    {applyingId === drive._id
                      ? "Applying..."
                      : alreadyApplied
                      ? "Applied"
                      : "Apply Now"}
                  </button>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

function formatDate(date) {
  if (!date) return "Not specified";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function formatJobType(type) {
  if (!type) return "Not specified";

  return type
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
}