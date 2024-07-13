//
//
const TableHead = ({ data }: { data: string }) => {
  return (
    <>
      <th className="py-4 px-4 font-medium text-black dark:text-white">
        {data}
      </th>
    </>
  );
};

export default TableHead;
