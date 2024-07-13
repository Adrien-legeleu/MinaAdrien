interface IThemeImg{
    url:string
}

export const ThemeImg = ({url}) => {
  return <div>
    <div>
        <img src={url} alt=img theme"" />
    </div>
  </div>;
};
