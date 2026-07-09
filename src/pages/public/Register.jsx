import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  MailCheck,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";

import { registerUser, verifyOTP } from "../../services/auth.service";

export default function Register() {
  const navigate = useNavigate();

  // false = registration form
  // true = OTP verification form

  const [otpStep, setOtpStep] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);

  const [formData, setFormData] = useState({
    name: "",

    email: "",

    number: "",

    password: "",
  });

  const [otp, setOtp] = useState("");

  // Temporary OTP returned from backend
  // Only useful while email service is unavailable

  const [developmentOtp, setDevelopmentOtp] = useState(null);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setTimeout(() => {
      setResendTimer((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  // ==========================================
  // REGISTER USER
  // ==========================================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.number.length !== 10) {
      toast.error("Mobile number must contain 10 digits");

      return;
    }

    try {
      setLoading(true);

      const response = await registerUser(formData);

      /*
        Your temporary backend currently returns:

        {
          success: true,
          message: "...",
          email: "...",
          otp: "123456"
        }
      */

      if (response.data.otp) {
        setDevelopmentOtp(response.data.otp);
      }

      setOtpStep(true);
      setResendTimer(40);

      toast.success(response.data.message || "OTP generated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration request failed",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY OTP
  // ==========================================

  // const handleVerifyOtp = async (e) => {

  //   e.preventDefault();

  //   if (otp.length !== 6) {

  //     toast.error(
  //       "Please enter a valid 6 digit OTP"
  //     );

  //     return;

  //   }

  //   try {

  //     setLoading(true);

  //     const response = await verifyOTP({

  //       email: formData.email,

  //       otp: otp,

  //     });

  //     toast.success(
  //       response.data.message ||
  //       "Account created successfully"
  //     );

  //     navigate("/login");

  //   } catch (error) {

  //     toast.error(

  //       error.response?.data?.message ||

  //       "OTP verification failed"

  //     );

  //   } finally {

  //     setLoading(false);

  //   }

  // };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6 digit OTP");

      return;
    }

    try {
      setLoading(true);

      const response = await verifyOTP({
        email: formData.email,

        otp: otp,
      });

      // Get token and user from backend response

      const { token, user } = response.data;

      // Store authentication data

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      toast.success(response.data.message || "Account created successfully");

      // Direct login after registration

      navigate("/student/dashboard", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SEND OTP AGAIN
  // ==========================================

  // const handleResendOtp = async () => {
  //   try {
  //     setLoading(true);

  //     const response = await registerUser(formData);

  //     useEffect(() => {
  //       if (resendTimer <= 0) {
  //         return;
  //       }

  //       const timer = setInterval(() => {
  //         setResendTimer((previous) => {
  //           if (previous <= 1) {
  //             clearInterval(timer);

  //             return 0;
  //           }

  //           return previous - 1;
  //         });
  //       }, 1000);

  //       return () => clearInterval(timer);
  //     }, [resendTimer]);

  //     if (response.data.otp) {
  //       setDevelopmentOtp(response.data.otp);
  //     }

  //     setOtp("");

  //     toast.success("New OTP generated successfully");
  //   } catch (error) {
  //     toast.error(
  //       error.response?.data?.message || "Unable to generate new OTP",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleResendOtp = async () => {
  if (resendTimer > 0) {
    return;
  }

  try {
    setLoading(true);

    const response = await registerUser(formData);

    if (response.data.otp) {
      setDevelopmentOtp(response.data.otp);
    }

    setOtp("");

    // Restart countdown from 40 seconds
    setResendTimer(40);

    toast.success(
      response.data.message ||
      "New OTP generated successfully"
    );
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Unable to generate new OTP"
    );
  } finally {
    setLoading(false);
  }
};

  // ==========================================
  // CHANGE EMAIL / GO BACK
  // ==========================================

  // const handleBackToRegister = () => {
  //   setOtpStep(false);

  //   setOtp("");

  //   setDevelopmentOtp(null);
  // };
  const handleBackToRegister = () => {
  setOtpStep(false);
  setOtp("");
  setDevelopmentOtp(null);
  setResendTimer(0);
};

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#090909]
        text-white
      "
    >
      {/* ======================================
          GRID BACKGROUND
      ====================================== */}

      <div
        className="
          absolute
          inset-0
          opacity-30
        "
        style={{
          backgroundImage: `

            linear-gradient(
              rgba(255,255,255,0.06) 1px,
              transparent 1px
            ),

            linear-gradient(
              90deg,
              rgba(255,255,255,0.06) 1px,
              transparent 1px
            )

          `,

          backgroundSize: "40px 40px",
        }}
      />

      {/* Blue Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[600px]
          w-[600px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-blue-600/15
          blur-[160px]
        "
      />

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
        "
      >
        {/* ======================================
            LEFT SIDE
        ====================================== */}

        <section
          className="
            hidden
            w-1/2
            flex-col
            justify-between
            p-12
            lg:flex
          "
        >
          <Link
            to="/"
            className="
              flex
              w-fit
              items-center
              gap-2
              text-gray-400
              transition
              hover:text-white
            "
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <div className="max-w-xl">
            <p
              className="
                mb-4
                text-sm
                font-medium
                uppercase
                tracking-[5px]
                text-blue-500
              "
            >
              RMLAU Placement Portal
            </p>

            <h1
              className="
                text-6xl
                font-bold
                leading-[1.1]
              "
            >
              One account.
              <span
                className="
                  block
                  text-blue-500
                "
              >
                Every opportunity.
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-lg
                text-lg
                leading-8
                text-gray-400
              "
            >
              Create your student account, complete your academic profile,
              discover eligible placement drives and stay connected with campus
              recruitment opportunities.
            </p>

            <div className="mt-10 space-y-4">
              {[
                "Discover eligible placement drives",
                "Explore recruiting companies",
                "Track your placement applications",
                "Receive important announcements",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-300
                  "
                >
                  <CheckCircle2 size={20} className="text-blue-500" />

                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600">
            Dr. Ram Manohar Lohia Avadh University
          </p>
        </section>

        {/* ======================================
            RIGHT SIDE
        ====================================== */}

        <section
          className="
            flex
            w-full
            items-center
            justify-center
            px-5
            py-10
            lg:w-1/2
          "
        >
          <div
            className="
              w-full
              max-w-lg
              rounded-3xl
              border
              border-white/10
              bg-[#111111]/80
              p-7
              shadow-2xl
              backdrop-blur-xl
              sm:p-10
            "
          >
            {/* ==================================
                STEP INDICATOR
            ================================== */}

            <div
              className="
                mb-8
                flex
                items-center
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    text-sm
                    font-semibold
                  "
                >
                  1
                </div>

                <span
                  className="
                    hidden
                    text-sm
                    text-gray-300
                    sm:block
                  "
                >
                  Details
                </span>
              </div>

              <div
                className={`
                  mx-4
                  h-px
                  flex-1
                  transition

                  ${otpStep ? "bg-blue-500" : "bg-white/10"}
                `}
              />

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <div
                  className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-semibold
                    transition

                    ${
                      otpStep
                        ? "bg-blue-600 text-white"
                        : "bg-white/10 text-gray-500"
                    }
                  `}
                >
                  2
                </div>

                <span
                  className={`
                    hidden
                    text-sm
                    sm:block

                    ${otpStep ? "text-gray-300" : "text-gray-600"}
                  `}
                >
                  Verify OTP
                </span>
              </div>
            </div>

            {/* ==================================
                REGISTER FORM
            ================================== */}

            {!otpStep && (
              <>
                <div className="mb-8">
                  <p
                    className="
                      mb-2
                      text-sm
                      font-medium
                      uppercase
                      tracking-wider
                      text-blue-500
                    "
                  >
                    Student Registration
                  </p>

                  <h2
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    Create your account
                  </h2>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-400
                    "
                  >
                    Enter your details to begin email verification.
                  </p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="
                        mb-2
                        block
                        text-sm
                        text-gray-300
                      "
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-3.5
                        outline-none
                        transition
                        placeholder:text-gray-600
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                      "
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        mb-2
                        block
                        text-sm
                        text-gray-300
                      "
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-3.5
                        outline-none
                        transition
                        placeholder:text-gray-600
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                      "
                    />
                  </div>

                  {/* Mobile */}

                  <div>
                    <label
                      htmlFor="number"
                      className="
                        mb-2
                        block
                        text-sm
                        text-gray-300
                      "
                    >
                      Mobile number
                    </label>

                    <input
                      id="number"
                      name="number"
                      type="tel"
                      maxLength={10}
                      value={formData.number}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");

                        setFormData((previous) => ({
                          ...previous,

                          number: value,
                        }));
                      }}
                      placeholder="9876543210"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-3.5
                        outline-none
                        transition
                        placeholder:text-gray-600
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                      "
                    />
                  </div>

                  {/* Password */}

                  <div>
                    <label
                      htmlFor="password"
                      className="
                        mb-2
                        block
                        text-sm
                        text-gray-300
                      "
                    >
                      Password
                    </label>

                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Minimum 8 characters"
                        required
                        className="
                          w-full
                          rounded-xl
                          border
                          border-white/10
                          bg-white/5
                          px-4
                          py-3.5
                          pr-12
                          outline-none
                          transition
                          placeholder:text-gray-600
                          focus:border-blue-500
                          focus:ring-2
                          focus:ring-blue-500/20
                        "
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="
                          absolute
                          right-4
                          top-1/2
                          -translate-y-1/2
                          cursor-pointer
                          text-gray-500
                          transition
                          hover:text-white
                        "
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>
                    </div>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-gray-600
                      "
                    >
                      Use uppercase, lowercase, special character and minimum 8
                      characters.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      py-3.5
                      font-semibold
                      transition
                      hover:bg-blue-700
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2 size={19} className="animate-spin" />
                        Generating OTP...
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight size={19} />
                      </>
                    )}
                  </button>
                </form>

                <p
                  className="
                    mt-7
                    text-center
                    text-sm
                    text-gray-500
                  "
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="
                      font-medium
                      text-blue-500
                      hover:text-blue-400
                    "
                  >
                    Sign in
                  </Link>
                </p>
              </>
            )}

            {/* ==================================
                OTP VERIFICATION
            ================================== */}

            {otpStep && (
              <>
                <div className="text-center">
                  <div
                    className="
                      mx-auto
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-blue-500/20
                      bg-blue-500/10
                    "
                  >
                    <MailCheck size={30} className="text-blue-500" />
                  </div>

                  <h2
                    className="
                      mt-6
                      text-3xl
                      font-bold
                    "
                  >
                    Verify your email
                  </h2>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-6
                      text-gray-400
                    "
                  >
                    Enter the 6 digit verification code generated for
                  </p>

                  <p
                    className="
                      mt-1
                      font-medium
                      text-white
                    "
                  >
                    {formData.email}
                  </p>
                </div>

                {/* TEMP DEVELOPMENT OTP */}

                {developmentOtp && (
                  <div
                    className="
                      mt-6
                      rounded-xl
                      border
                      border-amber-500/20
                      bg-amber-500/10
                      p-4
                      text-center
                    "
                  >
                    <p
                      className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-amber-500
                      "
                    >
                      Temporary Development OTP
                    </p>

                    <p
                      className="
                        mt-2
                        text-2xl
                        font-bold
                        tracking-[8px]
                      "
                    >
                      {developmentOtp}
                    </p>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-gray-500
                      "
                    >
                      Remove this display after email delivery is enabled.
                    </p>
                  </div>
                )}

                <form
                  onSubmit={handleVerifyOtp}
                  className="
                    mt-7
                    space-y-6
                  "
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="
                        mb-2
                        block
                        text-sm
                        text-gray-300
                      "
                    >
                      Verification code
                    </label>

                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");

                        setOtp(value);
                      }}
                      placeholder="000000"
                      required
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-4
                        text-center
                        text-2xl
                        font-semibold
                        tracking-[12px]
                        outline-none
                        transition
                        placeholder:text-gray-700
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                      "
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-blue-600
                      py-3.5
                      font-semibold
                      transition
                      hover:bg-blue-700
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {loading ? (
                      <>
                        <Loader2 size={19} className="animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify & Create Account"
                    )}
                  </button>
                </form>

                <div
                  className="
                    mt-6
                    flex
                    flex-col
                    items-center
                    justify-between
                    gap-4
                    sm:flex-row
                  "
                >
                  <button
                    type="button"
                    onClick={handleBackToRegister}
                    disabled={loading}
                    className="
                      cursor-pointer
                      text-sm
                      text-gray-500
                      transition
                      hover:text-white
                    "
                  >
                    Change email
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading || resendTimer > 0}
                    className="   flex  cursor-pointer items-center gap-2 text-sm text-blue-500 transition hover:text-blue-400 disabled:cursor-not-allowed disabled:text-gray-600 disabled:opacity-70"
                  >
                    <RotateCcw size={15} />

                    {resendTimer > 0
                      ? `Resend OTP in ${resendTimer}s`
                      : "Resend OTP"}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
