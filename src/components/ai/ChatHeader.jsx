import { Bot, Sparkles } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="border-b border-zinc-800 bg-[#171717]">

      <div className="px-5 py-4 flex items-center gap-4">

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <Bot
            size={24}
            className="text-white"
          />
        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-bold text-white">
              AI Career Copilot
            </h2>

            <Sparkles
              size={16}
              className="text-yellow-400"
            />

          </div>

          <p className="text-sm text-zinc-400 mt-1">
            Resume • ATS • Interview • Placement Guidance
          </p>

        </div>

        <div
          className="
            w-3
            h-3
            rounded-full
            bg-green-500
            animate-pulse
          "
        />

      </div>

    </div>
  );
}