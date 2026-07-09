import { Plus } from "lucide-react";

export default function AdminHeader({
  title,
  subtitle,
  buttonText,
  onClick,
}) {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h1 className="text-4xl font-bold text-white">

          {title}

        </h1>

        <p className="text-zinc-500 mt-2">

          {subtitle}

        </p>

      </div>

      {buttonText && (
        <button
          onClick={onClick}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl flex items-center gap-2 text-white"
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
}