import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";

interface IFileUploadProps {
  handleImageUpload: (imgUrlKey: string, fileList: UploadFile[]) => void;
  imgUrlKey: string;
  initialImage?: string[];
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const FileProfilPhotos: React.FC<IFileUploadProps> = ({
  handleImageUpload,
  imgUrlKey,
  initialImage = [],
}) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const initialFileList: UploadFile[] = initialImage.map((url, index) => ({
      uid: `-1-${index}`,
      name: `image${index}`,
      status: "done" as UploadFile["status"],
      url,
    }));
    setFileList(initialFileList);
  }, [initialImage]);

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedFileListPromises = newFileList.map(async (file) => {
      if (!file.url && file.originFileObj) {
        file.url = await getBase64(file.originFileObj);
      }
      return file;
    });

    Promise.all(updatedFileListPromises).then((finalFileList) => {
      setFileList(finalFileList);
      handleImageUpload(imgUrlKey, finalFileList);
    });
  };

  const handleRemove = (file: UploadFile) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
    handleImageUpload(imgUrlKey, newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        onRemove={handleRemove}
        maxCount={1}
      >
        {fileList.length > 7 ? null : uploadButton}
      </Upload>
    </div>
  );
};
