import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";

interface IThemeUpdate {
  isThemeUpdateOpen: boolean;
  themeUpdateClose: () => void;
  data: IImage | null;
}

export const ThemeUpdate: React.FC<IThemeUpdate> = ({
  isThemeUpdateOpen,
  themeUpdateClose,
  data,
}) => {
  return (
    <div>
      <Input name="legend" id="legend" placeholder="Votre légende" />
    </div>
  );
};
