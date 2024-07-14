import { useUserContext } from "@/context/UserContexts";
import { IconLogout } from "../icons";

export const Logout = () => {
  const { onLogout } = useUserContext();
  return (
    <div className="cursor-pointer" onClick={onLogout}>
      <IconLogout />
    </div>
  );
};
