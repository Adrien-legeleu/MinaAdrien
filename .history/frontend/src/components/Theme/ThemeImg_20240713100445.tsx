interface IThemeImg {
  url: string;
}

export const ThemeImg: React.FC<IThemeImg> = ({ url }) => {
  return (
    <div className="z-40 bg-black/30 fixed top-0 left-0 w-screen h-screen p-32 flex- items-center justify-center">
      <div className="w-full rounded-3xl h-full object-contain">
        <img src={url} alt="img theme" />
      </div>
    </div>
  );
};
