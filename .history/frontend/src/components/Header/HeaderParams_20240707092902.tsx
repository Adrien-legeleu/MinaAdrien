import { IconGroup, IconSetting } from "../icons";

export const HeaderParams = () => {
  return (
    <div className="flex items-center justify-end gap-10 py-5 px-12">
      <div className="h-10 w-10 text-black/80">
        <IconSetting />
      </div>
      <div className="h-10 w-10 text-black/80">
        <IconGroup />
      </div>
    </div>
  );
};
