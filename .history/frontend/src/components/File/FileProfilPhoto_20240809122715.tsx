import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";

interface IFileUploadProps {
  handleImageUpload: (imgUrlKey: string, fileList: UploadFile[]) => void;
  imgUrlKey: string;
  initialImages?: string[];
  multipleImage: boolean;
}

const getBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const FileImages: React.FC<IFileUploadProps> = ({
  handleImageUpload,
  imgUrlKey,
  initialImages = [],
  multipleImage,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    const initialFileList: UploadFile[] = initialImages.map((url, index) => ({
      uid: `-1-${index}`,
      name: `image${index}`,
      status: "done" as UploadFile["status"],
      url,
    }));
    setFileList(initialFileList);
  }, [initialImages]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as File);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const updatedFileList = newFileList.map((file) => {
      if (!file.url && file.originFileObj) {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onloadend = () => {
          file.url = reader.result as string;
          handleImageUpload(imgUrlKey, newFileList);
        };
      }
      return file;
    });
    setFileList(updatedFileList);
    handleImageUpload(imgUrlKey, updatedFileList);
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
    <>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        onChange={handleChange}
      >
        {previewImage ? (
          <img src={previewImage} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
