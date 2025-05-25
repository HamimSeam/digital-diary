import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signUp } from "../services/supabaseClient";

function SignupForm({ onSignUp }) {
  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={onSignUp}
      autoComplete="on"
    >
      <h3 className="self-center">Sign up</h3>
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="bg-white flex-1"
        autoComplete="username"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="bg-white flex-1"
        autoComplete="new-password"
        required
      />
      <button type="submit" className="bg-cyan-600 text-white">
        Sign Up
      </button>
    </form>
  );
}

function SignupPage() {
  const navigate = useNavigate();

  async function onSignUp(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signUp(email, password);

    if (result) {
      navigate("/login");
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <main className="flex flex-col gap-3 bg-amber-100 w-1/4 rounded-2xl p-5">
        <SignupForm onSignUp={onSignUp} />
        <div>
          Already have an account?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </div>
      </main>
    </div>
  );
}

export default SignupPage;
