import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Loader2, Sparkles } from "lucide-react";

import { sendMessage } from "../../services/ChatAI.service";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `👋 Hello Deepak!

I'm your AI Career Copilot.

I already know your:

• Resume
• ATS Score
• Placement Readiness
• Student Profile

Ask me anything about placements, resume improvement, interview preparation or career roadmap.`,
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatContainerRef = useRef(null);

  // Auto scroll only inside chat
useEffect(() => {

  const container = chatContainerRef.current;

  if (!container) return;


  const isAtBottom =
    container.scrollHeight -
    container.scrollTop -
    container.clientHeight < 100;


  if (isAtBottom) {

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });

  }

}, [messages]);

  const askAI = async (question) => {
    if (!question.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question,
      },
    ]);

    setLoading(true);

    try {
      const res = await sendMessage(question);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "❌ Something went wrong while contacting AI.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const question = input;

    setInput("");

    await askAI(question);
  };

  const quickQuestions = [
    "Improve my ATS score",
    "Best companies for me",
    "Resume tips",
    "30 day roadmap",
    "Interview preparation",
    "Missing skills",
  ];

  return (
    <div
      className="
    h-full
    bg-[#161616]
    border
    border-zinc-800
    rounded-2xl
    overflow-hidden
    flex
    flex-col
    shadow-xl
  "
    >
      {/* HEADER */}

      <div className="border-b border-zinc-800 px-5 py-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">
          <Bot size={22} className="text-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">AI Career Copilot</h2>

          <p className="text-sm text-zinc-400">
            Personalized Placement Assistant
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}

      <div className="border-b border-zinc-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-yellow-400" />

          <p className="text-sm text-zinc-300 font-medium">Quick Actions</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((item) => (
            <button
              key={item}
              onClick={() => askAI(item)}
              className="
                px-3
                py-2
                rounded-full
                text-xs
                bg-blue-600/10
                text-blue-400
                hover:bg-blue-600/20
                transition
              "
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}

      <div
        ref={chatContainerRef}
        className="
    flex-1
    min-h-0
    overflow-y-auto
    p-5
    space-y-5
    scroll-smooth
  "
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[90%] ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.sender === "user" ? "bg-zinc-700" : "bg-blue-600"
                }`}
              >
                {msg.sender === "user" ? (
                  <User size={18} className="text-white" />
                ) : (
                  <Bot size={18} className="text-white" />
                )}
              </div>

              <div
                className={`rounded-2xl px-4 py-3 whitespace-pre-wrap leading-7 ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-[#222] text-zinc-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>

            <div className="bg-[#222] rounded-2xl px-5 py-4 flex items-center gap-2">
              <Loader2 size={18} className="animate-spin text-blue-400" />

              <span className="text-zinc-400 text-sm">AI is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* INPUT */}

      <div className="border-t border-zinc-800 p-4 bg-[#161616]">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything about placements..."
            className="
              flex-1
              bg-[#0d0d0d]
              border
              border-zinc-700
              rounded-xl
              px-4
              py-4
              text-white
              outline-none
              focus:border-blue-500
            "
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="
              w-14
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              flex
              items-center
              justify-center
              transition
            "
          >
            <Send size={20} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
