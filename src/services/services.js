import axios from "axios";

export default class Api {
  static async getData(url) {
    try {
      const response = await axios.get(url);
      var results = response.data;
      console.log("results", results);
      return results;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
