import React, { useState } from "react";
import { useNavigate } from "react-router";

function SignupForm() {
  return (
    <form className="flex flex-col gap-3 w-full">
      <h3 className="self-center">Sign up</h3>
      <input type="text" placeholder="Email" className="bg-white flex-1" />
      <input
        type="password"
        placeholder="Password"
        className="bg-white flex-1"
      />
      <button className="bg-cyan-600 text-white">Sign Up</button>
    </form>
  );
}

function SignupPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <main className="flex flex-col gap-3 bg-amber-100 w-1/4 rounded-2xl p-5">
        <SignupForm navigate={navigate} />
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
