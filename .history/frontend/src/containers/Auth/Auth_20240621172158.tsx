"use client";

import { Input } from "@/components/UI";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";

export const Auth = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="absolute inset-0 z-50 flex gap-16  flex-col items-center justify-end pb-12 text-white">
        <h1 className="text-4xl font-semibold bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
          Connectez-vous et découvrez Lovna maintenant !
        </h1>
        <div className="space-y-8">
          <div className="space-y-4">
            <Input id="username" placeholder="Username" type="text" />

            <Input id="password" placeholder="Password" type="password" />
          </div>

          <div className="flex items-center justify-center">
            <button className="text-center py-4 px-8 rounded-full bg-gradient-to-b from-white/80 to-white/20">
              Login
            </button>
          </div>
        </div>
        <div>
          <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Ps encore de compte ? Créez en un dès maintenant !
          </p>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};
