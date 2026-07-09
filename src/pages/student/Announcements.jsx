import { useEffect, useState } from "react";

import {
  Bell,
  CalendarDays,
  Megaphone,
  RefreshCw,
  Search,
} from "lucide-react";

import {
  getAnnouncements,
} from "../../services/announcement.service";


export default function StudentAnnouncements() {

  const [announcements, setAnnouncements] =
    useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

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
            Student Portal
          </p>


          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Announcements
          </h1>


          <p className="text-gray-400 mt-3">
            Stay updated with placement drives,
            interviews and important notices.
          </p>

        </div>


        <button
          onClick={fetchAnnouncements}
          className="flex items-center justify-center gap-2 border border-gray-700 hover:border-blue-500 px-5 py-3 rounded-xl transition cursor-pointer"
        >

          <RefreshCw size={18} />

          Refresh

        </button>


      </div>


      {error && (

        <div className="mb-6 p-4 bg-red-950/30 border border-red-800 text-red-400 rounded-xl">
          {error}
        </div>

      )}


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

        <div className="py-24 flex justify-center text-gray-400">

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
              No announcements
            </h2>

            <p className="text-gray-500 mt-2">
              New placement updates will appear here.
            </p>

          </div>

        )}


      {/* LIST */}

      {!loading && (

        <div className="space-y-5">


          {filteredAnnouncements.map(
            (announcement, index) => (

              <article
                key={announcement._id}
                className="bg-[#111] border border-gray-800 hover:border-blue-500/30 rounded-2xl p-6 transition"
              >


                <div className="flex gap-5">


                  <div className="w-12 h-12 shrink-0 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center">

                    <Megaphone size={22} />

                  </div>


                  <div className="flex-1">


                    <div className="flex flex-wrap items-center gap-3">


                      <h2 className="text-xl font-semibold">
                        {announcement.title}
                      </h2>


                      {index === 0 && (

                        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs">
                          Latest
                        </span>

                      )}


                    </div>


                    <p className="text-gray-400 leading-7 mt-4">

                      {announcement.message ||
                        announcement.content}

                    </p>


                    <p className="flex items-center gap-2 text-gray-600 text-sm mt-5">

                      <CalendarDays size={15} />

                      {formatDateTime(
                        announcement.createdAt
                      )}

                    </p>


                  </div>


                </div>


              </article>

            )
          )}


        </div>

      )}


    </div>

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