import React, { useState } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/supabaseClient";

function LoginForm({ onLogin }) {
  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={onLogin}
      autoComplete="on"
    >
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
        autoComplete="current-password"
        required
      />
      <button className="bg-cyan-600 text-white">Login</button>
    </form>
  );
}

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function onLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn(email, password);

    if (!result || result.error) {
      setErrorMessage(result?.error?.message || "Login failed.");
      return;
    }

    setErrorMessage("");
    navigate("/");
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <main className="flex flex-col gap-3 bg-amber-100 w-1/4 rounded-2xl p-5">
        <h3 className="self-center">Login</h3>
        <div className="self-center min-h-[1rem]">
          {errorMessage ? (
            <p className="text-red-600">{errorMessage}</p>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>

        <LoginForm onLogin={onLogin} />
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
