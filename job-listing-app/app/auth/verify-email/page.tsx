"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!email) {
      router.push("/signup");
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, email, router]);

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(
          `otp-${index + 1}`
        ) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://akil-backend.onrender.com/verify-email",
        {
          email,
          otp: otpString,
        }
      );

      if (response.data.success) {
        router.push(
          `/auth/login?verified=true&email=${encodeURIComponent(email)}`
        );
      } else {
        setError(response.data.message || "Verification failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during verification"
      );
      toast.error(`Verification error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend || !email) return;

    try {
      setError("");
      setCanResend(false);
      setCountdown(30);
      await axios.post(
        "https://akil-backend.onrender.com/resend-verification",
        { email }
      );
    } catch (err) {
      setError("Failed to resend verification code");
      toast.error(`Resend error: ${err}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify Email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to{" "}
            <span className="font-medium">{email}</span>. Please enter the
            4-digit code below.
          </p>
        </div>

        {error && toast.error(`${error}`)}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                pattern="\d*"
                inputMode="numeric"
                autoFocus={index === 0}
              />
            ))}
          </div>

          <div className="text-center text-sm">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Resend verification code
              </button>
            ) : (
              <p className="text-gray-500">
                Request new code in {countdown} seconds
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          <p>Didn't receive the code? Check your spam folder or</p>
          <button
            onClick={handleResendCode}
            disabled={!canResend}
            className={`mt-1 font-medium ${
              canResend
                ? "text-blue-600 hover:text-blue-500"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            click here to resend
          </button>
        </div>
      </div>
    </div>
  );
}
