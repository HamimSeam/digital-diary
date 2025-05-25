import React, { useState } from "react";
import { useNavigate } from "react-router";

function LoginForm() {
  return (
    <form className="flex flex-col gap-3 w-full">
      <h3 className="self-center">Login</h3>
      <input type="text" placeholder="Email" className="bg-white flex-1" />
      <input
        type="password"
        placeholder="Password"
        className="bg-white flex-1"
      />
      <button className="bg-cyan-600 text-white">Login</button>
    </form>
  );
}

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <main className="flex flex-col gap-3 bg-amber-100 w-1/4 rounded-2xl p-5">
        <LoginForm />
        <div>
          Don't have an account?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up now
          </span>{" "}
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
