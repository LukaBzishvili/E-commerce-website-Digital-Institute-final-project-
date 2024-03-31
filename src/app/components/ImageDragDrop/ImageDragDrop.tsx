import React, { ChangeEvent, DragEvent, useState } from "react";

const ImageDragDrop = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [base64Image, setBase64Image] = useState<string | undefined>(undefined);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    displayPreview(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    displayPreview(file);
  };

  const displayPreview = (file: File | undefined) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
      };
    }
  };

  return (
    <div
      className={`w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6 ${
        isDragOver ? "border-indigo-600" : ""
      }`}
      id="dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 z-50"
        onChange={handleFileChange}
        id="file-upload"
        name="file-upload"
      />
      <div className="text-center">
        <img
          className="mx-auto h-12 w-12"
          src="https://www.svgrepo.com/show/357902/image-upload.svg"
          alt=""
        />

        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse </span>
            <span>to upload</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
            />
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>

      {base64Image && (
        <img
          src={base64Image}
          className="mt-4 mx-auto max-h-40"
          id="preview"
          alt="Preview"
        />
      )}
    </div>
  );
};

export default ImageDragDrop;
