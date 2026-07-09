import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  GraduationCap,
  RefreshCw,
  Trophy,
  UserRound,
  Users,
} from "lucide-react";

import { getCompanies } from "../../services/company.service";
import { getDrives } from "../../services/drive.service";
import { getAllApplications } from "../../services/application.service";
import { getAllStudents } from "../../services/profile.service";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [drives, setDrives] = useState([]);
  const [applications, setApplications] = useState([]);
  const [students, setStudents] = useState([]);

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
        getCompanies(),
        getDrives(),
        getAllApplications(),
        getAllStudents(),
      ]);

      const companyResult = results[0];
      const driveResult = results[1];
      const applicationResult = results[2];
      const studentResult = results[3];

      if (companyResult.status === "fulfilled") {
        setCompanies(
          companyResult.value.data.companies || []
        );
      }

      if (driveResult.status === "fulfilled") {
        setDrives(
          driveResult.value.data.drives || []
        );
      }

      if (applicationResult.status === "fulfilled") {
        setApplications(
          applicationResult.value.data.applications || []
        );
      }

      if (studentResult.status === "fulfilled") {
        const data = studentResult.value.data;

        setStudents(
          data.students ||
          data.profiles ||
          data.studentProfiles ||
          []
        );
      }

      const failedRequests = results.filter(
        (result) => result.status === "rejected"
      );

      if (failedRequests.length > 0) {
        console.log(
          "Some dashboard requests failed:",
          failedRequests
        );

        setError(
          `${failedRequests.length} dashboard request(s) failed. Other data is still shown.`
        );
      }

    } catch (err) {
      console.error(err);

      setError("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    return {
      students: students.length,

      companies: companies.length,

      drives: drives.length,

      applications: applications.length,

      selected: applications.filter(
        (application) =>
          application.status === "selected"
      ).length,

      interviews: applications.filter(
        (application) =>
          application.status === "interview"
      ).length,
    };
  }, [
    students,
    companies,
    drives,
    applications,
  ]);

  const applicationStatusData = useMemo(() => {
    const statuses = [
      "applied",
      "shortlisted",
      "interview",
      "selected",
      "rejected",
    ];

    return statuses.map((status) => ({
      status,

      count: applications.filter(
        (application) =>
          application.status === status
      ).length,
    }));
  }, [applications]);

  const recentApplications = applications.slice(0, 5);

  const recentDrives = drives.slice(0, 4);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">

        <RefreshCw
          size={21}
          className="animate-spin mr-3"
        />

        <span className="text-gray-400">
          Loading admin dashboard...
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
            Admin Center
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Placement Dashboard
          </h1>

          <p className="text-gray-400 mt-3">
            Overview of students, recruiters, drives and
            placement activity.
          </p>

        </div>

        <button
          onClick={loadDashboard}
          className="flex items-center justify-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <RefreshCw size={18} />
          Refresh Data
        </button>

      </div>

      {/* PARTIAL ERROR */}

      {error && (
        <div className="mb-6 p-4 bg-yellow-950/20 border border-yellow-800/50 text-yellow-400 rounded-xl">
          {error}
        </div>
      )}

      {/* MAIN STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<GraduationCap size={23} />}
          label="Students"
          value={stats.students}
        />

        <StatCard
          icon={<Building2 size={23} />}
          label="Companies"
          value={stats.companies}
        />

        <StatCard
          icon={<BriefcaseBusiness size={23} />}
          label="Placement Drives"
          value={stats.drives}
        />

        <StatCard
          icon={<FileText size={23} />}
          label="Applications"
          value={stats.applications}
        />

      </div>

      {/* SECONDARY STATS */}

      <div className="grid md:grid-cols-2 gap-5 mb-10">

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Students Selected
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.selected}
              </h2>

            </div>

            <div className="w-14 h-14 bg-green-500/10 text-green-400 rounded-2xl flex items-center justify-center">
              <Trophy size={27} />
            </div>

          </div>

        </div>

        <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Interviews Scheduled
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {stats.interviews}
              </h2>

            </div>

            <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center">
              <CalendarDays size={27} />
            </div>

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <section className="mb-10">

        <div className="mb-5">

          <h2 className="text-xl font-semibold">
            Quick Actions
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Manage the placement process.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <ActionCard
            icon={<Building2 size={23} />}
            title="Manage Companies"
            text="Create and manage recruiters."
            onClick={() =>
              navigate("/admin/companies")
            }
          />

          <ActionCard
            icon={<BriefcaseBusiness size={23} />}
            title="Manage Drives"
            text="Create and update placement drives."
            onClick={() =>
              navigate("/admin/drives")
            }
          />

          <ActionCard
            icon={<FileText size={23} />}
            title="Applications"
            text="Review and update student status."
            onClick={() =>
              navigate("/admin/applications")
            }
          />

          <ActionCard
            icon={<Users size={23} />}
            title="Students"
            text="View registered student profiles."
            onClick={() =>
              navigate("/admin/students")
            }
          />

        </div>

      </section>

      {/* MAIN CONTENT */}

      <div className="grid xl:grid-cols-5 gap-7">

        {/* RECENT APPLICATIONS */}

        <section className="xl:col-span-3">

          <SectionHeader
            title="Recent Applications"
            subtitle="Latest student placement applications."
            buttonText="View All"
            onClick={() =>
              navigate("/admin/applications")
            }
          />

          {recentApplications.length === 0 ? (

            <EmptyBox
              icon={<FileText size={36} />}
              text="No applications received yet."
            />

          ) : (

            <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">

              {recentApplications.map(
                (application, index) => {

                  const user =
                    application.student?.user;

                  const drive =
                    application.drive;

                  return (
                    <div
                      key={application._id}
                      className={`p-5 ${
                        index !==
                        recentApplications.length - 1
                          ? "border-b border-gray-800"
                          : ""
                      }`}
                    >

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                        <div className="flex items-center gap-4">

                          <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                            <UserRound size={20} />
                          </div>

                          <div>

                            <h3 className="font-medium">
                              {user?.name ||
                                "Student"}
                            </h3>

                            <p className="text-gray-500 text-sm mt-1">
                              {drive?.jobRole ||
                                "Job Role"}{" "}
                              ·{" "}
                              {drive?.company
                                ?.companyName ||
                                "Company"}
                            </p>

                          </div>

                        </div>

                        <StatusBadge
                          status={application.status}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </section>

        {/* APPLICATION PIPELINE */}

        <section className="xl:col-span-2">

          <SectionHeader
            title="Application Pipeline"
            subtitle="Current application distribution."
          />

          <div className="bg-[#111] border border-gray-800 rounded-2xl p-6">

            <div className="space-y-6">

              {applicationStatusData.map(
                (item) => {

                  const percentage =
                    applications.length === 0
                      ? 0
                      : Math.round(
                          (item.count /
                            applications.length) *
                            100
                        );

                  return (
                    <div key={item.status}>

                      <div className="flex justify-between items-center mb-2">

                        <span className="text-sm text-gray-400 capitalize">
                          {item.status}
                        </span>

                        <div className="flex items-center gap-3">

                          <span className="text-xs text-gray-600">
                            {percentage}%
                          </span>

                          <span className="text-sm font-medium">
                            {item.count}
                          </span>

                        </div>

                      </div>

                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </section>

      </div>

      {/* RECENT DRIVES */}

      <section className="mt-10">

        <SectionHeader
          title="Recent Placement Drives"
          subtitle="Recently created recruitment opportunities."
          buttonText="Manage Drives"
          onClick={() =>
            navigate("/admin/drives")
          }
        />

        {recentDrives.length === 0 ? (

          <EmptyBox
            icon={
              <BriefcaseBusiness size={36} />
            }
            text="No placement drives created yet."
          />

        ) : (

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">

            {recentDrives.map((drive) => (

              <div
                key={drive._id}
                className="bg-[#111] border border-gray-800 hover:border-blue-500/40 rounded-2xl p-5 transition"
              >

                <div className="flex justify-between items-start gap-3">

                  <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">
                    <Building2 size={21} />
                  </div>

                  <DriveStatusBadge
                    status={drive.status}
                  />

                </div>

                <h3 className="font-semibold text-lg mt-5">
                  {drive.jobRole}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {drive.company?.companyName ||
                    "Company"}
                </p>

                <div className="border-t border-gray-800 mt-5 pt-4 space-y-3">

                  <p className="flex items-center gap-2 text-sm text-gray-400">

                    <CalendarDays size={15} />

                    {formatDate(drive.driveDate)}

                  </p>

                  <p className="flex items-center gap-2 text-sm text-gray-400">

                    <BriefcaseBusiness
                      size={15}
                    />

                    ₹{drive.ctc} LPA

                  </p>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}


/* =====================================================
   COMPONENTS
===================================================== */

function StatCard({
  icon,
  label,
  value,
}) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-5 hover:border-blue-500/30 transition">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-gray-500 text-sm">
            {label}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">
          {icon}
        </div>

      </div>

    </div>
  );
}


function ActionCard({
  icon,
  title,
  text,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="text-left bg-[#111] border border-gray-800 hover:border-blue-500/50 rounded-2xl p-5 transition cursor-pointer group"
    >

      <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">
        {icon}
      </div>

      <h3 className="font-semibold mt-5">
        {title}
      </h3>

      <p className="text-gray-500 text-sm mt-2 leading-6">
        {text}
      </p>

      <div className="flex items-center gap-2 text-blue-400 text-sm mt-4">

        Open

        <ArrowRight
          size={15}
          className="group-hover:translate-x-1 transition"
        />

      </div>

    </button>
  );
}


function SectionHeader({
  title,
  subtitle,
  buttonText,
  onClick,
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">

      <div>

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {subtitle}
        </p>

      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1 cursor-pointer shrink-0"
        >
          {buttonText}
          <ArrowRight size={15} />
        </button>
      )}

    </div>
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
      className={`px-3 py-1 rounded-full text-xs capitalize shrink-0 ${
        styles[status] ||
        "bg-gray-800 text-gray-400"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}


function DriveStatusBadge({ status }) {
  const styles = {
    open:
      "bg-green-500/10 text-green-400",

    draft:
      "bg-gray-500/10 text-gray-400",

    closed:
      "bg-red-500/10 text-red-400",

    completed:
      "bg-blue-500/10 text-blue-400",

    cancelled:
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


function EmptyBox({
  icon,
  text,
}) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-12 text-center">

      <div className="text-gray-700 flex justify-center">
        {icon}
      </div>

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