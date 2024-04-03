
const Button = ({ btnName }: {
  btnName: string;
}) => {
  return (
    <button className="btn flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
      type="submit">
      {btnName}
    </button>
  );
};

export default Button;