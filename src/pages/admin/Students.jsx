import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Trash2,
  Trophy,
  UserRound,
  X,
} from "lucide-react";

import {
  getAllStudents,
  getStudent,
  deleteStudent,
} from "../../services/profile.service";


export default function Students() {
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] =
    useState(false);

  const [search, setSearch] = useState("");
  const [department, setDepartment] =
    useState("all");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    fetchStudents();
  }, []);


  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAllStudents();

      console.log(
        "Students response:",
        response.data
      );

      const data = response.data;

      setStudents(
        data.students ||
        data.profiles ||
        data.studentProfiles ||
        []
      );

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load students"
      );

    } finally {
      setLoading(false);
    }
  };


  const departments = useMemo(() => {
    return [
      ...new Set(
        students
          .map((student) => student.department)
          .filter(Boolean)
      ),
    ];
  }, [students]);


  const filteredStudents = students.filter(
    (student) => {

      const text = search
        .toLowerCase()
        .trim();

      const user = student.user || {};

      const matchesSearch =
        (user.name || "")
          .toLowerCase()
          .includes(text) ||

        (user.email || "")
          .toLowerCase()
          .includes(text) ||

        (student.rollNumber || "")
          .toLowerCase()
          .includes(text) ||

        (student.enrollmentNumber || "")
          .toLowerCase()
          .includes(text) ||

        (student.department || "")
          .toLowerCase()
          .includes(text);


      const matchesDepartment =
        department === "all" ||
        student.department === department;


      return (
        matchesSearch &&
        matchesDepartment
      );
    }
  );


  const stats = useMemo(() => {

    return {
      total: students.length,

      completed: students.filter(
        (student) =>
          student.isProfileCompleted
      ).length,

      placed: students.filter(
        (student) => student.isPlaced
      ).length,

      unplaced: students.filter(
        (student) => !student.isPlaced
      ).length,
    };

  }, [students]);


  const openStudentDetails = async (student) => {

    try {
      setShowModal(true);
      setDetailsLoading(true);
      setSelectedStudent(student);

      /*
        Your API route is:

        GET /api/profile/:id

        From our earlier debugging, use the
        StudentProfile _id here, NOT user._id.
      */

      const response = await getStudent(
        student._id
      );

      setSelectedStudent(
        response.data.profile ||
        response.data.student ||
        student
      );

    } catch (err) {
      console.error(err);

      /*
        Keep list data visible if detail API fails.
      */

      setError(
        err.response?.data?.message ||
          "Could not load complete student details"
      );

    } finally {
      setDetailsLoading(false);
    }
  };


  const closeModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };


  const handleDelete = async (student) => {

    const studentName =
      student.user?.name || "this student";

    const confirmed = window.confirm(
      `Delete profile of ${studentName}?`
    );

    if (!confirmed) return;


    try {
      setError("");
      setMessage("");

      await deleteStudent(student._id);

      setStudents((prev) =>
        prev.filter(
          (item) => item._id !== student._id
        )
      );

      setMessage(
        "Student profile deleted successfully"
      );

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to delete student profile"
      );
    }
  };


  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">

        <div>

          <p className="uppercase tracking-[4px] text-blue-500 text-sm">
            Admin Center
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Students
          </h1>

          <p className="text-gray-400 mt-3">
            View student academic profiles,
            placement status and professional details.
          </p>

        </div>


        <button
          onClick={fetchStudents}
          className="flex items-center justify-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <RefreshCw size={18} />

          Refresh
        </button>

      </div>


      {/* MESSAGES */}

      {message && (

        <div className="mb-6 p-4 bg-green-950/30 border border-green-800 text-green-400 rounded-xl">
          {message}
        </div>

      )}


      {error && (

        <div className="mb-6 p-4 bg-red-950/30 border border-red-800 text-red-400 rounded-xl">
          {error}
        </div>

      )}


      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        <StatCard
          label="Total Students"
          value={stats.total}
          icon={<GraduationCap size={22} />}
        />

        <StatCard
          label="Profiles Completed"
          value={stats.completed}
          icon={<FileText size={22} />}
        />

        <StatCard
          label="Placed"
          value={stats.placed}
          icon={<Trophy size={22} />}
        />

        <StatCard
          label="Unplaced"
          value={stats.unplaced}
          icon={
            <BriefcaseBusiness size={22} />
          }
        />

      </div>


      {/* SEARCH AND FILTER */}

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
            placeholder="Search name, email, roll number or enrollment..."
            className="w-full bg-[#111] border border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500"
          />

        </div>


        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          className="bg-[#111] border border-gray-800 rounded-xl px-5 py-4 outline-none focus:border-blue-500 cursor-pointer min-w-[200px]"
        >

          <option value="all">
            All Departments
          </option>

          {departments.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

      </div>


      {/* LOADING */}

      {loading && (

        <div className="flex items-center justify-center py-24 text-gray-400">

          <RefreshCw
            size={20}
            className="animate-spin mr-3"
          />

          Loading students...

        </div>

      )}


      {/* EMPTY */}

      {!loading &&
        filteredStudents.length === 0 && (

          <div className="border border-gray-800 rounded-2xl p-16 text-center">

            <GraduationCap
              size={45}
              className="mx-auto text-gray-700"
            />

            <h2 className="text-xl font-semibold mt-4">
              No students found
            </h2>

            <p className="text-gray-500 mt-2">
              Student profiles will appear here.
            </p>

          </div>

        )}


      {/* STUDENT TABLE */}

      {!loading &&
        filteredStudents.length > 0 && (

          <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1000px]">

                <thead className="bg-[#0d0d0d] border-b border-gray-800">

                  <tr className="text-left text-sm text-gray-500">

                    <th className="px-6 py-4 font-medium">
                      Student
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Academic
                    </th>

                    <th className="px-6 py-4 font-medium">
                      CGPA
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Batch
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Profile
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Placement
                    </th>

                    <th className="px-6 py-4 font-medium text-right">
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredStudents.map(
                    (student) => {

                      const user =
                        student.user || {};

                      return (

                        <tr
                          key={student._id}
                          className="border-b border-gray-800 last:border-b-0 hover:bg-white/[0.02] transition"
                        >

                          {/* STUDENT */}

                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="w-10 h-10 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0">

                                <UserRound size={19} />

                              </div>

                              <div>

                                <p className="font-medium">
                                  {user.name ||
                                    "Student"}
                                </p>

                                <p className="text-gray-500 text-sm mt-1">
                                  {student.rollNumber ||
                                    "No roll number"}
                                </p>

                              </div>

                            </div>

                          </td>


                          {/* ACADEMIC */}

                          <td className="px-6 py-5">

                            <p className="text-gray-300">
                              {student.department ||
                                "-"}
                            </p>

                            <p className="text-gray-500 text-sm mt-1">
                              {student.course || "-"}
                            </p>

                          </td>


                          {/* CGPA */}

                          <td className="px-6 py-5">

                            <span className="font-semibold">
                              {student.cgpa ?? "-"}
                            </span>

                          </td>


                          {/* BATCH */}

                          <td className="px-6 py-5 text-gray-300">
                            {student.batch || "-"}
                          </td>


                          {/* PROFILE */}

                          <td className="px-6 py-5">

                            <ProfileBadge
                              completed={
                                student.isProfileCompleted
                              }
                            />

                          </td>


                          {/* PLACEMENT */}

                          <td className="px-6 py-5">

                            <PlacementBadge
                              placed={
                                student.isPlaced
                              }
                            />

                          </td>
                          {/* RESUME */}

<td className="px-6 py-5">

{
student.resume?.url ? (

<a
href={student.resume.url}
target="_blank"
rel="noreferrer"
className="
inline-flex
items-center
gap-2
text-blue-400
hover:text-blue-300
text-sm
"
>

<FileText size={16}/>

View PDF

</a>

)
:
(
<span className="text-gray-600 text-sm">
No Resume
</span>
)

}

</td>


                          {/* ACTIONS */}

                          <td className="px-6 py-5">

                            <div className="flex justify-end gap-2">

                              <button
                                onClick={() =>
                                  openStudentDetails(
                                    student
                                  )
                                }
                                title="View details"
                                className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-lg hover:border-blue-500 hover:text-blue-400 transition cursor-pointer"
                              >
                                <Eye size={16} />
                              </button>


                              <button
                                onClick={() =>
                                  handleDelete(student)
                                }
                                title="Delete profile"
                                className="w-9 h-9 flex items-center justify-center border border-gray-700 rounded-lg hover:border-red-500 hover:text-red-400 transition cursor-pointer"
                              >
                                <Trash2 size={16} />
                              </button>

                            </div>

                          </td>

                        </tr>

                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}


      {/* STUDENT DETAILS MODAL */}

      {showModal && selectedStudent && (

        <StudentDetailsModal
          student={selectedStudent}
          loading={detailsLoading}
          onClose={closeModal}
        />

      )}

    </div>
  );
}



/* =====================================================
   STUDENT DETAILS MODAL
===================================================== */


function StudentDetailsModal({
  student,
  loading,
  onClose,
}) {

  const user = student.user || {};

  return (

    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">


        {/* HEADER */}

        <div className="sticky top-0 z-10 bg-[#111] border-b border-gray-800 p-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-bold">
              Student Profile
            </h2>

            <p className="text-gray-500 mt-1">
              Academic and professional information
            </p>

          </div>


          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={21} />
          </button>

        </div>


        {loading ? (

          <div className="py-24 flex justify-center text-gray-400">

            <RefreshCw
              size={20}
              className="animate-spin mr-3"
            />

            Loading profile...

          </div>

        ) : (

          <div className="p-6">


            {/* STUDENT TOP */}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#090909] border border-gray-800 rounded-2xl p-6">

              <div className="flex items-center gap-5">

                <div className="w-16 h-16 bg-blue-600/10 text-blue-400 rounded-2xl flex items-center justify-center">

                  <UserRound size={30} />

                </div>


                <div>

                  <h3 className="text-2xl font-bold">
                    {user.name || "Student"}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {student.rollNumber ||
                      "Roll number unavailable"}
                  </p>

                </div>

              </div>


              <PlacementBadge
                placed={student.isPlaced}
              />

            </div>


            {/* CONTACT */}

            <SectionTitle title="Contact Information" />

            <div className="grid md:grid-cols-2 gap-4">

              <DetailBox
                icon={<Mail size={17} />}
                label="Email"
                value={user.email || "-"}
              />

              <DetailBox
                icon={<Phone size={17} />}
                label="Phone"
                value={user.number || "-"}
              />

            </div>


            {/* ACADEMIC */}

            <SectionTitle title="Academic Information" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

              <SimpleBox
                label="Department"
                value={student.department}
              />

              <SimpleBox
                label="Course"
                value={student.course}
              />

              <SimpleBox
                label="Batch"
                value={student.batch}
              />

              <SimpleBox
                label="Semester"
                value={student.semester}
              />

              <SimpleBox
                label="CGPA"
                value={student.cgpa}
              />

              <SimpleBox
                label="Backlogs"
                value={student.backlogs}
              />

              <SimpleBox
                label="Enrollment No."
                value={
                  student.enrollmentNumber
                }
              />

              <SimpleBox
                label="Profile Status"
                value={
                  student.isProfileCompleted
                    ? "Completed"
                    : "Incomplete"
                }
              />

            </div>


            {/* SKILLS */}

            <SectionTitle title="Skills" />

            {student.skills?.length > 0 ? (

              <div className="flex flex-wrap gap-3">

                {student.skills.map(
                  (skill, index) => (

                    <span
                      key={`${skill}-${index}`}
                      className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-xl text-sm"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="text-gray-500">
                No skills added.
              </p>

            )}


            {/* PROFESSIONAL LINKS */}

            <SectionTitle title="Professional Links" />

            <div className="grid md:grid-cols-3 gap-4">

              <LinkCard
                label="GitHub"
                url={student.github}
              />

              <LinkCard
                label="LinkedIn"
                url={student.linkedin}
              />

              <LinkCard
                label="Portfolio"
                url={student.portfolio}
              />

            </div>


            {/* RESUME */}

            <SectionTitle title="Resume" />

            {student.resume?.url ? (

              <a
                href={student.resume.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition"
              >
                <FileText size={18} />

                View Resume

                <ExternalLink size={15} />
              </a>

            ) : (

              <p className="text-gray-500">
                Resume not uploaded.
              </p>

            )}


            {/* PLACEMENT INFORMATION */}

            {student.isPlaced && (

              <>
                <SectionTitle title="Placement Information" />

                <div className="grid md:grid-cols-2 gap-4">

                  <SimpleBox
                    label="Placed Company"
                    value={
                      student.placedCompany
                    }
                  />

                  <SimpleBox
                    label="Package"
                    value={
                      student.placedPackage
                        ? `₹${student.placedPackage} LPA`
                        : "-"
                    }
                  />

                </div>
              </>

            )}


            {/* PROJECT COUNT */}

            <SectionTitle title="Profile Summary" />

            <div className="grid grid-cols-3 gap-4">

              <CountBox
                icon={<Code2 size={20} />}
                value={
                  student.projects?.length || 0
                }
                label="Projects"
              />

              <CountBox
                icon={
                  <BriefcaseBusiness size={20} />
                }
                value={
                  student.internships?.length || 0
                }
                label="Internships"
              />

              <CountBox
                icon={<Award size={20} />}
                value={
                  student.certifications?.length ||
                  0
                }
                label="Certificates"
              />

            </div>

          </div>

        )}

      </div>

    </div>

  );
}



/* =====================================================
   SMALL COMPONENTS
===================================================== */


function StatCard({
  label,
  value,
  icon,
}) {

  return (

    <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

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


function ProfileBadge({ completed }) {

  return (

    <span
      className={`px-3 py-1.5 rounded-full text-xs ${
        completed
          ? "bg-green-500/10 text-green-400"
          : "bg-yellow-500/10 text-yellow-400"
      }`}
    >
      {completed
        ? "Completed"
        : "Incomplete"}
    </span>

  );
}


function PlacementBadge({ placed }) {

  return (

    <span
      className={`px-3 py-1.5 rounded-full text-xs ${
        placed
          ? "bg-green-500/10 text-green-400"
          : "bg-gray-800 text-gray-400"
      }`}
    >
      {placed ? "Placed" : "Unplaced"}
    </span>

  );
}


function SectionTitle({ title }) {

  return (

    <div className="mt-8 mb-4">

      <h3 className="font-semibold text-lg">
        {title}
      </h3>

    </div>

  );
}


function DetailBox({
  icon,
  label,
  value,
}) {

  return (

    <div className="bg-[#090909] border border-gray-800 rounded-xl p-4">

      <p className="flex items-center gap-2 text-gray-500 text-xs">
        {icon}
        {label}
      </p>

      <p className="text-gray-300 mt-2 break-all">
        {value}
      </p>

    </div>

  );
}


function SimpleBox({
  label,
  value,
}) {

  return (

    <div className="bg-[#090909] border border-gray-800 rounded-xl p-4">

      <p className="text-gray-500 text-xs">
        {label}
      </p>

      <p className="text-gray-300 mt-2">
        {value ?? "-"}
      </p>

    </div>

  );
}


function LinkCard({
  label,
  url,
}) {

  if (!url) {

    return (

      <div className="bg-[#090909] border border-gray-800 rounded-xl p-4">

        <p className="text-gray-400">
          {label}
        </p>

        <p className="text-gray-600 text-sm mt-2">
          Not added
        </p>

      </div>

    );
  }


  return (

    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="bg-[#090909] border border-gray-800 hover:border-blue-500 rounded-xl p-4 transition"
    >

      <p className="text-gray-300 flex items-center justify-between">

        {label}

        <ExternalLink size={15} />

      </p>

      <p className="text-blue-400 text-sm mt-2 truncate">
        {url}
      </p>

    </a>

  );
}


function CountBox({
  icon,
  value,
  label,
}) {

  return (

    <div className="bg-[#090909] border border-gray-800 rounded-xl p-5 text-center">

      <div className="text-blue-400 flex justify-center">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mt-3">
        {value}
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        {label}
      </p>

    </div>

  );
}