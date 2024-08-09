import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";

interface IFileUploadProps {
  handleImageUpload: (imgUrlKey: string, fileList: UploadFile[]) => void;
  imgUrlKey: string;
  initialImages?: string[];
  multipleImage: boolean;
  submitNewProfilGroup: (e) => void;
}

 const { group, updateGroup } = useGroupContext();

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
  submitNewProfilGroup,
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
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={() => {
          handleChange();
          submitNewProfilGroup();
        }}
        onRemove={handleRemove}
        maxCount={multipleImage ? 8 : 1}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};
