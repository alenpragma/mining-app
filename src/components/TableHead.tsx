//
//
const TableHead = ({ data, cN }: { data: string; cN?: string }) => {
  return (
    <>
      <th
        className={`${cN}
       py-4 px-2 lg:px-4 font-medium text-black dark:text-white`}
      >
        {data}
      </th>
    </>
  );
};

export default TableHead;
