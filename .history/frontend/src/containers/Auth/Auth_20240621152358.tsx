import { Input } from "@/components/UI";
import { Label } from "@radix-ui/react-label";

export const Auth = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <h1>Connectez-vous et découvrez Lovna maintenant !</h1>
      <div>
        <div>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Mina" type="text" />
        </div>
      </div>
    </div>
  );
};
