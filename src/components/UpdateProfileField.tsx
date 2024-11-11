export interface UpdateProfileFieldProps {
  title: string;
  value: string;
  callback: (value: string) => void;
}

const UpdateProfileField = ({ title, value, callback }: UpdateProfileFieldProps) => {
  return (
    <div>
      <p>{title}</p>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => callback(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default UpdateProfileField;
