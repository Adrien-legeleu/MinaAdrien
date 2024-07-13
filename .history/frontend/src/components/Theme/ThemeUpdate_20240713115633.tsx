import { IImage } from "@/context/ImageContexts";
import { Input } from "../UI";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";

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
      <TextArea
        showCount
        maxLength={100}
        name="legend"
        placeholder="Votre légende"
        style={{ height: 120, resize: "none" }}
      />

      <DatePicker
        defaultValue={dayjs("13/07/2024", dateFormatList[0])}
        format={dateFormatList}
      />
    </div>
  );
};
