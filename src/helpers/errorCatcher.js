import { Notify } from "notiflix";

export const errorCatcher = (error) => {
  if (!error?.response) {
    return;
  } else {
    return Notify.failure(`${error.response.data.message}.`);
  }
};
