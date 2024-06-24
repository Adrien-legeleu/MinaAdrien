import { Auth } from "@/containers/Auth";
import { useUserContext } from "@/context/UserContexts";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, []);

  return (
    <main>
      <Auth />
    </main>
  );
}
