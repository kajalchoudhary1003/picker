"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "team member">("team member");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) => {
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password must be at least 6 characters long and include both letters and numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include both letters and numbers"
      );
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/register", {
        email,
        password,
        role,
      });
      localStorage.setItem("token", data.token);
      router.push("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="register-container absolute z-50 inset-0 flex items-center justify-center min-h-screen">
        <div className="register-form w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-400 ">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>
            <div>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "admin" | "team member")
                }
                className="w-full p-3 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
              >
                <option value="team member">Team Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex flex-row justify-center">
              <button
                type="submit"
                className="w-52 py-3 bg-gradient-to-l from-purple-700 to-pink-400 font-semibold text-white rounded-full hover:scale-110"
              >
                Register
              </button>
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
          <div className="login-link-container text-center mt-4">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
}
