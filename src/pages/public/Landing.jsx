import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Building2,
  BriefcaseBusiness,
  Users,
  Trophy,
  CalendarDays,
  MapPin,
  IndianRupee,
  ExternalLink,
  Loader2,
} from "lucide-react";

import { getCompanies } from "../../services/company.service";
import { getDrives } from "../../services/drive.service";
import Recruiters from "../../components/Recruiters";

export default function Landing() {
  const [companies, setCompanies] = useState([]);
  const [drives, setDrives] = useState([]);

  const [loadingCompanies, setLoadingCompanies] = useState(true);

  const [loadingDrives, setLoadingDrives] = useState(true);

  // ==========================================
  // FETCH COMPANIES
  // ==========================================

  useEffect(() => {
    fetchCompanies();
    fetchDrives();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();

      const companyData =
        response.data.companies || response.data.data || response.data || [];

      setCompanies(Array.isArray(companyData) ? companyData : []);
    } catch (error) {
      console.error("Company fetch error:", error);
    } finally {
      setLoadingCompanies(false);
    }
  };

  // ==========================================
  // FETCH DRIVES
  // ==========================================

  const fetchDrives = async () => {
    try {
      const response = await getDrives();

      const driveData =
        response.data.drives || response.data.data || response.data || [];

      setDrives(Array.isArray(driveData) ? driveData : []);
    } catch (error) {
      console.error("Drive fetch error:", error);
    } finally {
      setLoadingDrives(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#090909]
        text-white
        overflow-hidden
        relative
      "
    >
      {/* ======================================
          GRID BACKGROUND
      ====================================== */}

      <div
        className="
          fixed
          inset-0
          opacity-20
          pointer-events-none
        "
        style={{
          backgroundImage: `

            linear-gradient(
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            )

          `,

          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}

      <div
        className="
          fixed
          top-0
          left-1/2
          -translate-x-1/2
          w-[700px]
          h-[700px]
          bg-blue-600/20
          blur-[180px]
          rounded-full
          pointer-events-none
        "
      />

      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav
        className="
          relative
          z-50
          max-w-7xl
          mx-auto
          flex
          justify-between
          items-center
          px-6
          md:px-8
          py-6
        "
      >
        <Link
          to="/"
          className="
            text-2xl
            font-bold
            tracking-wide
          "
        >
          RMLAU
          <span className="text-blue-500">.</span>
        </Link>

        <div
          className="
            hidden
            md:flex
            gap-10
            text-gray-300
          "
        >
          <a href="#home" className="hover:text-blue-500 transition">
            Home
          </a>

         
          <Link to="/companies" className="hover:text-blue-500 transition" >
          Companies 
          </Link>

       

          <Link to="/drives" className="hover:text-blue-500 transition">
          Drives
          </Link>

          <Link to="/about" className="hover:text-blue-500 transition">
            About
          </Link>
        </div>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="
              px-5
              py-2.5
              text-gray-300
              hover:text-white
              transition
            "
          >
            Login
          </Link>

          <Link
            to="/register"
            className="
              bg-blue-600
              hover:bg-blue-700
              px-5
              py-2.5
              rounded-lg
              transition
            "
          >
            Register
          </Link>
        </div>
      </nav>

      {/* ======================================
          HERO SECTION
      ====================================== */}

      <section
        id="home"
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          py-20
          lg:py-28
          grid
          lg:grid-cols-2
          gap-20
          items-center
        "
      >
        {/* LEFT */}

        <div>
          <div
            className="
              inline-flex
              items-center
              gap-2
              border
              border-blue-500/20
              bg-blue-500/10
              text-blue-400
              px-4
              py-2
              rounded-full
              text-sm
              mb-7
            "
          >
            <BriefcaseBusiness size={16} />
            RMLAU Placement Portal
          </div>

          <h1
            className="
              text-5xl
              md:text-6xl
              xl:text-7xl
              font-black
              leading-[1.1]
            "
          >
            Build Your Career.
            <span
              className="
                block
                text-blue-500
                mt-2
              "
            >
              Shape Your Future.
            </span>
          </h1>

          <p
            className="
              mt-8
              text-gray-400
              text-lg
              leading-8
              max-w-xl
            "
          >
            The centralized placement platform for Dr. Ram Manohar Lohia Avadh
            University. Discover companies, explore placement drives, manage
            your profile and track your applications from one place.
          </p>

          <div
            className="
              flex
              flex-wrap
              gap-5
              mt-10
            "
          >
            <Link
              to="/register"
              className="
                flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                px-7
                py-4
                rounded-xl
                text-lg
                font-semibold
                transition
              "
            >
              Get Started
              <ArrowRight size={20} />
            </Link>

            <a
              href="#drives"
              className="
                border
                border-gray-700
                hover:border-blue-500
                hover:bg-blue-500/5
                px-7
                py-4
                rounded-xl
                text-lg
                transition
              "
            >
              Explore Drives
            </a>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex justify-center">
          <div
            className="
              relative
              w-full
              max-w-[480px]
              min-h-[480px]
              rounded-3xl
              border
              border-gray-700
              bg-gradient-to-br
              from-[#1a1a1a]
              to-[#0d0d0d]
              shadow-[0_0_80px_rgba(37,99,235,.25)]
              p-8
              flex
              flex-col
              justify-center
            "
          >
            <div
              className="
                absolute
                top-6
                right-6
                h-3
                w-3
                rounded-full
                bg-green-500
                animate-pulse
              "
            />

            <p
              className="
                text-sm
                uppercase
                tracking-[4px]
                text-blue-500
              "
            >
              Campus Opportunities
            </p>

            <h2
              className="
                text-4xl
                font-bold
                mt-5
              "
            >
              Your placement journey starts here.
            </h2>

            <div
              className="
                mt-8
                space-y-4
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  p-4
                "
              >
                <Building2 className="text-blue-500" />

                <div>
                  <p className="font-semibold">Explore Companies</p>

                  <p className="text-sm text-gray-500">
                    Discover campus recruiters
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  p-4
                "
              >
                <BriefcaseBusiness className="text-blue-500" />

                <div>
                  <p className="font-semibold">Placement Drives</p>

                  <p className="text-sm text-gray-500">
                    Find your eligible opportunities
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-4
                  bg-white/5
                  border
                  border-white/10
                  rounded-xl
                  p-4
                "
              >
                <Trophy className="text-blue-500" />

                <div>
                  <p className="font-semibold">Track Progress</p>

                  <p className="text-sm text-gray-500">
                    Manage your applications
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          DYNAMIC STATS
      ====================================== */}

      <section
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          py-16
        "
      >
        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          <StatCard
            icon={Building2}
            value={companies.length}
            label="Registered Companies"
          />

          <StatCard
            icon={BriefcaseBusiness}
            value={drives.length}
            label="Placement Drives"
          />

          <StatCard
            icon={Users}
            value="Students"
            label="Growing Talent Network"
          />

          <StatCard icon={Trophy} value="Career" label="Opportunities" />
        </div>
      </section>

      {/* ======================================
          COMPANIES
      ====================================== */}

      <section
        id="companies"
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          py-24
        "
      >
        <SectionHeading
          small="OUR RECRUITERS"
          title="Companies Hiring From Campus"
          description="
            Explore organizations participating in
            campus placement opportunities.
          "
        />

        {loadingCompanies ? (
          <LoadingSection text="Loading companies..." />
        ) : companies.length === 0 ? (
          <EmptyMessage text="No companies available right now." />
        ) : (
          <div
            className="
              grid
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              gap-6
              mt-12
            "
          >
            {companies.slice(0, 8).map((company) => (
              <div
                key={company._id}
                className="
                    group
                    bg-[#111111]/90
                    border
                    border-gray-800
                    rounded-2xl
                    p-6
                    hover:border-blue-500
                    hover:-translate-y-1
                    transition
                    duration-300
                  "
              >
                <div
                  className="
                      h-14
                      w-14
                      rounded-xl
                      bg-blue-500/10
                      border
                      border-blue-500/20
                      flex
                      items-center
                      justify-center
                    "
                >
                  <Building2 className="text-blue-500" />
                </div>

                <h3
                  className="
                      text-xl
                      font-bold
                      mt-5
                    "
                >
                  {company.name}
                </h3>

                <p
                  className="
                      text-gray-500
                      text-sm
                      mt-2
                    "
                >
                  {company.industry || "Campus Recruiter"}
                </p>

                {company.location && (
                  <div
                    className="
                        flex
                        items-center
                        gap-2
                        mt-4
                        text-sm
                        text-gray-400
                      "
                  >
                    <MapPin size={15} />

                    {company.location}
                  </div>
                )}

                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        text-blue-500
                        hover:text-blue-400
                      "
                  >
                    Visit website
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ======================================
          PLACEMENT DRIVES
      ====================================== */}

      <section
        id="drives"
        className="
          relative
          z-10
          border-y
          border-white/5
          bg-[#0c0c0c]/80
          py-24
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            md:px-8
          "
        >
          <SectionHeading
            small="LATEST OPPORTUNITIES"
            title="Upcoming Placement Drives"
            description="
              Explore active recruitment opportunities
              and start preparing for your next career move.
            "
          />

          {loadingDrives ? (
            <LoadingSection text="Loading drives..." />
          ) : drives.length === 0 ? (
            <EmptyMessage text="No placement drives available right now." />
          ) : (
            <div
              className="
                grid
                md:grid-cols-2
                lg:grid-cols-3
                gap-6
                mt-12
              "
            >
              {drives.slice(0, 6).map((drive) => (
                <div
                  key={drive._id}
                  className="
                      bg-[#151515]
                      border
                      border-zinc-800
                      rounded-2xl
                      p-6
                      hover:border-blue-500
                      transition
                    "
                >
                  <div
                    className="
                        flex
                        justify-between
                        items-start
                        gap-4
                      "
                  >
                    <div>
                      <p
                        className="
                            text-sm
                            text-blue-500
                            font-medium
                          "
                      >
                        {drive.company?.name ||
                          drive.companyName ||
                          "Placement Drive"}
                      </p>

                      <h3
                        className="
                            text-2xl
                            font-bold
                            mt-2
                          "
                      >
                        {drive.title || drive.role || "Campus Recruitment"}
                      </h3>
                    </div>

                    <div
                      className="
                          h-11
                          w-11
                          shrink-0
                          rounded-xl
                          bg-blue-500/10
                          flex
                          items-center
                          justify-center
                        "
                    >
                      <BriefcaseBusiness size={21} className="text-blue-500" />
                    </div>
                  </div>

                  <div
                    className="
                        space-y-3
                        mt-6
                        text-sm
                        text-gray-400
                      "
                  >
                    {drive.package && (
                      <div
                        className="
                            flex
                            items-center
                            gap-3
                          "
                      >
                        <IndianRupee size={16} />

                        {drive.package}
                      </div>
                    )}

                    {drive.location && (
                      <div
                        className="
                            flex
                            items-center
                            gap-3
                          "
                      >
                        <MapPin size={16} />

                        {drive.location}
                      </div>
                    )}

                    {drive.deadline && (
                      <div
                        className="
                            flex
                            items-center
                            gap-3
                          "
                      >
                        <CalendarDays size={16} />
                        Deadline:{" "}
                        {new Date(drive.deadline).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/login"
                    className="
                        mt-7
                        flex
                        items-center
                        justify-center
                        gap-2
                        w-full
                        border
                        border-zinc-700
                        hover:border-blue-500
                        hover:bg-blue-600
                        py-3
                        rounded-xl
                        transition
                      "
                  >
                    Login to Apply
                    <ArrowRight size={17} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ======================================
          RECRUITERS COMPONENT
      ====================================== */}
      {/* 
      <div className="relative z-10">

        <Recruiters />

      </div> */}

      {/* ======================================
    PLACEMENT SUPPORT SECTION
====================================== */}

      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-28">
        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-blue-500 text-sm font-medium tracking-[5px] uppercase">
            Beyond Job Listings
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-5">
            Preparing Students For
            <span className="text-blue-500"> Career Success</span>
          </h2>

          <p className="text-gray-400 mt-6 leading-7 text-lg">
            The placement journey is not only about applying for jobs. Students
            need preparation, communication skills, interview confidence and
            career guidance to become industry ready.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {/* Career Guidance */}

          <div className="group bg-[#111111]/90 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
              >
                <path d="M12 2v20" />
                <path d="m17 5-5-3-5 3" />
                <path d="m17 19-5 3-5-3" />
                <path d="M2 12h20" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mt-6">Career Guidance</h3>

            <p className="text-gray-500 mt-3 leading-6 text-sm">
              Career-oriented guidance helps students understand opportunities,
              prepare early and make better professional decisions.
            </p>

            <div className="mt-6 h-px bg-zinc-800 group-hover:bg-blue-500/30 transition" />

            <p className="text-blue-500 text-sm mt-4">
              Build a clear career path →
            </p>
          </div>

          {/* Mock Interviews */}

          <div className="group bg-[#111111]/90 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                <path d="M8 9h8" />
                <path d="M8 13h5" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mt-6">Mock Interviews</h3>

            <p className="text-gray-500 mt-3 leading-6 text-sm">
              Practice interview situations and improve confidence,
              communication and the ability to present skills effectively.
            </p>

            <div className="mt-6 h-px bg-zinc-800 group-hover:bg-blue-500/30 transition" />

            <p className="text-blue-500 text-sm mt-4">
              Prepare with confidence →
            </p>
          </div>

          {/* Group Discussion */}

          <div className="group bg-[#111111]/90 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mt-6">Group Discussions</h3>

            <p className="text-gray-500 mt-3 leading-6 text-sm">
              Develop teamwork, listening, leadership and structured
              communication skills required during recruitment processes.
            </p>

            <div className="mt-6 h-px bg-zinc-800 group-hover:bg-blue-500/30 transition" />

            <p className="text-blue-500 text-sm mt-4">
              Communicate effectively →
            </p>
          </div>

          {/* Communication */}

          <div className="group bg-[#111111]/90 border border-zinc-800 rounded-2xl p-7 hover:border-blue-500 hover:-translate-y-2 transition duration-300">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-500"
              >
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            </div>

            <h3 className="text-xl font-bold mt-6">Communication Skills</h3>

            <p className="text-gray-500 mt-3 leading-6 text-sm">
              Improve professional communication and presentation skills needed
              for interviews and workplace interactions.
            </p>

            <div className="mt-6 h-px bg-zinc-800 group-hover:bg-blue-500/30 transition" />

            <p className="text-blue-500 text-sm mt-4">
              Become industry ready →
            </p>
          </div>
        </div>

        {/* Bottom Process */}

        <div className="mt-20 bg-[#111111]/80 border border-zinc-800 rounded-3xl p-8 md:p-12">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-12 items-center">
            <div>
              <p className="text-blue-500 text-sm tracking-[4px] uppercase">
                Your Journey
              </p>

              <h3 className="text-3xl md:text-4xl font-bold mt-4">
                From Profile To Placement
              </h3>

              <p className="text-gray-400 mt-5 leading-7">
                The portal brings the important steps of the campus placement
                journey into one connected workflow.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  number: "01",
                  title: "Create Profile",
                  text: "Add academic and skill details",
                },
                {
                  number: "02",
                  title: "Find Drives",
                  text: "Explore eligible opportunities",
                },
                {
                  number: "03",
                  title: "Apply",
                  text: "Submit placement applications",
                },
                {
                  number: "04",
                  title: "Track",
                  text: "Follow application progress",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="relative bg-[#0c0c0c] border border-zinc-800 rounded-2xl p-5 hover:border-blue-500/50 transition"
                >
                  <span className="text-3xl font-black text-blue-500/30">
                    {step.number}
                  </span>

                  <h4 className="font-semibold mt-4">{step.title}</h4>

                  <p className="text-gray-500 text-sm mt-2 leading-5">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================
          ABOUT / CTA
      ====================================== */}

      <section
        id="about"
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          py-28
        "
      >
        <div
          className="
            relative
            overflow-hidden
            border
            border-blue-500/20
            bg-gradient-to-br
            from-blue-600/20
            via-[#111111]
            to-[#111111]
            rounded-3xl
            px-8
            py-16
            md:p-16
            text-center
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-96
              h-96
              bg-blue-600/20
              blur-[120px]
              pointer-events-none
            "
          />

          <div className="relative z-10">
            <p
              className="
                text-blue-500
                uppercase
                tracking-[5px]
                text-sm
              "
            >
              Start Your Journey
            </p>

            <h2
              className="
                text-4xl
                md:text-5xl
                font-bold
                mt-5
              "
            >
              Ready for your next opportunity?
            </h2>

            <p
              className="
                text-gray-400
                max-w-2xl
                mx-auto
                mt-5
                leading-7
              "
            >
              Create your student account, complete your academic profile and
              discover placement drives for which you are eligible.
            </p>

            <Link
              to="/register"
              className="
                inline-flex
                items-center
                gap-2
                bg-blue-600
                hover:bg-blue-700
                px-8
                py-4
                rounded-xl
                font-semibold
                mt-8
                transition
              "
            >
              Create Student Account
              <ArrowRight size={19} />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer
        className="
          relative
          z-10
          border-t
          border-zinc-800
          bg-[#080808]
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            md:px-8
            py-10
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-5
          "
        >
          <div>
            <h2 className="text-xl font-bold">
              RMLAU
              <span className="text-blue-500">.</span>
            </h2>

            <p
              className="
                text-gray-500
                text-sm
                mt-1
              "
            >
              Placement Portal
            </p>
          </div>

          <p
            className="
              text-sm
              text-gray-600
              text-center
            "
          >
            Dr. Ram Manohar Lohia Avadh University
          </p>

          <div className="flex gap-5 text-sm">
            <Link to="/login" className="text-gray-400 hover:text-white">
              Login
            </Link>

            <Link to="/register" className="text-gray-400 hover:text-white">
              Register
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({ icon: Icon, value, label }) {
  return (
    <div
      className="
        bg-[#111111]/80
        border
        border-gray-800
        rounded-2xl
        p-7
        hover:border-blue-500
        transition
      "
    >
      <Icon className="text-blue-500" size={25} />

      <h2
        className="
          text-3xl
          md:text-4xl
          font-bold
          mt-5
        "
      >
        {value}
      </h2>

      <p
        className="
          text-gray-500
          mt-2
          text-sm
        "
      >
        {label}
      </p>
    </div>
  );
}

// ==========================================
// SECTION HEADING
// ==========================================

function SectionHeading({ small, title, description }) {
  return (
    <div className="max-w-2xl">
      <p
        className="
          text-blue-500
          text-sm
          font-medium
          tracking-[4px]
        "
      >
        {small}
      </p>

      <h2
        className="
          text-4xl
          md:text-5xl
          font-bold
          mt-4
        "
      >
        {title}
      </h2>

      <p
        className="
          text-gray-400
          mt-5
          leading-7
        "
      >
        {description}
      </p>
    </div>
  );
}

// ==========================================
// LOADING
// ==========================================

function LoadingSection({ text }) {
  return (
    <div
      className="
        flex
        items-center
        gap-3
        mt-12
        text-gray-400
      "
    >
      <Loader2 size={22} className="animate-spin text-blue-500" />

      {text}
    </div>
  );
}

// ==========================================
// EMPTY STATE
// ==========================================

function EmptyMessage({ text }) {
  return (
    <div
      className="
        mt-12
        border
        border-zinc-800
        bg-[#111111]
        rounded-2xl
        p-10
        text-center
        text-gray-500
      "
    >
      {text}
    </div>
  );
}
