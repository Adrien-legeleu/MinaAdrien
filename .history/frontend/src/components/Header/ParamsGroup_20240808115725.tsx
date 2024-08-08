import { useGroupContext } from "@/context/GroupContexts";

export const ParamsGroup = () => {
  const { group } = useGroupContext();
  return (
    <div>
      {group?.profilPhoto ? (
        <div className="w-1/2 rounded-full border-[1px] border-black/50">
          <img src={group.profilPhoto} alt={group.groupname} />
        </div>
      ) : (
        <div></div>
      )}
      <h1>{group?.groupname}</h1>
    </div>
  );
};
