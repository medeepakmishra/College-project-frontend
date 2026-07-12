import { useEffect, useState } from "react";
import { analyzeResume } from "../../services/resumeAI.service";
import AIAssistant from "../../components/ai/AIAssistant";

import {
  Brain,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Building2,
  Sparkles,
} from "lucide-react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function AICareerCenter() {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const res = await analyzeResume();
     console.log(res.data);
setAnalysis(res.data.analysis);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load analysis.
      </div>
    );
  }

//   return (

//     <div className="space-y-8 text-white">

//       <div>
//         <h1 className="text-4xl font-bold flex items-center gap-3">
//           <Brain className="text-blue-500" />
//           AI Career Center
//         </h1>

//         <p className="text-zinc-400 mt-2">
//           AI powered resume analysis and placement guidance
//         </p>
//       </div>

//       {/* Scores */}

//       <div className="grid md:grid-cols-2 gap-8">

//         <div className="bg-[#171717] rounded-2xl p-8 border border-zinc-800 flex flex-col items-center">

//           <h2 className="font-semibold mb-6">
//             ATS Score
//           </h2>

//           <div className="w-40 h-40">
//             <CircularProgressbar
//               value={analysis.atsScore}
//               text={`${analysis.atsScore}%`}
//             />
//           </div>

//         </div>

//         <div className="bg-[#171717] rounded-2xl p-8 border border-zinc-800 flex flex-col items-center">

//           <h2 className="font-semibold mb-6">
//             Placement Readiness
//           </h2>

//           <div className="w-40 h-40">
//             <CircularProgressbar
//               value={analysis.placementReadiness}
//               text={`${analysis.placementReadiness}%`}
//             />
//           </div>

//         </div>

//       </div>

//       {/* Four Sections */}

//       <div className="grid md:grid-cols-2 gap-6">

//         <Card
//           title="Strengths"
//           icon={<CheckCircle className="text-green-500" />}
//           data={analysis.strengths}
//         />

//         <Card
//           title="Weaknesses"
//           icon={<AlertTriangle className="text-yellow-500" />}
//           data={analysis.weaknesses}
//         />

//         <Card
//           title="Missing Skills"
//           icon={<Sparkles className="text-red-500" />}
//           data={analysis.missingSkills}
//         />

//         <Card
//           title="Recommended Companies"
//           icon={<Building2 className="text-blue-500" />}
//           data={analysis.bestCompanies}
//         />

//       </div>

//       {/* Recommendations */}

//       <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">

//         <h2 className="text-2xl font-bold mb-5">
//           AI Recommendations
//         </h2>

//         <ul className="space-y-3">

//           {analysis.recommendations.map((item, index) => (

//             <li key={index}>
//               ✅ {item}
//             </li>

//           ))}

//         </ul>

//       </div>

//     </div>
//   );

return (
  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-white">

    {/* ================= LEFT SIDE ================= */}

    <div className="xl:col-span-2 space-y-8">

      <div>
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <Brain className="text-blue-500" />
          AI Career Center
        </h1>

        <p className="text-zinc-400 mt-2">
          AI powered resume analysis and placement guidance
        </p>
      </div>

      {/* Scores */}

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-[#171717] rounded-2xl p-8 border border-zinc-800 flex flex-col items-center">

          <h2 className="font-semibold mb-6">
            ATS Score
          </h2>

          <div className="w-40 h-40">
            <CircularProgressbar
              value={analysis.atsScore}
              text={`${analysis.atsScore}%`}
            />
          </div>

        </div>

        <div className="bg-[#171717] rounded-2xl p-8 border border-zinc-800 flex flex-col items-center">

          <h2 className="font-semibold mb-6">
            Placement Readiness
          </h2>

          <div className="w-40 h-40">
            <CircularProgressbar
              value={analysis.placementReadiness}
              text={`${analysis.placementReadiness}%`}
            />
          </div>

        </div>

      </div>

      {/* Four Sections */}

      <div className="grid md:grid-cols-2 gap-6">

        <Card
          title="Strengths"
          icon={<CheckCircle className="text-green-500" />}
          data={analysis.strengths}
        />

        <Card
          title="Weaknesses"
          icon={<AlertTriangle className="text-yellow-500" />}
          data={analysis.weaknesses}
        />

        <Card
          title="Missing Skills"
          icon={<Sparkles className="text-red-500" />}
          data={analysis.missingSkills}
        />

        <Card
          title="Recommended Companies"
          icon={<Building2 className="text-blue-500" />}
          data={analysis.bestCompanies}
        />

      </div>

      {/* Recommendations */}

      <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          AI Recommendations
        </h2>

        <ul className="space-y-3">

          {analysis.recommendations.map((item, index) => (

            <li key={index}>
              ✅ {item}
            </li>

          ))}

        </ul>

      </div>

    </div>

    {/* ================= RIGHT SIDE ================= */}

    <div className="xl:col-span-1">

      <div className="h-[85vh] sticky top-24">

        <AIAssistant />

      </div>

    </div>

  </div>
);
}

function Card({ title, icon, data }) {
  return (
    <div className="bg-[#171717] border border-zinc-800 rounded-2xl p-6">

      <div className="flex items-center gap-3 mb-5">

        {icon}

        <h2 className="text-xl font-bold">
          {title}
        </h2>

      </div>

      <ul className="space-y-3">

        {data.map((item, index) => (

          <li key={index}>
            • {item}
          </li>

        ))}

      </ul>

    </div>
  );
}