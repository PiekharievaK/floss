import axios from "axios";
import { Notify } from "notiflix";

const getAll = async (user, setUserCollection) => {
  const collectionId = user.user.collectionId;
  try {
    const { data } = await axios.get(`/journal/${collectionId}`);
    setUserCollection(data.flossCollection);
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const addNewFloss = async (user, userFloss) => {
  const collectionId = user.user.collectionId;
  try {
    if (!userFloss.label) {
      const DMCfloss = { floss: { ...userFloss, label: "DMC" }, collectionId };
      const { data } = await axios.post("/journal", DMCfloss);
      Notify.success("Floss is added to your collection");
      return data;
    }
    const otherFloss = { floss: userFloss, collectionId };
    const { data } = await axios.post("/journal", otherFloss);
    Notify.success("Floss is added to your collection");
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};
const deleteFloss = async (collectionId, flossId) => {
  try {
    const { data } = await axios.put(`/journal/${collectionId}`, {
      flossId,
      method: "delete",
    });
    Notify.success("This floss is remove from your collection");

    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const updateFloss = async (collectionId, flossId, count) => {
  try {
    const { data } = await axios.put(`/journal/${collectionId}`, {
      flossId,
      count,
      method: "update",
    });
    Notify.success("Count is update");
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const operations = {
  getAll,
  updateFloss,
  addNewFloss,
  deleteFloss,
};
export default operations;
