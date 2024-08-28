"use client";

import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { useUserContext } from "@/context/UserContexts";
import { useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";
import AnimatedShinyText from "@/components/UI/ShinyText";
import { cn } from "@/utils/cn";
import { ArrowRight } from "@/components/icons";

export const Auth = () => {
  const { isAuthenticated } = useUserContext();
  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const data = new FormData(e.currenTarget);
    const values = {
      email: data.get("email"),
      username: data.get("username"),
      password: data.get("password"),
    };
  };

  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col items-center justify-center text-white">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Découvrez Lovna maintenant !
        </h1>
        <form className="space-y-12" onSubmit={onSubmit}>
          {isLogin ? <Login /> : <Register />}

          <div className="flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full p-1 border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className=" text-xl  px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <button
                  className=" flex flex-row-reverse items-center justify-center gap-4"
                  type="submit"
                >
                  {" "}
                  <ArrowRight /> <span>Login</span>
                </button>
              </AnimatedShinyText>
            </div>
          </div>
        </form>

        <p
          className="absolute right-5 bottom-5  bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20"
          onClick={handleIsLogin}
        >
          ✨ Pas encore de compte ? Créez en un dès maintenant !
        </p>
      </div>
    </BackgroundGradientAnimation>
  );
};
