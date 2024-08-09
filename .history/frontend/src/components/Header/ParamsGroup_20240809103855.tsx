import { useGroupContext } from "@/context/GroupContexts";
import { IconGroup } from "../icons";

export const ParamsGroup = () => {
  const { group } = useGroupContext();
  return (
    <div>
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
      <ul className="w-full h-full space-y-2">
        {group?.members.map((member) => {
          return (
            <li
              key={member.userId}
              className="rounded-full py-1 px-4 bg-gray-100 border-black/30 border-[1px]"
            >
              <h3 className="tracking-wider">{member.pseudoUser}</h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
