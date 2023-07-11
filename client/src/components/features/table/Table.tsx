type TableRowProps = {
  no: number;
  quantity: number;
  onRemove: (id: string) => void;
  price: number;
  product: {
    images: string[];
    name: string;
    id: string;
    description: string;
  };
};

const TableRow: React.FC<TableRowProps> = ({
  no,
  quantity,
  onRemove,
  isRemoving,
  price,
  product,
}) => {
  return (
    <tr className=" text-center  font-bold">
      <td>{no}</td>

      <td>
        <img
          className=" mx-auto w-10 p-1"
          src={product.images[0]}
          alt={product.name}
        />
      </td>
      <td>{product.name}</td>
      <td className=" w-1/3 p-1 text-center">{product.description}</td>
      <td>{quantity}</td>
      <td> ₪ {price / 100}</td>
      <td>
        <button
          onClick={() => onRemove(product.id)}
          className=" rounded-2xl bg-[#E30000] px-5 py-2 text-lg font-bold text-white hover:bg-[#eeeeee] hover:text-black hover:shadow-2xl "
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
    <table className="  table-auto rounded-xl   border border-gray-100 bg-slate-200  shadow-2xl">
      <thead className="h-14  bg-slate-400 text-xl ">
        <tr>
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
            onRemove={() => onRemove(item.product.id)}
            price={item.unit_amount}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
