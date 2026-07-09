import { useEffect, useState } from "react";

import {
  Bell,
  CalendarDays,
  Megaphone,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

import {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "../../services/announcement.service";


const initialForm = {
  title: "",
  message: "",
};


export default function AdminAnnouncements() {

  const [announcements, setAnnouncements] =
    useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(initialForm);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  useEffect(() => {
    fetchAnnouncements();
  }, []);


  const fetchAnnouncements = async () => {

    try {

      setLoading(true);

      setError("");

      const response =
        await getAnnouncements();

      console.log(
        "Announcements:",
        response.data
      );

      setAnnouncements(
        response.data.announcements || []
      );

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load announcements"
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


  const openCreateModal = () => {

    setEditingId(null);

    setForm(initialForm);

    setShowModal(true);

    setError("");

  };


  const openEditModal = (announcement) => {

    setEditingId(announcement._id);

    setForm({
      title: announcement.title || "",

      message:
        announcement.message ||
        announcement.content ||
        "",
    });

    setShowModal(true);

  };


  const closeModal = () => {

    setShowModal(false);

    setEditingId(null);

    setForm(initialForm);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.message.trim()
    ) {

      setError(
        "Title and message are required"
      );

      return;

    }


    try {

      setSaving(true);

      setError("");

      setMessage("");


      if (editingId) {

        await updateAnnouncement(
          editingId,
          form
        );

        setMessage(
          "Announcement updated successfully"
        );

      } else {

        await createAnnouncement(form);

        setMessage(
          "Announcement created successfully"
        );

      }


      closeModal();

      await fetchAnnouncements();


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Announcement operation failed"
      );

    } finally {

      setSaving(false);

    }

  };


  const handleDelete = async (id) => {

    const confirmed = window.confirm(
      "Delete this announcement?"
    );

    if (!confirmed) return;


    try {

      setError("");

      setMessage("");

      await deleteAnnouncement(id);


      setAnnouncements((prev) =>
        prev.filter(
          (announcement) =>
            announcement._id !== id
        )
      );


      setMessage(
        "Announcement deleted successfully"
      );


    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to delete announcement"
      );

    }

  };


  const filteredAnnouncements =
    announcements.filter((announcement) => {

      const text = search
        .toLowerCase()
        .trim();

      return (

        (announcement.title || "")
          .toLowerCase()
          .includes(text) ||

        (
          announcement.message ||
          announcement.content ||
          ""
        )
          .toLowerCase()
          .includes(text)

      );

    });


  return (

    <div className="min-h-screen bg-[#090909] text-white p-6 md:p-10">


      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">


        <div>

          <p className="uppercase tracking-[4px] text-blue-500 text-sm">
            Admin Center
          </p>


          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Announcements
          </h1>


          <p className="text-gray-400 mt-3">
            Publish important placement updates
            and information for students.
          </p>

        </div>


        <div className="flex gap-3">


          <button
            onClick={fetchAnnouncements}
            className="flex items-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
          >
            <RefreshCw size={18} />

            Refresh
          </button>


          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl transition cursor-pointer"
          >
            <Plus size={19} />

            New Announcement
          </button>


        </div>

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

      <div className="grid sm:grid-cols-2 gap-5 mb-8 max-w-2xl">


        <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Total Announcements
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {announcements.length}
              </h2>

            </div>


            <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">

              <Megaphone size={21} />

            </div>

          </div>

        </div>


        <div className="bg-[#111] border border-gray-800 rounded-2xl p-5">

          <div className="flex justify-between">

            <div>

              <p className="text-gray-500 text-sm">
                Latest Update
              </p>

              <p className="font-semibold mt-3">
                {announcements.length
                  ? formatDate(
                      announcements[0]
                        .createdAt
                    )
                  : "No announcements"}
              </p>

            </div>


            <div className="w-11 h-11 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">

              <CalendarDays size={21} />

            </div>

          </div>

        </div>


      </div>


      {/* SEARCH */}

      <div className="relative mb-8">

        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />


        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search announcements..."
          className="w-full bg-[#111] border border-gray-800 rounded-xl py-4 pl-12 pr-4 outline-none focus:border-blue-500"
        />

      </div>


      {/* LOADING */}

      {loading && (

        <div className="py-24 flex justify-center items-center text-gray-400">

          <RefreshCw
            size={20}
            className="animate-spin mr-3"
          />

          Loading announcements...

        </div>

      )}


      {/* EMPTY */}

      {!loading &&
        filteredAnnouncements.length === 0 && (

          <div className="border border-gray-800 rounded-2xl p-16 text-center">

            <Bell
              size={45}
              className="mx-auto text-gray-700"
            />


            <h2 className="text-xl font-semibold mt-4">
              No announcements found
            </h2>


            <p className="text-gray-500 mt-2">
              Create an announcement to inform
              students.
            </p>

          </div>

        )}


      {/* ANNOUNCEMENT LIST */}

      {!loading && (

        <div className="space-y-5">


          {filteredAnnouncements.map(
            (announcement) => (

              <div
                key={announcement._id}
                className="bg-[#111] border border-gray-800 hover:border-gray-700 rounded-2xl p-6 transition"
              >


                <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">


                  <div className="flex gap-4">


                    <div className="w-12 h-12 shrink-0 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">

                      <Megaphone size={22} />

                    </div>


                    <div>


                      <h2 className="text-xl font-semibold">
                        {announcement.title}
                      </h2>


                      <p className="text-gray-400 mt-3 leading-7 max-w-4xl">

                        {announcement.message ||
                          announcement.content}

                      </p>


                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-4">

                        <CalendarDays size={15} />

                        {formatDateTime(
                          announcement.createdAt
                        )}

                      </div>


                    </div>


                  </div>


                  <div className="flex gap-2 shrink-0">


                    <button
                      onClick={() =>
                        openEditModal(
                          announcement
                        )
                      }
                      className="w-10 h-10 flex items-center justify-center border border-gray-700 hover:border-yellow-500 hover:text-yellow-400 rounded-lg transition cursor-pointer"
                    >
                      <Pencil size={16} />
                    </button>


                    <button
                      onClick={() =>
                        handleDelete(
                          announcement._id
                        )
                      }
                      className="w-10 h-10 flex items-center justify-center border border-gray-700 hover:border-red-500 hover:text-red-400 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>


                  </div>


                </div>


              </div>

            )
          )}


        </div>

      )}


      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">


          <div className="bg-[#111] border border-gray-800 rounded-2xl w-full max-w-2xl">


            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-gray-800 p-6">


              <div>

                <h2 className="text-2xl font-bold">

                  {editingId
                    ? "Edit Announcement"
                    : "New Announcement"}

                </h2>


                <p className="text-gray-500 text-sm mt-1">
                  Publish information for students.
                </p>

              </div>


              <button
                onClick={closeModal}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-800 rounded-lg cursor-pointer text-gray-400 hover:text-white"
              >
                <X size={21} />
              </button>


            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="p-6"
            >


              <div>

                <label className="block text-gray-400 text-sm mb-2">
                  Title
                </label>


                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Placement drive update"
                  className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>


              <div className="mt-5">

                <label className="block text-gray-400 text-sm mb-2">
                  Message
                </label>


                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="7"
                  placeholder="Write announcement details..."
                  className="w-full bg-[#090909] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 resize-none"
                />

              </div>


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
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-xl transition cursor-pointer"
                >

                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Announcement"
                    : "Publish Announcement"}

                </button>


              </div>


            </form>


          </div>


        </div>

      )}


    </div>

  );

}


function formatDate(date) {

  if (!date) return "Unavailable";

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

  if (!date) return "Unavailable";

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