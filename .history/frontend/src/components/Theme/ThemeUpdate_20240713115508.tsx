import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";
import { DatePicker } from "antd";
import dayjs from "dayjs";

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
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  return (
    <div>
      <Input name="legend" id="legend" placeholder="Votre légende" />

      <DatePicker
        defaultValue={dayjs("13/07/2024", dateFormatList[0])}
        format={dateFormatList}
      />
    </div>
  );
};
