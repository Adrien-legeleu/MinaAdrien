import { IconGroup, IconSetting } from "../icons";

export const HeaderParams = () => {
  return (
    <div className="flex items-center justify-end gap-12">
      <div className="h-12 w-12 text-black/80">
        <IconSetting />
      </div>
      <div className="h-12 w-12 text-black/80">
        <IconGroup />
      </div>
    </div>
  );
};
