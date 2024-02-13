"use client";
import React, { useState } from "react";

import { signIn } from "next-auth/react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/",
      });
    } catch (error) {}
  };

  return (
    <div className="p-8 mx-auto bg-white shadow-md rounded-lg border-2">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      <form>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
