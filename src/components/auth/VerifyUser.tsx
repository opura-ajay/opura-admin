"use client";
import { apiFetch } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyUser() {
  const searchParams = useSearchParams();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = searchParams.get("token");
    if (t) setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setStatus("idle");

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage("❌ New passwords do not match.");
      return;
    }

    try {
      const res = await apiFetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, token }),
      });

      if (!res.ok) throw new Error("Verification failed");
      setStatus("success");
      setMessage("✅ Account verified and activated successfully!");
      setOldPassword("");
      setpassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setStatus("error");
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0d1117] via-[#1b2330] to-[#121826] text-white px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl p-12 md:p-16 w-full max-w-6xl border border-white/10 transition-all duration-300">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-[#0071e3] to-[#6e56ff] bg-clip-text text-transparent mb-3">
            Welcome 👋
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
            Your account is almost ready to go. Please verify your credentials
            and set a new secure password to activate your account.
          </p>
          <p className="text-gray-400 text-base">
            Once verified, your account will be activated instantly and you’ll
            gain full access to your personalized dashboard.
          </p>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-lg"
        >
          <div className="mb-5">
            <label
              htmlFor="oldPassword"
              className="block font-medium mb-2 text-gray-200"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your current password"
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:border-[#0071e3] text-white placeholder-gray-400"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block font-medium mb-2 text-gray-200"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Create a new password"
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:border-[#0071e3] text-white placeholder-gray-400"
            />
            <p className="text-sm text-gray-400 mt-2">
              Tip: Use 8+ characters with upper & lowercase letters, a number,
              and a symbol.
            </p>
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block font-medium mb-2 text-gray-200"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              required
              className="w-full p-3 rounded-lg bg-white/5 border border-white/20 focus:outline-none focus:border-[#0071e3] text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-[#0071e3] to-[#6e56ff] hover:shadow-[0_8px_30px_rgba(0,113,227,0.5)] transition-all font-medium"
          >
            Verify & Activate Account
          </button>

          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                status === "success" ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      <p className="text-gray-500 text-sm mt-10">
        Need help? Contact Support anytime — we’re here to assist you 24×7.
      </p>
    </div>
  );
}
