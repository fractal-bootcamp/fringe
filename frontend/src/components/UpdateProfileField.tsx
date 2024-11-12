export interface UpdateProfileFieldProps {
  title: string;
  value: string;
  callback: (value: string) => void;
  type?: "text" | "image";
  onImageUpload?: (file: File) => void;
}

const UpdateProfileField = ({
  title,
  value,
  callback,
  type = "text",
  onImageUpload,
}: UpdateProfileFieldProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <label>{title}</label>
      {type === "image" ? (
        <div>
          {value && (
            <img src={value} alt="Profile" className="w-24 h-24 object-cover rounded-full mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => callback(e.target.value)}
          className="input-field"
        />
      )}
    </div>
  );
};

export default UpdateProfileField;
