import { useState } from "react";

const useFileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // @ts-ignore
      setSelectedFiles(files);
    }
  };

  return { selectedFiles, handleFileChange };
};

export default useFileUpload;
