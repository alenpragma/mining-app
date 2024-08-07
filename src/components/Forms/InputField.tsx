import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;

  placeholder?: string;
  defaultValue?: string | number;
  required?: boolean;
  type?: string;
  error?: FieldError;
  [key: string]: any;
}

const InputField = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  required,
  type = 'text',
  ...props
}: InputFieldProps) => {
  const validationRules = required
    ? { required: 'This field is required' }
    : {};

  return (
    <div className="w-full">
      <label className="mb-0.5 block text-black dark:text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, validationRules)}
        defaultValue={defaultValue}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...props}
      />
    </div>
  );
};

export default InputField;
