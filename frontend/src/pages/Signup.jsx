"use client";

import * as React from "react";
import { useState } from "react";
import {  useAuthStore } from "../store/useAuthStore.js";
const SignUp = () => {
    const { signup } = useAuthStore();
   const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
   const validateForm = () => {
    // if (!formData.name.trim()) return toast.error("Full name is required");
    // if (!formData.email.trim()) return toast.error("Email is required");
    // if(!formData.displayName.trim()) toast.error("display name ");
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };
    const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
console.log("Form Data:", formData);
console.log("Validation Success:", success);
    if (success === true) signup(formData);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#150b2d] px-4 py-16 w-full relative">
      {/* Centered glass card */}
      <div className="relative z-10 w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#282045cc] via-[#1c1534fa] to-[#161120fc] shadow-2xl backdrop-blur-xl border border-[#583bdb22] p-8 flex flex-col items-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 tracking-tight text-[#a991ff] drop-shadow">
          Stay Consistent.
        </h1>
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 leading-tight text-[#f3f0fa]">
          Sign up for <span className="text-[#9f81ff]">CodeTracker</span>
        </h2>

        {/* Form */}
        <div className="flex flex-col w-full gap-5">
          <div className="w-full flex flex-col gap-3">
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              className="w-full px-5 py-3 rounded-xl border border-[#805ad5]/20 bg-white/5 text-white placeholder-white/60 text-base focus:outline-none focus:ring-2 focus:ring-[#a991ff] transition"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
              placeholder="Username"
              type="text"
              value={formData.username}
              className="w-full px-5 py-3 rounded-xl border border-[#805ad5]/20 bg-white/5 text-white placeholder-white/60 text-base focus:outline-none focus:ring-2 focus:ring-[#a991ff] transition"
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
              placeholder="Password"
              type="password"
              value={formData.password}
              className="w-full px-5 py-3 rounded-xl border border-[#805ad5]/20 bg-white/5 text-white placeholder-white/60 text-base focus:outline-none focus:ring-2 focus:ring-[#a991ff] transition"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            
            
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-[#a991ff] via-[#805ad5] to-[#4f389a] text-white font-semibold px-5 py-3 rounded-full shadow-lg hover:from-[#ae99fa] hover:to-[#6246ea] transition mb-1 text-base"
          >
            Sign Up
          </button>
          {/* Google Sign In */}
          {/* <button
            className="w-full flex items-center justify-center gap-2 bg-[#232136] border border-[#805ad5]/20 rounded-full px-5 py-3 font-medium text-white shadow-lg hover:brightness-110 transition text-base"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button> */}
          <div className="w-full text-center mt-3">
            <span className="text-xs text-[#c3b8eb]/80">
              have an account?{" "}
              <a
                href="/signin"
                className="underline text-[#a991ff] hover:text-[#f5e7ff]"
              >
                Sign in instead
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* User count and avatars */}
      <div className="relative z-10 mt-10 flex flex-col items-center text-center">
        <p className="text-[#a991ff] text-base mb-2 font-medium drop-shadow">
          Join <span className="font-extrabold text-white">thousands</span> of
          developers using <span className="text-white">CodeTracker</span>.
        </p>
        <div className="flex -space-x-2">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#22174d] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#22174d] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/men/54.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#22174d] object-cover"
          />
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="user"
            className="w-8 h-8 rounded-full border-2 border-[#22174d] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp ;
