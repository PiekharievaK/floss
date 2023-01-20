export const searchFilter = (value, collection, setShownCollection) => {
  if (value.length === 0) {
    setShownCollection(collection);
    return;
  }

  // Придумать, чтоб был поиск только по выбранной фирме
  const searchFloss = collection.filter(
    (item) =>
      item.number?.toLowerCase().includes(value.toLowerCase()) ||
      item.colorName?.toLowerCase().includes(value.toLowerCase()) ||
      item.colorRUname?.toLowerCase().includes(value.toLowerCase())||
      item.labels?.DMC?.includes(value.toLowerCase())||
      item.labels?.Anchor?.includes(value.toLowerCase())||
      item.labels?.Madeira?.includes(value.toLowerCase())||
      item.labels?.Gamma?.includes(value.toLowerCase())
  );
  setShownCollection(searchFloss);
  return searchFloss;
};
