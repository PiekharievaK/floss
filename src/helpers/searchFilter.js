export const searchFilter = (value, collection, setShownCollection) => {
  if (value.length === 0) {
    setShownCollection(collection);
    return;
  }
  const searchFloss = collection.filter(
    (item) =>
      item.number.includes(value) ||
      item.colorName.toLowerCase().includes(value.toLowerCase())
  );
  setShownCollection(searchFloss);
  return searchFloss;
};
