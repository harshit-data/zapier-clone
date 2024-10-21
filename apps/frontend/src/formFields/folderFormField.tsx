import { FolderFieldProps } from "../types/index.ts";

const FormField: React.FC<FolderFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
      className="px-5 py-2 rounded-md border-black border-[1px] cursor-pointer ]"
    />
    {error && <span className="error-message">{error.message}</span>}
  </>
);
export default FormField;
