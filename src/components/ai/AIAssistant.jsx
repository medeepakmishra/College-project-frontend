// import { useState } from "react";
// import {
//   Bot,
//   Send,
//   Loader2,
// } from "lucide-react";

// import { sendMessage } from "../../services/chatAI.service";


// export default function AIAssistant() {

//   const [messages, setMessages] = useState([
//     {
//       sender: "ai",
//       text:
//         "👋 Hello! I'm your AI Career Copilot.\n\nI've already analyzed your resume.\n\nAsk me anything about placements, ATS score, resume improvements or interview preparation.",
//     },
//   ]);

//   const [input, setInput] = useState("");

//   const [loading, setLoading] =
//     useState(false);

//   const handleSend = async () => {

//     if (!input.trim()) return;

//     const question = input;

//     setMessages((prev) => [
//       ...prev,
//       {
//         sender: "user",
//         text: question,
//       },
//     ]);

//     setInput("");

//     setLoading(true);

//     try {

//       const res =
//         await sendMessage(question);

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "ai",
//           text: res.data.reply,
//         },
//       ]);

//     } catch {

//       setMessages((prev) => [
//         ...prev,
//         {
//           sender: "ai",
//           text:
//             "Something went wrong. Please try again.",
//         },
//       ]);

//     }

//     setLoading(false);

//   };

//   return (


  

//     <div
//       className="
//       h-full
//       bg-[#171717]
//       border border-zinc-800
//       rounded-2xl
//       flex flex-col
//     "
//     >

//       {/* Header */}

//       <div className="p-5 border-b border-zinc-800">

//         <div className="flex items-center gap-3">

//           <Bot
//             className="text-blue-500"
//             size={24}
//           />

//           <div>

//             <h2 className="text-lg font-bold text-white">
//               AI Career Copilot
//             </h2>

//             <p className="text-sm text-zinc-400">
//               Personalized Placement Assistant
//             </p>

//           </div>

//         </div>

//       </div>

//       {/* Quick Actions */}

//       <div className="p-4 flex flex-wrap gap-2 border-b border-zinc-800">

//         {[
//           "Improve ATS",
//           "Best Companies",
//           "Resume Tips",
//           "30 Day Roadmap",
//         ].map((item) => (

//           <button
//             key={item}
//             onClick={() =>
//               setInput(item)
//             }
//             className="
//               text-xs
//               bg-blue-600/10
//               text-blue-400
//               px-3
//               py-2
//               rounded-full
//               hover:bg-blue-600/20
//             "
//           >
//             {item}
//           </button>

//         ))}

//       </div>

//       {/* Chat */}

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">

//         {messages.map((msg, i) => (

//           <div
//             key={i}
//             className={`flex ${
//               msg.sender === "user"
//                 ? "justify-end"
//                 : "justify-start"
//             }`}
//           >

//             <div
//               className={`max-w-[85%] rounded-xl px-4 py-3 whitespace-pre-wrap ${
//                 msg.sender === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-zinc-800 text-zinc-200"
//               }`}
//             >
//               {msg.text}
//             </div>

//           </div>

//         ))}

//         {loading && (

//           <Loader2
//             className="animate-spin text-blue-500"
//           />

//         )}

//       </div>

//       {/* Input */}

//       <div className="p-4 border-t border-zinc-800 flex gap-2">

//         <input
//           value={input}
//           onChange={(e) =>
//             setInput(e.target.value)
//           }
//           onKeyDown={(e) =>
//             e.key === "Enter" &&
//             handleSend()
//           }
//           placeholder="Ask anything..."
//           className="
//             flex-1
//             bg-[#090909]
//             border
//             border-zinc-700
//             rounded-xl
//             px-4
//             py-3
//             text-white
//             outline-none
//           "
//         />

//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className="
//             bg-blue-600
//             hover:bg-blue-700
//             px-4
//             rounded-xl
//           "
//         >

//           <Send
//             size={18}
//             className="text-white"
//           />

//         </button>

//       </div>

//     </div>

//   );

// }







import { useState, useRef, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  Loader2,
  Sparkles,
} from "lucide-react";

import { sendMessage } from ".././../services/ChatAI.service";

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

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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
    } catch (err) {
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
    <div className="h-full bg-[#161616] border border-zinc-800 rounded-2xl overflow-hidden flex flex-col shadow-xl">

      {/* HEADER */}

      <div className="border-b border-zinc-800 px-5 py-4">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center">

            <Bot size={22} className="text-white" />

          </div>

          <div>

            <h2 className="font-bold text-lg text-white">
              AI Career Copilot
            </h2>

            <p className="text-sm text-zinc-400">
              Personalized Placement Assistant
            </p>

          </div>

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="border-b border-zinc-800 p-4">

        <div className="flex items-center gap-2 mb-3">

          <Sparkles
            size={18}
            className="text-yellow-400"
          />

          <p className="text-sm font-medium text-zinc-300">
            Quick Actions
          </p>

        </div>

        <div className="flex flex-wrap gap-2">

          {quickQuestions.map((item) => (

            <button
              key={item}
              onClick={() => askAI(item)}
              className="
              px-3
              py-2
              text-xs
              rounded-full
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

      <div className="flex-1 overflow-y-auto p-5 space-y-5">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex gap-3 ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {msg.sender === "ai" && (

              <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">

                <Bot
                  size={18}
                  className="text-white"
                />

              </div>

            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 whitespace-pre-wrap leading-7 ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-[#222] text-zinc-200"
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === "user" && (

              <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center flex-shrink-0">

                <User
                  size={18}
                  className="text-white"
                />

              </div>

            )}

          </div>

        ))}

        {loading && (

          <div className="flex gap-3">

            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">

              <Bot
                size={18}
                className="text-white"
              />

            </div>

            <div className="bg-[#222] rounded-2xl px-5 py-4">

              <Loader2
                className="animate-spin text-blue-400"
                size={20}
              />

            </div>

          </div>

        )}

        <div ref={messagesEndRef} />

      </div>

      {/* INPUT */}

      <div className="border-t border-zinc-800 p-4">

        <div className="flex gap-3">

          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleSend()
            }
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

            <Send
              size={20}
              className="text-white"
            />

          </button>

        </div>

      </div>

    </div>
  );
}