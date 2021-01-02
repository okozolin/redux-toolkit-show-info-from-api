import { ARTISTS_API } from "../config/env";

const url = (query) => {
  return `${ARTISTS_API}${query}?app_id=45`;
};
export default url;
