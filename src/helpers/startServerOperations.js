import axios from "axios";

const startServer = async () => {
  try {
    const { data } = await axios.get("/FlossCollection");
    //   console.log(data);
    return data;
  } catch (error) {
    return;
  }
};

export default startServer;
