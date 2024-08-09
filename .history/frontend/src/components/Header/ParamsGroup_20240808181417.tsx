import { useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";

export const ParamsGroup = () => {
  const { group } = useGroupContext();
  return (
    <div>
      {group?.profilPhoto ? (
        <div className="w-1/2 rounded-full border-[1px] border-black/50">
          <img src={group.profilPhoto} alt={group.groupname} />
        </div>
      ) : (
        <div className="w-1/2 rounded-full border-[1px] border-black/50">
          <IconGroup />
        </div>
      )}
      <h1>{group?.groupname}</h1>
    </div>
  );
};
