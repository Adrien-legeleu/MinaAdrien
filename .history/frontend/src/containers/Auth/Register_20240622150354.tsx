"use client";

import { ArrowRight } from "@/components/icons";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";

export const Register = () => {
  return (
    <div className="space-y-4">
      <div className="relative w-full min-w-[200px]">
        <input
          type="text"
          placeholder="Username"
          id="username"
          name="username"
          className="border-none rounded-3xl py-4 px-5 bg-gradient-to-b from-[#d8d6e0] to-[#beb9d4] text-gray-500 outline-none"
        />
      </div>
      <div className="relative w-full min-w-[200px]">
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          className="border-none rounded-3xl py-4 px-5 bg-gradient-to-b from-[#d8d6e0] to-[#beb9d4] text-gray-500 outline-none"
        />
      </div>

      <div className="relative  w-full min-w-[200px]">
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            className="border-none rounded-3xl py-4 px-5 bg-gradient-to-b from-[#d8d6e0] to-[#beb9d4] text-gray-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
