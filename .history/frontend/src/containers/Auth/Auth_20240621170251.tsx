"use client";

import { Input } from "@/components/UI";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";

export const Auth = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-semibold">
          Connectez-vous et découvrez Lovna maintenant !
        </h1>
        <div className="space-y-8">
          <div className="space-y-4">
            <Input id="username" placeholder="Username" type="text" />

            <Input id="password" placeholder="Password" type="password" />
          </div>

          <div>
            <button>Login</button>
          </div>
        </div>
        <div>
            <p>Ps encore de compte ? Créez en un dès maintenant !</p>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );

  //    <BackgroundGradientAnimation>
  //      <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
  //        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
  //          Gradients X Animations
  //        </p>
  //      </div>
  //    </BackgroundGradientAnimation>;
};
