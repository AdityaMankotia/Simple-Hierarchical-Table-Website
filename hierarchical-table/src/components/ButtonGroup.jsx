import React from "react";
import { useDispatch } from "react-redux";
import { updateValue, updateValueByPercentage } from "../redux/tableSlice";

const ButtonGroup = ({ row, inputValue, setInputValue }) => {
  const dispatch = useDispatch();

  return (
    <>
      <td>
        <button onClick={() => {
          if (!isNaN(inputValue)) {
            dispatch(updateValueByPercentage({ id: row.id, percentage: Number(inputValue) }));
            setInputValue("");
          }
        }}>
          %
        </button>
      </td>
      <td>
        <button onClick={() => {
          if (!isNaN(inputValue)) {
            dispatch(updateValue({ id: row.id, newValue: Number(inputValue) }));
            setInputValue("");
          }
        }}>
          $
        </button>
      </td>
    </>
  );
};

export default ButtonGroup;
