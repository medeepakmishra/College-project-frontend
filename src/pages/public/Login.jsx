import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);
      const user = response.data.user;

      toast.success("Login successful");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090909] text-white">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[150px]" />

      <div className="relative z-10 flex min-h-screen">

        {/* Left Section */}
        <section className="hidden w-1/2 flex-col justify-between p-12 lg:flex">

          <Link
            to="/"
            className="flex w-fit items-center gap-2 text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[5px] text-blue-500">
              RMLAU Placement Portal
            </p>

            <h1 className="text-6xl font-bold leading-[1.1]">
              Your career journey
              <span className="block text-blue-500">
                starts here.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-gray-400">
              Access placement drives, explore recruiting companies,
              manage your student profile and stay updated with the
              latest placement announcements.
            </p>
          </div>

          <p className="text-sm text-gray-600">
            Dr. Ram Manohar Lohia Avadh University
          </p>
        </section>

        {/* Right Section */}
        <section className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111]/80 p-7 shadow-2xl backdrop-blur-xl sm:p-10">

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-blue-500">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter your registered email and password to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm text-gray-300"
                >
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm text-gray-300"
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-500 transition hover:text-blue-400"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 pr-12 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-gray-600">
                NEW STUDENT?
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <Link
              to="/register"
              className="block w-full rounded-xl border border-white/10 py-3.5 text-center font-medium text-gray-300 transition hover:border-blue-500/50 hover:bg-blue-500/5 hover:text-white"
            >
              Create student account
            </Link>

          </div>
        </section>
      </div>
    </main>
  );
}