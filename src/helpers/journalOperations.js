import axios from "axios";
import { Notify } from "notiflix";

const getAllFlosses = async (user, setUserCollection) => {
  const collectionId = user.collectionId;
  try {
    const { data } = await axios.get(`/flosses/${collectionId}`);
    setUserCollection(data);
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const addNewFloss = async (user, userFloss) => {
  const collectionId = user.collectionId;
  try {
    if (userFloss.label === "Other") {
      const otherFloss = { floss: userFloss, collectionId };
      const { data } = await axios.post("/flosses", otherFloss);
      Notify.success("Floss is added to your collection");
      return data;
    
    }
    const labelfloss = { floss: userFloss, collectionId };
    const { data } = await axios.post("/flosses", labelfloss);
    Notify.success("Floss is added to your collection");
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};
const deleteFloss = async (collectionId, flossId) => {
  try {
    const { data } = await axios.put(`/flosses/${collectionId}`, {
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
    const { data } = await axios.put(`/flosses/${collectionId}`, {
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

const getAllSchemas = async (collectionId, setSchemas) => {
  try {
    const { data } = await axios.get(`/schemas/${collectionId}`);
    setSchemas(data);
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const addNewSchema = async (collectionId, schema) => {
  try {
    const { data } = await axios.post(`/schemas`, { collectionId, schema });
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};
const addSchemaImage = async (collectionId, schemaId, image) => {
  try {
    console.log(image);
    const { data } = await axios.post(`/schemas/image`, image, {
      headers: { collectionId, schemaId },
    });
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};
const addSchemaFloss = async (collectionId, schemaId, floss) => {
  try {
    console.log(floss);
    const { data } = await axios.post(`/schemas/floss`, floss, {
      headers: { collectionId, schemaId },
    });
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const deleteSchemaFloss = async (collectionId, schemaId, label, flossId) => {
  try {
    console.log(collectionId);
    const { data } = await axios.put(
      `/schemas/deleteFloss`,
      { label, flossId },
      {
        headers: { collectionId, schemaId },
      }
    );
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};
const deleteSchema = async (collectionId, schemaId) => {
  try {
    console.log(collectionId);
    const { data } = await axios.delete(`/schemas`, {
      headers: { collectionId, schemaId },
    });
    return data;
  } catch (error) {
    return Notify.failure(`${error.response.data.message}.`);
  }
};

const operations = {
  getAllFlosses,
  updateFloss,
  addNewFloss,
  deleteFloss,
  getAllSchemas,
  addNewSchema,
  addSchemaImage,
  addSchemaFloss,
  deleteSchemaFloss,
  deleteSchema,
};
export default operations;
