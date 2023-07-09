type TableRowProps = {
  no: number;
  quantity: number;
  onRemove: (id: string) => void;
  price: number;
  product: {
    image: string[0];
    name: string;
    id: string;
    description: string;
  };
};

const TableRow: React.FC<TableRowProps> = ({
  no,
  quantity,
  onRemove,
  price,
  product,
}) => {
  return (
    <tr className=" text-center ">
      <td>{no}</td>
      <td>
        <img src={product.image} alt={product.name} />
      </td>
      <td>{product.name}</td>
      <td className=" w-1/3 p-1 text-center">{product.description}</td>
      <td>{quantity}</td>
      <td> ₪ {price / 100 }</td>
      <td>
        <button
          onClick={() => onRemove(product.id)}
          className="rounded-2xl bg-[#E30000] px-5 py-2 text-lg font-bold text-white hover:text-black hover:shadow-2xl"
        >
          הסר
        </button>
      </td>
    </tr>
  );
};

const Table: React.FC<{
  data: TableRowProps[];
  onRemove: (id: string) => void;
}> = ({ data, onRemove }) => {
  return (
    <table className="    table-auto  bg-slate-200">
      <thead className="bg-slate-300  ">
        <tr className=" p-4 text-xl">
          <th>מס׳</th>
          <th>תמונה</th>
          <th>שם המוצר</th>
          <th>תיאור</th>
          <th>כמות</th>
          <th>מחיר</th>
          <th>הסר</th>
        </tr>
      </thead>
      <tbody className=" p-10 [&>*:nth-child(even)]:bg-slate-300 ">
        {data?.map((item, index) => (
          <TableRow
            key={index}
            product={item.product}
            quantity={0}
            no={index + 1}
            onRemove={onRemove}
            price={item.unit_amount}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
