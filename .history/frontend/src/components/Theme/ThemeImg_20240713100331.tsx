interface IThemeImg {
  url: string;
}

export const ThemeImg = ({ url }) => {
  return (
    <div className="z-40 bg-black/30 fixed top-0 left-0 w-screen h-screen flex- items-center justify-center">
      <div>
        <img src={url} alt="img theme" />
      </div>
    </div>
  );
};
