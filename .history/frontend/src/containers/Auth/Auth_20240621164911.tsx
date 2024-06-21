"use client";

import { Input } from "@/components/UI";
import { BackgroundGradientAnimation } from "@/components/UI/GradientBackground";
import { Label } from "@radix-ui/react-label";

export const Auth = () => {
  return (
    <div className="h-screen w-screen">
      <BackgroundGradientAnimation>
        <div className="flex flex-col h-screen  items-center justify-center">
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
    </div>
  );
};
