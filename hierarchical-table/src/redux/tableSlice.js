import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    { id: 1, label: "Electronics", value: 1500, originalValue: 1500, variance: 0, parentId: null },
    { id: 2, label: "-- Phones", value: 800, originalValue: 800, variance: 0, parentId: 1 },
    { id: 3, label: "-- Laptops", value: 700, originalValue: 700, variance: 0, parentId: 1 },
    { id: 4, label: "Furniture", value: 1000, originalValue: 1000, variance: 0, parentId: null },
    { id: 5, label: "-- Tables", value: 300, originalValue: 300, variance: 0, parentId: 4 },
    { id: 6, label: "-- Chairs", value: 700, originalValue: 700, variance: 0, parentId: 4 },
  ],
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    updateValueByPercentage: (state, action) => {
      const { id, percentage } = action.payload;
      const item = state.data.find((row) => row.id === id);
      if (!item) return;

      // Calculate new value
      const newValue = item.value + (item.value * percentage) / 100;
      item.variance = ((newValue - item.originalValue) / item.originalValue) * 100;
      item.value = parseFloat(newValue.toFixed(2));

      // Update parent totals
      updateParentValues(state, item.parentId);
    },

    updateValueDirectly: (state, action) => {
      const { id, value } = action.payload;
      const item = state.data.find((row) => row.id === id);
      if (!item) return;

      // Check if the item has children
      const children = state.data.filter((row) => row.parentId === id);

      if (children.length > 0) {
        // If it's a parent, distribute value among children based on original proportion
        const originalTotal = children.reduce((sum, child) => sum + child.value, 0);

        if (originalTotal > 0) {
          children.forEach((child) => {
            const contributionPercent = (child.value / originalTotal).toFixed(4);
            const newChildValue = parseFloat((value * contributionPercent).toFixed(2));
            child.variance = ((newChildValue - child.originalValue) / child.originalValue) * 100;
            child.value = newChildValue;
          });
        }
      }

      // Update the item's value and variance
      item.variance = ((value - item.originalValue) / item.originalValue) * 100;
      item.value = parseFloat(value.toFixed(2));

      // Update parent totals
      updateParentValues(state, item.parentId);
    },
  },
});

const updateParentValues = (state, parentId) => {
  while (parentId !== null) {
    const parent = state.data.find((row) => row.id === parentId);
    if (!parent) break;

    const children = state.data.filter((row) => row.parentId === parentId);
    const newTotal = children.reduce((sum, child) => sum + child.value, 0);
    
    parent.variance = ((newTotal - parent.originalValue) / parent.originalValue) * 100;
    parent.value = parseFloat(newTotal.toFixed(2));

    parentId = parent.parentId; // Move up the hierarchy
  }
};

export const { updateValueByPercentage, updateValueDirectly } = tableSlice.actions;
export default tableSlice.reducer;
