"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <BackgroundGradientAnimation>
    <div className="login-container absolute z-50 inset-0 flex items-center justify-center min-h-screen ">
      <div className="login-form w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 bg-clip-text bg-gradient-to-r from-purple-700 to-pink-400 text-transparent ">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
              required
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700 focus:border-purple-700"
              required
            />
          </div>
          <div className='flex flex-row justify-center'>
          <button
            type="submit"
            className="login-btn w-52 py-3 bg-gradient-to-l from-purple-700 to-pink-400 font-semibold text-white rounded-full hover:scale-110"
          >
            Login
          </button>
          </div>
        
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <div className="login-link-container text-center mt-6">
          <p className="text-gray-600">
            New user?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Create an Account
            </a>
          </p>
        </div>
      </div>
    </div>
    </BackgroundGradientAnimation>
  );
}
