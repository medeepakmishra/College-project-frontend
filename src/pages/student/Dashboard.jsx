import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  MapPin,
  RefreshCw,
  Trophy,
  UserRound,
  ArrowRight,
} from "lucide-react";

import { getEligibleDrives } from "../../services/drive.service";

import {
  getMyApplications,
} from "../../services/application.service";

import {
  getMyProfile,
} from "../../services/profile.service";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [drives, setDrives] = useState([]);
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const results = await Promise.allSettled([
        getMyProfile(),
        getEligibleDrives(),
        getMyApplications(),
      ]);

      const profileResult = results[0];
      const driveResult = results[1];
      const applicationResult = results[2];

      if (profileResult.status === "fulfilled") {
        setProfile(
          profileResult.value.data.profile || null
        );
      }

      if (driveResult.status === "fulfilled") {
        setDrives(
          driveResult.value.data.drives || []
        );
      }

      if (
        applicationResult.status === "fulfilled"
      ) {
        setApplications(
          applicationResult.value.data
            .applications || []
        );
      }

    } catch (err) {
      console.error(err);

      setError(
        "Failed to load dashboard information"
      );
    } finally {
      setLoading(false);
    }
  };

  const selectedCount = applications.filter(
    (app) => app.status === "selected"
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "interview"
  ).length;

  const recentApplications =
    applications.slice(0, 4);

  const upcomingDrives = [...drives]
    .sort(
      (a, b) =>
        new Date(a.driveDate) -
        new Date(b.driveDate)
    )
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">

        <RefreshCw
          className="animate-spin mr-3"
          size={21}
        />

        <span className="text-gray-400">
          Loading dashboard...
        </span>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

        <div>

          <p className="uppercase tracking-[4px] text-blue-500 text-sm">
            Student Portal
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Welcome
            {profile?.user?.name
              ? `, ${profile.user.name}`
              : ""}
          </h1>

          <p className="text-gray-400 mt-3">
            Track opportunities, applications and
            your placement progress.
          </p>

        </div>

        <button
          onClick={loadDashboard}
          className="flex items-center justify-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {error && (
        <div className="mb-6 border border-red-800 bg-red-950/30 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* PROFILE WARNING */}

      {profile &&
        !profile.isProfileCompleted && (

          <div className="mb-8 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">

            <div className="flex gap-4">

              <div className="w-11 h-11 bg-yellow-500/10 text-yellow-400 rounded-xl flex items-center justify-center shrink-0">
                <UserRound size={21} />
              </div>

              <div>

                <h3 className="font-semibold">
                  Complete your profile
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Complete your academic profile to
                  view eligible placement drives.
                </p>

              </div>

            </div>

            <button
              onClick={() =>
                navigate("/student/profile")
              }
              className="bg-yellow-500 text-black px-5 py-2.5 rounded-xl font-medium cursor-pointer"
            >
              Complete Profile
            </button>

          </div>

        )}

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

        <StatCard
          icon={
            <BriefcaseBusiness size={23} />
          }
          label="Eligible Drives"
          value={drives.length}
        />

        <StatCard
          icon={<FileText size={23} />}
          label="Applications"
          value={applications.length}
        />

        <StatCard
          icon={<CalendarDays size={23} />}
          label="Interviews"
          value={interviewCount}
        />

        <StatCard
          icon={<Trophy size={23} />}
          label="Selections"
          value={selectedCount}
        />

      </div>

      {/* QUICK ACTIONS */}

      <section className="mb-10">

        <div className="mb-5">

          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Access important placement features.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <ActionCard
            icon={
              <BriefcaseBusiness size={25} />
            }
            title="Eligible Drives"
            description="View opportunities matching your profile."
            onClick={() =>
              navigate(
                "/student/eligible-drives"
              )
            }
          />

          <ActionCard
            icon={<FileText size={25} />}
            title="My Applications"
            description="Track application and selection status."
            onClick={() =>
              navigate(
                "/student/applications"
              )
            }
          />

          <ActionCard
            icon={<UserRound size={25} />}
            title="My Profile"
            description="Update academic and professional details."
            onClick={() =>
              navigate("/student/profile")
            }
          />

        </div>

      </section>

      {/* MAIN GRID */}

      <div className="grid xl:grid-cols-5 gap-7">

        {/* UPCOMING DRIVES */}

        <section className="xl:col-span-3">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-semibold">
                Eligible Opportunities
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Latest drives matching your profile.
              </p>
            </div>

            <button
              onClick={() =>
                navigate(
                  "/student/eligible-drives"
                )
              }
              className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 cursor-pointer"
            >
              View all
              <ArrowRight size={16} />
            </button>

          </div>

          {upcomingDrives.length === 0 ? (

            <EmptyBox
              text="No eligible drives available."
            />

          ) : (

            <div className="space-y-4">

              {upcomingDrives.map((drive) => (

                <div
                  key={drive._id}
                  className="bg-[#111] border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition"
                >

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                    <div className="flex items-center gap-4">

                      <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">

                        {drive.company?.logo ? (

                          <img
                            src={drive.company.logo}
                            alt=""
                            className="w-full h-full object-contain rounded-xl"
                          />

                        ) : (

                          <Building2 size={22} />

                        )}

                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {drive.jobRole}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          {drive.company
                            ?.companyName ||
                            "Company"}
                        </p>

                      </div>

                    </div>

                    <div className="flex flex-wrap gap-3 text-sm">

                      <span className="bg-[#090909] border border-gray-800 px-3 py-2 rounded-lg text-gray-400 flex items-center gap-2">

                        <MapPin size={14} />

                        {drive.jobLocation}

                      </span>

                      <span className="bg-[#090909] border border-gray-800 px-3 py-2 rounded-lg text-gray-400">

                        ₹{drive.ctc} LPA

                      </span>

                    </div>

                  </div>

                  <div className="border-t border-gray-800 mt-5 pt-4 flex justify-between items-center">

                    <p className="text-gray-500 text-sm flex items-center gap-2">

                      <CalendarDays size={15} />

                      {formatDate(
                        drive.driveDate
                      )}

                    </p>

                    <button
                      onClick={() =>
                        navigate(
                          "/student/eligible-drives"
                        )
                      }
                      className="text-blue-400 text-sm cursor-pointer"
                    >
                      View Details
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* APPLICATION ACTIVITY */}

        <section className="xl:col-span-2">

          <div className="flex justify-between items-center mb-5">

            <div>

              <h2 className="text-xl font-semibold">
                Recent Applications
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                Latest application activity.
              </p>

            </div>

          </div>

          {recentApplications.length === 0 ? (

            <EmptyBox
              text="You haven't applied to any drive."
            />

          ) : (

            <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">

              {recentApplications.map(
                (application, index) => (

                  <div
                    key={application._id}
                    className={`p-5 ${
                      index !==
                      recentApplications.length - 1
                        ? "border-b border-gray-800"
                        : ""
                    }`}
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <h3 className="font-medium">
                          {application.drive
                            ?.jobRole ||
                            "Job Role"}
                        </h3>

                        <p className="text-gray-500 text-sm mt-1">
                          {application.drive
                            ?.company
                            ?.companyName ||
                            "Company"}
                        </p>

                      </div>

                      <StatusBadge
                        status={
                          application.status
                        }
                      />

                    </div>

                    <p className="text-xs text-gray-600 mt-3 flex items-center gap-2">

                      <Clock3 size={13} />

                      Applied{" "}
                      {formatDate(
                        application.createdAt
                      )}

                    </p>

                  </div>

                )
              )}

              <button
                onClick={() =>
                  navigate(
                    "/student/applications"
                  )
                }
                className="w-full py-4 text-blue-400 hover:bg-white/[0.02] transition cursor-pointer text-sm"
              >
                View All Applications
              </button>

            </div>

          )}

        </section>

      </div>

    </div>
  );
}


/* COMPONENTS */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

      <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <h2 className="text-3xl font-bold mt-5">
        {value}
      </h2>

      <p className="text-gray-500 text-sm mt-1">
        {label}
      </p>

    </div>
  );
}


function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-[#111] border border-gray-800 hover:border-blue-500/50 rounded-2xl p-5 transition cursor-pointer group"
    >

      <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-semibold text-lg mt-5">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 leading-6">
        {description}
      </p>

      <div className="text-blue-400 mt-4 flex items-center gap-2 text-sm">
        Open
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition"
        />
      </div>

    </button>
  );
}


function StatusBadge({ status }) {
  const styles = {
    applied:
      "bg-blue-500/10 text-blue-400",

    shortlisted:
      "bg-yellow-500/10 text-yellow-400",

    interview:
      "bg-purple-500/10 text-purple-400",

    selected:
      "bg-green-500/10 text-green-400",

    rejected:
      "bg-red-500/10 text-red-400",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs capitalize ${
        styles[status] ||
        "bg-gray-800 text-gray-400"
      }`}
    >
      {status}
    </span>
  );
}


function EmptyBox({ text }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-10 text-center">

      <GraduationCap
        size={35}
        className="mx-auto text-gray-700"
      />

      <p className="text-gray-500 mt-4">
        {text}
      </p>

    </div>
  );
}


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