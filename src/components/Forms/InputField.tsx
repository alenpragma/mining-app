const InputField = ({
  label,
  name,
  register,
  placeholder,
  defaultValue,
  type = 'text',
  ...props
}: any) => {
  return (
    <div className="w-full xl:w-1/2">
      <label className="mt-2.5 mb-0.5 block text-black dark:text-white">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        defaultValue={defaultValue}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...props}
      />
    </div>
  );
};

export default InputField;
