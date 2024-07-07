import { IconGroup, IconSetting } from "../icons";

export const HeaderParams = () => {
  return (
    <div>
      <div className="h-12 w-12 text-black/80">
        <IconSetting />
      </div>
      <div className="h-12 w-12 text-black/80">
        <IconGroup />
      </div>
    </div>
  );
};
