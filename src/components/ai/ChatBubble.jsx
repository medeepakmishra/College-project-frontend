import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function ChatBubble({ sender, text }) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={`flex gap-3 ${
        sender === "user"
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {/* AI Avatar */}

      {sender === "ai" && (
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-indigo-600
            flex
            items-center
            justify-center
            flex-shrink-0
            shadow-lg
          "
        >
          <Bot
            size={18}
            className="text-white"
          />
        </div>
      )}

      {/* Message */}

      <div
        className={`group relative max-w-[80%] rounded-2xl px-5 py-4 whitespace-pre-wrap leading-7 shadow-md transition-all duration-300 ${
          sender === "user"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-[#222] border border-zinc-700 text-zinc-200"
        }`}
      >
        {text}

        {/* Copy button only for AI */}

        {sender === "ai" && (
          <button
            onClick={copyText}
            className="
              absolute
              -bottom-4
              right-2
              opacity-0
              group-hover:opacity-100
              transition
              bg-zinc-900
              border
              border-zinc-700
              rounded-lg
              p-2
              hover:bg-zinc-800
            "
          >
            {copied ? (
              <Check
                size={15}
                className="text-green-400"
              />
            ) : (
              <Copy
                size={15}
                className="text-zinc-300"
              />
            )}
          </button>
        )}
      </div>

      {/* User Avatar */}

      {sender === "user" && (
        <div
          className="
            w-10
            h-10
            rounded-full
            bg-zinc-700
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          <User
            size={18}
            className="text-white"
          />
        </div>
      )}
    </div>
  );
}