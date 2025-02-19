import React, { useState } from "react";
import { useSelector } from "react-redux";
import ButtonGroup from "./ButtonGroup";

const TableRow = ({ row, level = 0 }) => {
  const [inputValue, setInputValue] = useState("");
  const originalValue = useSelector((state) => state.table.rows.find((r) => r.id === row.id)?.value || row.value);
  const variance = ((row.value - originalValue) / originalValue) * 100;

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>{row.label}</td>
        <td>{row.value}</td>
        <td>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </td>
        <ButtonGroup row={row} inputValue={inputValue} setInputValue={setInputValue} />
        <td>{isNaN(variance) ? "0%" : `${variance.toFixed(2)}%`}</td>
      </tr>
      {row.children &&
        row.children.map((child) => <TableRow key={child.id} row={child} level={level + 1} />)}
    </>
  );
};

export default TableRow;
