import { apiBaseUrl } from "../config";
import axios from "axios";

export async function getUserHabits(userId) {
  try {
    const response = await axios.get(apiBaseUrl + "habits", {
      headers: { "user-id": userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
