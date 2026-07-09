import { GraduationCap, Target, Building2, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#090909] text-white">

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-8 pt-24 pb-16">

        <p className="uppercase tracking-[5px] text-blue-500">
          About Placement Portal
        </p>

        <h1 className="text-6xl font-black mt-5">
          Empowering Students
          <span className="block text-blue-500">
            Towards Successful Careers
          </span>
        </h1>

        <p className="text-gray-400 mt-8 text-lg leading-8 max-w-4xl">
          The RMLAU Placement Portal is a centralized platform designed
          to simplify campus recruitment. It connects students,
          recruiters and the placement cell through one secure and
          efficient system.
        </p>

      </section>

      {/* Mission */}

      <section className="max-w-7xl mx-auto px-8 py-16">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-8">

            <Target className="text-blue-500 mb-6" size={40} />

            <h2 className="text-3xl font-bold mb-4">
              Our Mission
            </h2>

            <p className="text-gray-400 leading-8">
              To bridge the gap between students and industry by
              providing a modern placement management system where
              students can build profiles, apply for drives and track
              their placement journey efficiently.
            </p>

          </div>

          <div className="bg-[#111111] border border-zinc-800 rounded-3xl p-8">

            <Building2 className="text-blue-500 mb-6" size={40} />

            <h2 className="text-3xl font-bold mb-4">
              What We Offer
            </h2>

            <ul className="space-y-4 text-gray-400">

              <li>✔ Student Profile Management</li>

              <li>✔ Company Management</li>

              <li>✔ Placement Drive Management</li>

              <li>✔ Online Applications</li>

              <li>✔ Application Tracking</li>

              <li>✔ Placement Cell Administration</li>

            </ul>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="max-w-7xl mx-auto px-8 py-16">

        <h2 className="text-4xl font-bold text-center mb-16">
          Portal Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-8">

            <GraduationCap className="text-blue-500 mb-5" size={36} />

            <h3 className="text-2xl font-semibold mb-3">
              Student Portal
            </h3>

            <p className="text-gray-400 leading-7">
              Create profile, upload resume, apply for placement
              drives and monitor application status.
            </p>

          </div>

          <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-8">

            <Building2 className="text-blue-500 mb-5" size={36} />

            <h3 className="text-2xl font-semibold mb-3">
              Recruiters
            </h3>

            <p className="text-gray-400 leading-7">
              Companies can participate in campus recruitment,
              publish drives and shortlist eligible students.
            </p>

          </div>

          <div className="bg-[#111111] border border-zinc-800 rounded-2xl p-8">

            <Users className="text-blue-500 mb-5" size={36} />

            <h3 className="text-2xl font-semibold mb-3">
              Placement Cell
            </h3>

            <p className="text-gray-400 leading-7">
              Manage companies, placement drives, announcements
              and student applications through one dashboard.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}