
const Button = ({ btnName, classes = 'px-6' }: {
  btnName: string;
  classes: string;
}) => {
  return (
    <button className={` ${classes} btn flex justify-center rounded bg-primary py-2   font-medium text-gray hover:shadow-1`}
      type="submit">
      {btnName}
    </button>
  );
};

export default Button;