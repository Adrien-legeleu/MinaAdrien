"use client";

import { ArrowRight } from "@/components/icons";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";

export const Login = () => {
  return (
    <div className="space-y-12">
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
      <div className="flex items-center justify-center">
        <div
          className={cn(
            "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
          )}
        >
          <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span className=" flex flex-row-reverse items-center justify-center gap-4">
              {" "}
              <ArrowRight /> <span>Register</span>
            </span>
          </AnimatedShinyText>
        </div>
      </div>
    </div>
  );
};
