"use client";

import { Input } from "@/components/UI";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { Label } from "@radix-ui/react-label";

export const Auth = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center">
        <h1 className="text-3xl">
          Connectez-vous et découvrez Lovna maintenant !
        </h1>
        <div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Mina" type="text" />
          </div>
          <div>
            <Label htmlFor="username">Password</Label>
            <Input id="password" placeholder="Password" type="password" />
          </div>
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
