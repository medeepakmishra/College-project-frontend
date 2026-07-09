import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../services/auth.service";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ForgotPassword() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [devOtp, setDevOtp] = useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const sendOTP = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await forgotPassword({
        email: form.email,
      });

      toast.success(res.data.message);

      if (res.data.otp) {
        setDevOtp(res.data.otp);
      }

      setStep(2);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }

  };

  const handleReset = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await resetPassword({
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });

      toast.success(res.data.message);

      navigate("/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Reset Password Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#090909] flex justify-center items-center">

      <div className="bg-[#151515] w-full max-w-lg p-10 rounded-2xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-white">

          Forgot Password

        </h1>

        <p className="text-zinc-400 mt-2">

          Recover your account using OTP

        </p>

        {step === 1 && (

          <form
            onSubmit={sendOTP}
            className="mt-8 space-y-5"
          >

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#222] border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 rounded-xl py-3 text-white font-semibold"
            >

              {loading ? (

                <Loader2
                  className="animate-spin mx-auto"
                />

              ) : (

                "Send OTP"

              )}

            </button>

          </form>

        )}

        {step === 2 && (

          <form
            onSubmit={handleReset}
            className="mt-8 space-y-5"
          >

            {devOtp && (

              <div className="bg-yellow-500/20 border border-yellow-600 rounded-xl p-4">

                <p className="text-yellow-300">

                  Development OTP

                </p>

                <h2 className="text-3xl font-bold text-white mt-2">

                  {devOtp}

                </h2>

              </div>

            )}

            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full bg-[#222] border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full bg-[#222] border border-zinc-700 rounded-xl px-4 py-3 text-white"
            />

            <button
              disabled={loading}
              className="w-full bg-green-600 rounded-xl py-3 text-white font-semibold"
            >

              {loading ? (

                <Loader2
                  className="animate-spin mx-auto"
                />

              ) : (

                "Reset Password"

              )}

            </button>

          </form>

        )}

      </div>

    </div>

  );

}