import Card from "@/components/Card";
import type { TableType } from "@/features/rule/types/RuleType";
import { parseLinks } from "@/lib/parseLinks";

function TableContent({ table }: { table: TableType }) {
  return (
    <table>
      <thead>
        <tr>
          {table.cols.map((col, i) => (
            <th key={i} className="p-2">
              {col}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {table.rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="p-2">
                {parseLinks(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ListTable({ table }: { table: TableType }) {
  const hasLabel = Boolean(table.label);

  if (!hasLabel) {
    return <TableContent table={table} />;
  }

  return (
    <Card title={table.label}>
      <TableContent table={table} />
    </Card>
  );
}
export default ListTable;
