import { AuthGroup } from "@/containers/AuthGroup";
import React from "react";

export default function page() {
  const router = useRouter();
  const { isHome } = useGroupContext();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/group");
    }
  }, [isAuthenticated]);
  return (
    <main>
      <AuthGroup />;
    </main>
  );
}
