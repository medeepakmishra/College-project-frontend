import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  Building2,
  ExternalLink,
  Globe,
  Loader2,
  MapPin,
  Search,
  X,
} from "lucide-react";

import { getCompanies } from "../../services/company.service";


export default function Companies() {

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [industry, setIndustry] = useState("All");


  // ==========================================
  // FETCH COMPANIES
  // ==========================================

  useEffect(() => {

    fetchCompanies();

  }, []);


  const fetchCompanies = async () => {

    try {

      setLoading(true);

      const response = await getCompanies();


      console.log(
        "Companies API Response:",
        response.data
      );


      // Supports common backend response structures

      const companyData =
        response.data.companies ||
        response.data.data ||
        response.data ||
        [];


      setCompanies(
        Array.isArray(companyData)
          ? companyData
          : []
      );


    } catch (error) {

      console.error(
        "Companies Fetch Error:",
        error
      );

      setCompanies([]);

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // GET INDUSTRIES
  // ==========================================

  const industries = useMemo(() => {

    const values = companies
      .map((company) => company.industry)
      .filter(Boolean);

    return [
      "All",
      ...new Set(values)
    ];

  }, [companies]);


  // ==========================================
  // FILTER COMPANIES
  // ==========================================

  const filteredCompanies = useMemo(() => {

    return companies.filter((company) => {

      const companyName =
        company.name?.toLowerCase() || "";

      const companyIndustry =
        company.industry?.toLowerCase() || "";

      const companyLocation =
        company.location?.toLowerCase() || "";


      const searchText =
        search.toLowerCase().trim();


      const matchesSearch =

        companyName.includes(searchText) ||

        companyIndustry.includes(searchText) ||

        companyLocation.includes(searchText);


      const matchesIndustry =

        industry === "All" ||

        company.industry === industry;


      return matchesSearch && matchesIndustry;

    });

  }, [companies, search, industry]);


  return (

    <div
      className="
        min-h-screen
        bg-[#090909]
        text-white
        relative
        overflow-hidden
      "
    >


      {/* =====================================
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
          top-[-200px]
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


      {/* =====================================
          NAVBAR
      ====================================== */}

      <nav
        className="
          relative
          z-50
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between
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

          <span className="text-blue-500">
            .
          </span>

        </Link>


        <div
          className="
            hidden
            md:flex
            gap-9
            text-gray-400
          "
        >

          <Link
            to="/"
            className="
              hover:text-blue-500
              transition
            "
          >
            Home
          </Link>


          <Link
            to="/about"
            className="
              hover:text-blue-500
              transition
            "
          >
            About
          </Link>


          <Link
            to="/companies"
            className="text-blue-500"
          >
            Companies
          </Link>


          <Link
            to="/drives"
            className="
              hover:text-blue-500
              transition
            "
          >
            Drives
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



      {/* =====================================
          PAGE HERO
      ====================================== */}

      <section
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          pt-20
          pb-16
        "
      >


        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-500
            hover:text-blue-500
            transition
            mb-8
          "
        >

          <ArrowLeft size={18} />

          Back to Home

        </Link>


        <div className="max-w-4xl">


          <p
            className="
              text-blue-500
              uppercase
              tracking-[5px]
              text-sm
            "
          >

            Campus Recruiters

          </p>


          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              mt-5
              leading-tight
            "
          >

            Explore Companies

            <span
              className="
                block
                text-blue-500
              "
            >

              Building Careers.

            </span>

          </h1>


          <p
            className="
              text-gray-400
              text-lg
              leading-8
              mt-7
              max-w-3xl
            "
          >

            Discover companies participating in campus
            placement opportunities. Explore industries,
            locations and company information before applying
            for placement drives.

          </p>


        </div>

      </section>



      {/* =====================================
          SEARCH AND FILTER
      ====================================== */}

      <section
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          pb-10
        "
      >


        <div
          className="
            bg-[#111111]/90
            border
            border-zinc-800
            rounded-2xl
            p-5
            flex
            flex-col
            md:flex-row
            gap-4
          "
        >


          {/* SEARCH */}

          <div
            className="
              relative
              flex-1
            "
          >

            <Search
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />


            <input

              type="text"

              value={search}

              onChange={(e) =>
                setSearch(e.target.value)
              }

              placeholder="Search by company, industry or location..."

              className="
                w-full
                bg-[#0b0b0b]
                border
                border-zinc-700
                rounded-xl
                py-3.5
                pl-12
                pr-12
                outline-none
                focus:border-blue-500
                transition
              "

            />


            {search && (

              <button

                type="button"

                onClick={() =>
                  setSearch("")
                }

                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-white
                  cursor-pointer
                "
              >

                <X size={19} />

              </button>

            )}

          </div>


          {/* INDUSTRY FILTER */}

          <select

            value={industry}

            onChange={(e) =>
              setIndustry(e.target.value)
            }

            className="
              bg-[#0b0b0b]
              border
              border-zinc-700
              rounded-xl
              px-5
              py-3.5
              outline-none
              focus:border-blue-500
              min-w-[210px]
              cursor-pointer
            "
          >


            {industries.map((item) => (

              <option
                key={item}
                value={item}
              >

                {item === "All"
                  ? "All Industries"
                  : item}

              </option>

            ))}


          </select>


        </div>


        {/* RESULT COUNT */}

        {!loading && (

          <div
            className="
              flex
              justify-between
              items-center
              mt-6
            "
          >

            <p className="text-gray-500">

              Showing{" "}

              <span className="text-white font-semibold">

                {filteredCompanies.length}

              </span>{" "}

              companies

            </p>


            {(search || industry !== "All") && (

              <button

                type="button"

                onClick={() => {

                  setSearch("");
                  setIndustry("All");

                }}

                className="
                  text-blue-500
                  hover:text-blue-400
                  text-sm
                  cursor-pointer
                "
              >

                Clear filters

              </button>

            )}

          </div>

        )}


      </section>



      {/* =====================================
          COMPANIES GRID
      ====================================== */}

      <section
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          pb-28
        "
      >


        {/* LOADING */}

        {loading && (

          <div
            className="
              min-h-[300px]
              flex
              flex-col
              items-center
              justify-center
              text-gray-500
            "
          >

            <Loader2
              size={38}
              className="
                animate-spin
                text-blue-500
                mb-4
              "
            />

            Loading companies...

          </div>

        )}



        {/* EMPTY */}

        {!loading &&
          filteredCompanies.length === 0 && (

            <div
              className="
                min-h-[350px]
                border
                border-zinc-800
                bg-[#111111]/80
                rounded-3xl
                flex
                flex-col
                items-center
                justify-center
                text-center
                p-8
              "
            >

              <div
                className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-blue-500/10
                  flex
                  items-center
                  justify-center
                "
              >

                <Building2
                  size={30}
                  className="text-blue-500"
                />

              </div>


              <h2
                className="
                  text-2xl
                  font-bold
                  mt-5
                "
              >

                No Companies Found

              </h2>


              <p
                className="
                  text-gray-500
                  mt-2
                "
              >

                Try changing your search or filter.

              </p>

            </div>

          )}



        {/* COMPANY CARDS */}

        {!loading &&
          filteredCompanies.length > 0 && (

            <div
              className="
                grid
                sm:grid-cols-2
                lg:grid-cols-3
                gap-6
              "
            >


              {filteredCompanies.map(
                (company) => (

                  <CompanyCard

                    key={company._id}

                    company={company}

                  />

                )
              )}


            </div>

          )}


      </section>



      {/* =====================================
          CTA
      ====================================== */}

      <section
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-6
          md:px-8
          pb-24
        "
      >


        <div
          className="
            bg-gradient-to-br
            from-blue-600/20
            via-[#111111]
            to-[#111111]
            border
            border-blue-500/20
            rounded-3xl
            px-8
            py-14
            text-center
          "
        >


          <h2
            className="
              text-3xl
              md:text-4xl
              font-bold
            "
          >

            Looking for placement opportunities?

          </h2>


          <p
            className="
              text-gray-400
              mt-4
            "
          >

            Explore active placement drives and find
            opportunities matching your profile.

          </p>


          <Link

            to="/drives"

            className="
              inline-flex
              mt-7
              bg-blue-600
              hover:bg-blue-700
              px-7
              py-3.5
              rounded-xl
              font-semibold
              transition
            "
          >

            Explore Placement Drives

          </Link>


        </div>

      </section>


    </div>

  );

}



// ==========================================
// COMPANY CARD
// ==========================================

function CompanyCard({ company }) {

  return (

    <div
      className="
        group
        bg-[#111111]/90
        border
        border-zinc-800
        rounded-2xl
        p-7
        hover:border-blue-500
        hover:-translate-y-1
        transition
        duration-300
        flex
        flex-col
      "
    >


      {/* ICON + INDUSTRY */}

      <div
        className="
          flex
          items-start
          justify-between
          gap-4
        "
      >


        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-blue-500/10
            border
            border-blue-500/20
            flex
            items-center
            justify-center
          "
        >

          <Building2
            size={26}
            className="text-blue-500"
          />

        </div>


        {company.industry && (

          <span
            className="
              text-xs
              text-blue-400
              bg-blue-500/10
              border
              border-blue-500/20
              rounded-full
              px-3
              py-1.5
            "
          >

            {company.industry}

          </span>

        )}


      </div>



      {/* COMPANY INFO */}

      <h2
        className="
          text-2xl
          font-bold
          mt-6
          group-hover:text-blue-400
          transition
        "
      >

        {company.name ||
          "Company Name"}

      </h2>


      {company.description && (

        <p
          className="
            text-gray-500
            mt-3
            leading-6
            text-sm
            line-clamp-3
          "
        >

          {company.description}

        </p>

      )}



      {/* DETAILS */}

      <div
        className="
          space-y-3
          mt-6
          text-sm
          text-gray-400
        "
      >


        {company.location && (

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <MapPin
              size={17}
              className="text-blue-500"
            />

            {company.location}

          </div>

        )}


        {company.website && (

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <Globe
              size={17}
              className="text-blue-500"
            />

            <span className="truncate">

              {company.website}

            </span>

          </div>

        )}


      </div>



      {/* BUTTONS */}

      <div
        className="
          flex
          gap-3
          mt-auto
          pt-7
        "
      >


        {company.website && (

          <a

            href={
              company.website.startsWith("http")
                ? company.website
                : `https://${company.website}`
            }

            target="_blank"

            rel="noreferrer"

            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              border
              border-zinc-700
              hover:border-blue-500
              hover:bg-blue-500/5
              py-3
              rounded-xl
              transition
            "
          >

            Website

            <ExternalLink size={16} />

          </a>

        )}


        <Link

          to={`/companies/${company._id}`}

          className="
            flex-1
            flex
            items-center
            justify-center
            bg-blue-600
            hover:bg-blue-700
            py-3
            rounded-xl
            transition
          "
        >

          View Details

        </Link>


      </div>


    </div>

  );

}
