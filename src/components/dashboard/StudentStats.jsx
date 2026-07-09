import {
  BriefcaseBusiness,
  FileText,
  Bell,
  UserCheck,
} from "lucide-react";

const cards = [
  {
    title: "Eligible Drives",
    key: "eligibleDrives",
    icon: BriefcaseBusiness,
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Applications",
    key: "applications",
    icon: FileText,
    color: "from-green-600 to-emerald-500",
  },
  {
    title: "Announcements",
    key: "announcements",
    icon: Bell,
    color: "from-purple-600 to-pink-500",
  },
  {
    title: "Profile",
    key: "profileCompleted",
    icon: UserCheck,
    color: "from-orange-500 to-yellow-400",
  },
];

export default function StudentStats({ data }) {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-2xl bg-[#171717] border border-zinc-800 p-6 hover:border-blue-500 transition"
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-zinc-400 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">

                  {card.key === "profileCompleted"
                    ? data?.profileCompleted
                      ? "100%"
                      : "0%"
                    : data?.[card.key] ?? 0}

                </h2>

              </div>

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${card.color}
                flex items-center justify-center`}
              >
                <Icon size={28} />
              </div>

            </div>

          </div>

        );
      })}
    </div>
  );
}