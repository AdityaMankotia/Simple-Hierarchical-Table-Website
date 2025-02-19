import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateValueByPercentage, updateValueDirectly } from "../redux/tableSlice";
import "./Table.css";

const Table = () => {
  const tableData = useSelector((state) => state.table.data);
  const dispatch = useDispatch();

  // Store input values separately to avoid modifying Redux state directly
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handlePercentageUpdate = (id) => {
    const percentage = parseFloat(inputValues[id]) || 0;
    dispatch(updateValueByPercentage({ id, percentage }));
  };

  const handleDirectUpdate = (id) => {
    const value = parseFloat(inputValues[id]) || 0;
    dispatch(updateValueDirectly({ id, value }));
  };

  return (
    <div className="table-wrapper">
      <table className="table-container">
        <thead>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <tr key={item.id} className={item.children ? "parent-row" : "child-row"}>
              <td>{item.label}</td>
              <td>{item.value.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  className="input-field"
                  value={inputValues[item.id] || ""}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handlePercentageUpdate(item.id)}>Apply %</button>
              </td>
              <td>
                <button onClick={() => handleDirectUpdate(item.id)}>Apply Val</button>
              </td>
              <td>{item.variance.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
