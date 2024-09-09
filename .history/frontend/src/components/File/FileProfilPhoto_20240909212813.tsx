import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadProps } from "antd";
import { IconPlus } from "../icons";

type FileType = Parameters<NonNullable<UploadProps["beforeUpload"]>>[0];

interface FileProps {
  imageUrl: string | undefined;
  setImageUrl: (url: string) => void;
}

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const FileProfilPhoto: React.FC<FileProps> = ({
  imageUrl,
  setImageUrl,
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>change</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-circle"
      className="avatar-uploader w-12 h-12"
      showUploadList={false}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};
