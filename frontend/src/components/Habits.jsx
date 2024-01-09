import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getUserHabits } from "../services/data.service";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import { apiBaseUrl, toastConfig } from "../config";

const Habits = () => {
  const [userHabits, setUserHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    getUserHabits(userId)
      .then((data) => {
        setUserHabits(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setNewHabit(e.target.value);
  };

  const handleAdd = async () => {
    if (habit) {
      const req = {
        habit: {
          title: newHabit,
        },
        userId,
      };
      try {
        const result = await axios.post(apiBaseUrl + "habits", req);
        setUserHabits(result.data);
        toast.success("Habit Added Successfully", toastConfig);
      } catch (error) {
        toast.error("Something Went Wrong, Please try again", toastConfig);
      }
    }
  };

  const handleDelete = (delHabit) => {
    console.log(delHabit);
  };
  return (
    <>
      <div className="mt-10 text-left">
        {userHabits?.length === 0 ? (
          <div>
            <h1 className="text-3xl font-semibold">Start Tracking Habits</h1>
            <p className="text-md">
              Begin your habit-tracking journey. Add habits you want to track.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-semibold">Your Habit Collection</h1>
            <p className="text-md">
              Take a look at your habits. Ready to expand the collection? Add
              more below
            </p>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  {userHabits?.map((habit) => (
                    <tr
                      key={habit._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {habit.title}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => handleDelete(habit)}
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mb-4 flex mt-4">
          <input
            type="text"
            id="habit"
            name="habit"
            value={newHabit}
            onChange={handleChange}
            className=" border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 mr-4 w-4/5"
            required
          />
          <button
            onClick={handleAdd}
            className=" bg-gray-900 text-white py-2 px-4 rounded-md font-bold w-1/5"
          >
            Add
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Habits;
