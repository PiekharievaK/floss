import axios from "axios";
import { Notify } from "notiflix";

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
  } catch (e) {
    return Notify.failure(`${e.response.data.message}.`);
  }
};

const addFloss = async (collectionId, floss) => {
  try {
    const { data } = await axios.post("/wishList", floss, {
      headers: { collectionId },
    });

    return data;
  } catch (e) {
    return Notify.failure(`${e.response.data.message}.`);
  }
};

const addLabeledFlosses = async (collectionId, flosses) => {

  try {
    const { data } = await axios.post("/wishList/schema", flosses, {
      headers: { collectionId },
    });
    Notify.success("All floss was added to you wish list");
    return data;
  } catch (e) {
    return Notify.failure(`${e.response.data.message}.`);
  }
};

const deleteFloss = async (collectionId, flossId) => {
  try {
    await axios.delete(`/wishList/${flossId}`, {
      headers: { collectionId },
    });

    Notify.success("Deleted success");
  } catch (e) {
    return Notify.failure(`${e.response.data.message}.`);
  }
};

const clearWishList = async (collectionId) => {
  try {
    await axios.delete("/wishList", {
      headers: { collectionId },
    });

    Notify.success("Your wish list is cleared");
  } catch (e) {
    return Notify.failure(`${e.response.data.message}.`);
  }
};

const updateOneFloss = async (collectionId, floss) => {
  try {
    await axios.patch("/wishList", floss, {
      headers: { collectionId },
    });

    Notify.success("Count is update");
  } catch (e) {
    return Notify.failure(`${e.response.data.message}.`);
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
