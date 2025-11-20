import { MAX_TITLE_LENGTH } from "../constants";

export default (title) => {
  if (title.length <= MAX_TITLE_LENGTH) {
    return title;
  } else {
    return title.slice(0, MAX_TITLE_LENGTH) + "...";
  }
};
