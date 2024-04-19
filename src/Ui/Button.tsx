const Button = ({ btnName, cs = 'px-6' }: { btnName: string; cs: string }) => {
  return (
    <button
      className={` ${cs} btn flex justify-center rounded bg-primary py-2   font-medium text-gray hover:shadow-1`}
      type="submit"
    >
      {btnName}
    </button>
  );
};

export default Button;
