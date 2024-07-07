import { IconGroup, IconSetting } from "../icons";

export const HeaderParams = () => {
  return (
    <div>
      <div className="h-12 w-12 text-black/50">
        <IconSetting />
      </div>
      <div className="h-12 w-12 text-black/50">
        <IconGroup />
      </div>
    </div>
  );
};
