import axios from "axios";
import { Notify } from "notiflix";
import { errorCatcher } from "./errorCatcher";

const getAll = async (user, setWishList) => {
  try {
    const { data } = await axios.get("/wishList", {
      headers: { collectionid: user.collectionId },
    });

    const newList = {};
    data.forEach((item) => {
      if (!newList[item.label]) {
        newList[item.label] = [
          { number: item.number, count: item.count, _id: item._id },
        ];
        return;
      }
      newList[item.label].push({
        number: item.number,
        count: item.count,
        id: item._id,
      });
    });

    const list = Object.keys(newList).map((label) => {
      return { label, flosses: newList[label] };
    });
    setWishList(list);

    return list;
  } catch (error) {
    errorCatcher(error);
  }
};

const addFloss = async (collectionId, floss) => {
  try {
    const { data } = await axios.post("/wishList", floss, {
      headers: { collectionId },
    });

    return data;
  } catch (error) {
    errorCatcher(error);
  }
};

const addLabeledFlosses = async (collectionId, flosses) => {
  try {
    const { data } = await axios.post("/wishList/schema", flosses, {
      headers: { collectionId },
    });
    Notify.success("All floss was added to you wish list");
    return data;
  } catch (error) {
    errorCatcher(error);
  }
};

const deleteFloss = async (collectionId, flossId) => {
  try {
    await axios.delete(`/wishList/${flossId}`, {
      headers: { collectionId },
    });

    Notify.success("Deleted success");
  } catch (error) {
    errorCatcher(error);
  }
};

const clearWishList = async (collectionId) => {
  try {
    await axios.delete("/wishList", {
      headers: { collectionId },
    });

    Notify.success("Your wish list is cleared");
  } catch (error) {
    errorCatcher(error);
  }
};

const updateOneFloss = async (collectionId, floss) => {
  try {
    await axios.patch("/wishList", floss, {
      headers: { collectionId },
    });

    Notify.success("Count is update");
  } catch (error) {
    errorCatcher(error);
  }
};

const operations = {
  getAll,
  addFloss,
  addLabeledFlosses,
  deleteFloss,
  clearWishList,
  updateOneFloss,
};
export default operations;
