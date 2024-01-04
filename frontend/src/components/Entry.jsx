import React, { useEffect, useState } from "react";
import axios from "axios";
import Calender from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { apiBaseUrl } from "../../../backend/config";

const Entry = () => {
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(new Date());
  const [allHabits, setAllHabits] = useState([]);

  useEffect(() => {
    async function getHabits() {
      const response = await axios.get(apiBaseUrl + "habits");
      setAllHabits(response.data);
    }
    getHabits();
  }, []);

  const handleDateSelect = async (date) => {
    setIsDateSelected(!isDateSelected);
    setDateSelected(date);
    try {
      const existingEntry = await axios.get(
        `${apiBaseUrl}daily-track?startDate=${encodeURIComponent(
          date
        )}&endDate=${encodeURIComponent(date)}`
      );
      if (existingEntry.data.length > 0 && existingEntry?.data[0]?.habits) {
        setAllHabits(existingEntry?.data[0]?.habits);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChecboxChange = (selectedChecbox) => {
    const clonedHabits = [...allHabits];
    const changedCheckbox = clonedHabits.filter(
      (item) => item.title === selectedChecbox.title
    );
    if (changedCheckbox.length === 1) {
      changedCheckbox[0].isCompleted = !selectedChecbox.isCompleted;
      setAllHabits(clonedHabits);
    }
  };

  const handleSubmit = async () => {
    try {
      const newEntry = {
        date: dateSelected,
        habits: allHabits,
      };

      const result = await axios.post(apiBaseUrl + "daily-track", newEntry);
      setIsDateSelected(!isDateSelected);
    } catch (error) {
      console.log(error);
    }
  };

  const getTileContent = ({ date, view }) => {};
  return (
    <div className="h-full">
      {!isDateSelected ? (
        <div>
          <h2 className="text-center text-3xl p-16">
            Click on the date to make an entry
          </h2>
          <Calender
            className="habit-entry-calendar"
            onChange={handleDateSelect}
            tileContent={getTileContent}
            value={dateSelected}
          />
        </div>
      ) : (
        <div>
          <h2 className="text-center text-3xl p-16">
            Check the boxes and submit
          </h2>
          {allHabits && (
            <div>
              {allHabits.map((item) => (
                <div
                  className="flex items-center p-3 justify-center"
                  key={item.id}
                >
                  <input
                    checked={item.isCompleted}
                    id="checked-checkbox"
                    type="checkbox"
                    value={item.isCompleted}
                    className="cursor-pointer w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={() => handleChecboxChange(item)}
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="ms-2 text-xl font-medium text-gray-900 "
                  >
                    {item.title}
                  </label>
                </div>
              ))}
            </div>
          )}
          <div className="text-center">
            <button
              className="p-3 mt-8 mr-5 bg-gray-900 text-white rounded-lg font-bold"
              onClick={handleSubmit}
            >
              Submit Entry
            </button>
            <button
              className="p-3 mt-8  bg-gray-900 text-white rounded-lg font-bold"
              onClick={() => {
                setIsDateSelected(!isDateSelected);
              }}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entry;
