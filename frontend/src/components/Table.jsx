const Row = ({ row }) => {
  return (
    <tr className="bg-white hover:bg-slate-100 odd:bg-slate-50 border-b">
      {row.map((cell, i) => (
        <td className="px-6 py-4" key={i}>
          {cell}
        </td>
      ))}
    </tr>
  );
};

/**
 *
 * @param {object} props
 * @param {string[]} props.headers
 * @param {any[][]} props.rows
 * @returns
 */
const Table = ({ headers, rows }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr className="bg-white border-b">
            {headers.map((header, i) => (
              <th scope="col" className="px-6 py-3" key={i}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Row row={row} key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
