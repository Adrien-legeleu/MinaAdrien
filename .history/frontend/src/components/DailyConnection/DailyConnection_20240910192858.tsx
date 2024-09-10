import { IconEmoji0, IconEmoji1 } from "../icons";

export const DailyConnection = () => {
  return (
    <div className="fixed bottom-0 left-0 w-screen  p-6 rounded-t-3xl bg-white flex flex-col gap-5 items-center justify-center ">
      <h2>Donnez un avis sur votrtre journéé !!</h2>
      <div className="flex gap-5 items-center justify-center">
        <span className="h-8 w-8">
          <IconEmoji0 />
        </span>
        <span>
          <IconEmoji0 />
        </span>
        <span>
          <IconEmoji1 />
        </span>
        <span>
          <IconEmoji0 />
        </span>
        <span>
          <IconEmoji1 />
        </span>
      </div>
    </div>
  );
};
