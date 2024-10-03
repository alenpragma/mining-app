import { ReactNode } from 'react';

type IRow = {
  data: string | number | null;
  children?: ReactNode;
  className?: string;
};

const TableRow = ({ data, children, className }: IRow) => {
  return (
    <td
      className={`${className} border-b border-[#eee] py-5 px-2 lg:px-4 dark:border-strokedark`}
    >
      <h5 className="font-medium text-black dark:text-white">{data}</h5>
      {children}
    </td>
  );
};

export default TableRow;
