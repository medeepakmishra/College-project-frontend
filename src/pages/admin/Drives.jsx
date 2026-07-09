import { useEffect, useState } from "react";
import {
  getDrives,
  createDrive,
  updateDrive,
  deleteDrive,
} from "../../services/drive.service";

import { getCompanies } from "../../services/company.service";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Building2,
  MapPin,
  CalendarDays,
  Search,
} from "lucide-react";

const initialForm = {
  company: "",
  title: "",
  jobRole: "",
  jobType: "full-time",
  ctc: "",
  internshipStipend: 0,
  jobLocation: "",
  description: "",
  minCGPA: "",
  maxBacklogs: 0,
  eligibleDepartments: "",
  eligibleBatches: "",
  applicationDeadline: "",
  driveDate: "",
  venue: "",
  driveMode: "offline",
  status: "draft",
};

export default function AdminDrives() {
  const [drives, setDrives] = useState([]);
  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState(initialForm);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [driveResponse, companyResponse] =
        await Promise.all([
          getDrives(),
          getCompanies(),
        ]);

      setDrives(driveResponse.data.drives || []);
      setCompanies(
        companyResponse.data.companies || []
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load data"
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

  const openCreateForm = () => {
    setEditingId(null);
    setForm(initialForm);
    setError("");
    setMessage("");
    setShowForm(true);
  };

  const openEditForm = (drive) => {
    setEditingId(drive._id);

    setForm({
      company: drive.company?._id || "",
      title: drive.title || "",
      jobRole: drive.jobRole || "",
      jobType: drive.jobType || "full-time",
      ctc: drive.ctc ?? "",
      internshipStipend:
        drive.internshipStipend ?? 0,
      jobLocation: drive.jobLocation || "",
      description: drive.description || "",
      minCGPA: drive.minCGPA ?? "",
      maxBacklogs: drive.maxBacklogs ?? 0,

      eligibleDepartments:
        drive.eligibleDepartments?.join(", ") || "",

      eligibleBatches:
        drive.eligibleBatches?.join(", ") || "",

      applicationDeadline:
        drive.applicationDeadline
          ? drive.applicationDeadline.slice(0, 10)
          : "",

      driveDate: drive.driveDate
        ? drive.driveDate.slice(0, 10)
        : "",

      venue: drive.venue || "",
      driveMode: drive.driveMode || "offline",
      status: drive.status || "draft",
    });

    setError("");
    setMessage("");
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        ...form,

        ctc: Number(form.ctc),

        internshipStipend: Number(
          form.internshipStipend || 0
        ),

        minCGPA: Number(form.minCGPA),

        maxBacklogs: Number(
          form.maxBacklogs || 0
        ),

        eligibleDepartments:
          form.eligibleDepartments
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

        eligibleBatches:
          form.eligibleBatches
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      };

      if (editingId) {
        await updateDrive(editingId, payload);

        setMessage(
          "Placement drive updated successfully"
        );
      } else {
        await createDrive(payload);

        setMessage(
          "Placement drive created successfully"
        );
      }

      await loadData();

      setShowForm(false);
      setForm(initialForm);
      setEditingId(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Operation failed"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this placement drive?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDrive(id);

      setDrives((prev) =>
        prev.filter((drive) => drive._id !== id)
      );

      setMessage(
        "Placement drive deleted successfully"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete drive"
      );
    }
  };

  const filteredDrives = drives.filter((drive) => {
    const text = search.toLowerCase();

    return (
      drive.title?.toLowerCase().includes(text) ||
      drive.jobRole?.toLowerCase().includes(text) ||
      drive.company?.companyName
        ?.toLowerCase()
        .includes(text)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center">
        Loading placement drives...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>
          <p className="text-blue-500 uppercase tracking-[4px] text-sm">
            Admin Center
          </p>

          <h1 className="text-3xl font-bold mt-2">
            Placement Drives
          </h1>

          <p className="text-gray-400 mt-2">
            Create and manage placement opportunities.
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition cursor-pointer"
        >
          <Plus size={20} />
          Create Drive
        </button>

      </div>

      {/* MESSAGES */}

      {message && (
        <div className="mb-6 border border-green-800 bg-green-950/30 text-green-400 p-4 rounded-xl">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-6 border border-red-800 bg-red-950/30 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* SEARCH */}

      <div className="relative max-w-md mb-8">

        <Search
          size={19}
          className="absolute left-4 top-3.5 text-gray-500"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search drives..."
          className="w-full bg-[#111] border border-gray-800 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>

      {/* DRIVE CARDS */}

      {filteredDrives.length === 0 ? (

        <div className="border border-gray-800 rounded-2xl p-16 text-center text-gray-500">
          No placement drives found.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {filteredDrives.map((drive) => (

            <div
              key={drive._id}
              className="bg-[#111] border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition"
            >

              <div className="flex justify-between gap-4">

                <div>

                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full mb-4 ${
                      drive.status === "open"
                        ? "bg-green-500/10 text-green-400"
                        : drive.status === "completed"
                        ? "bg-blue-500/10 text-blue-400"
                        : "bg-gray-700/40 text-gray-300"
                    }`}
                  >
                    {drive.status}
                  </span>

                  <h2 className="text-xl font-semibold">
                    {drive.title}
                  </h2>

                  <p className="text-blue-400 mt-1">
                    {drive.jobRole}
                  </p>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() => openEditForm(drive)}
                    className="h-9 w-9 flex items-center justify-center border border-gray-700 rounded-lg hover:border-blue-500 cursor-pointer"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(drive._id)
                    }
                    className="h-9 w-9 flex items-center justify-center border border-gray-700 rounded-lg hover:border-red-500 hover:text-red-400 cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>

                </div>

              </div>

              <div className="space-y-3 mt-6 text-gray-400">

                <p className="flex items-center gap-3">
                  <Building2 size={17} />
                  {drive.company?.companyName ||
                    "Unknown Company"}
                </p>

                <p className="flex items-center gap-3">
                  <MapPin size={17} />
                  {drive.jobLocation}
                </p>

                <p className="flex items-center gap-3">
                  <CalendarDays size={17} />
                  {drive.driveDate
                    ? new Date(
                        drive.driveDate
                      ).toLocaleDateString()
                    : "Not specified"}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <div className="bg-[#0a0a0a] rounded-xl p-3">
                  <p className="text-xs text-gray-500">
                    CTC
                  </p>
                  <p className="font-semibold mt-1">
                    ₹{drive.ctc} LPA
                  </p>
                </div>

                <div className="bg-[#0a0a0a] rounded-xl p-3">
                  <p className="text-xs text-gray-500">
                    Min CGPA
                  </p>
                  <p className="font-semibold mt-1">
                    {drive.minCGPA}
                  </p>
                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      {/* FORM MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">

          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            <div className="sticky top-0 bg-[#111] flex items-center justify-between p-6 border-b border-gray-800 z-10">

              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Placement Drive"
                  : "Create Placement Drive"}
              </h2>

              <button
                onClick={() => setShowForm(false)}
                className="cursor-pointer text-gray-400 hover:text-white"
              >
                <X />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 grid md:grid-cols-2 gap-5"
            >

              <SelectField
                label="Company"
                name="company"
                value={form.company}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select company
                </option>

                {companies.map((company) => (
                  <option
                    key={company._id}
                    value={company._id}
                  >
                    {company.companyName}
                  </option>
                ))}
              </SelectField>

              <InputField
                label="Drive Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />

              <InputField
                label="Job Role"
                name="jobRole"
                value={form.jobRole}
                onChange={handleChange}
                required
              />

              <SelectField
                label="Job Type"
                name="jobType"
                value={form.jobType}
                onChange={handleChange}
              >
                <option value="full-time">
                  Full Time
                </option>
                <option value="internship">
                  Internship
                </option>
                <option value="internship-with-ppo">
                  Internship With PPO
                </option>
              </SelectField>

              <InputField
                label="CTC (LPA)"
                name="ctc"
                type="number"
                value={form.ctc}
                onChange={handleChange}
                required
              />

              <InputField
                label="Internship Stipend"
                name="internshipStipend"
                type="number"
                value={form.internshipStipend}
                onChange={handleChange}
              />

              <InputField
                label="Job Location"
                name="jobLocation"
                value={form.jobLocation}
                onChange={handleChange}
                required
              />

              <InputField
                label="Minimum CGPA"
                name="minCGPA"
                type="number"
                step="0.1"
                value={form.minCGPA}
                onChange={handleChange}
                required
              />

              <InputField
                label="Maximum Backlogs"
                name="maxBacklogs"
                type="number"
                value={form.maxBacklogs}
                onChange={handleChange}
              />

              <InputField
                label="Departments"
                name="eligibleDepartments"
                value={form.eligibleDepartments}
                onChange={handleChange}
                placeholder="CSE, IT, ECE"
                required
              />

              <InputField
                label="Eligible Batches"
                name="eligibleBatches"
                value={form.eligibleBatches}
                onChange={handleChange}
                placeholder="2026, 2027"
                required
              />

              <InputField
                label="Application Deadline"
                name="applicationDeadline"
                type="date"
                value={form.applicationDeadline}
                onChange={handleChange}
                required
              />

              <InputField
                label="Drive Date"
                name="driveDate"
                type="date"
                value={form.driveDate}
                onChange={handleChange}
                required
              />

              <InputField
                label="Venue"
                name="venue"
                value={form.venue}
                onChange={handleChange}
              />

              <SelectField
                label="Drive Mode"
                name="driveMode"
                value={form.driveMode}
                onChange={handleChange}
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="hybrid">Hybrid</option>
              </SelectField>

              <SelectField
                label="Status"
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="draft">Draft</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="completed">
                  Completed
                </option>
                <option value="cancelled">
                  Cancelled
                </option>
              </SelectField>

              <div className="md:col-span-2">

                <label className="block text-sm text-gray-400 mb-2">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                />

              </div>

              <div className="md:col-span-2 flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-gray-700 px-5 py-3 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl cursor-pointer"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Drive"
                    : "Create Drive"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

function InputField({
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

function SelectField({
  label,
  children,
  ...props
}) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">
        {label}
      </label>

      <select
        {...props}
        className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
      >
        {children}
      </select>
    </div>
  );
}