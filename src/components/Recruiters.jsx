const companies = [
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "Capgemini",
  "HCL",
  "Cognizant",
  "IBM",
];

export default function Recruiters() {
  return (
    <section className="relative py-24">

      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center">
          Trusted By Top Recruiters
        </h2>

        <p className="text-gray-400 text-center mt-4">
          Companies hiring students from our campus.
        </p>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-8 mt-14">

          {companies.map((company) => (

            <div
              key={company}
              className="bg-[#111111] border border-gray-800 rounded-2xl h-32 flex items-center justify-center
              hover:border-blue-500 hover:-translate-y-2 transition duration-300"
            >

              <h3 className="text-3xl font-bold text-gray-200">
                {company}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}