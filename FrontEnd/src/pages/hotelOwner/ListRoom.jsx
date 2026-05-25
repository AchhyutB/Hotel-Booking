import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";

const ListRoom = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(roomsDummyData);

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Room Listings"
        subTitle="View, edit, or manage all the listed rooms. Keep the information up-to-date to provide the best experience for users."
      />
      <p className="text-gray-500 mt-8">All Rooms</p>

      <div className="w-full max-w-4xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll mt-3">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-gray-800 font-medium">Name</th>
              <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
                Facility
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Price / night
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Available
              </th>
              <th className="py-3 px-4 text-gray-800 font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rooms.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">
                  {item.roomType}
                </td>
                <td className="py-3 px-5 text-gray-700 border-t border-gray-300 max-sm:hidden">
                  {item.amenities.join(", ")}
                </td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300 text-center">
                  Rs {item.pricePerNight}
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <label className="relative inline-flex items-center cursor-pointer gap-3">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={item.isAvailable}
                        onChange={() =>
                          setRooms((prev) =>
                            prev.map((room, i) =>
                              i === index
                                ? {
                                    ...room,
                                    isAvailable: !room.isAvailable,
                                  }
                                : room
                            )
                          )
                        }
                      />
                      <div className="w-11 h-6 bg-slate-300 rounded-full peer-checked:bg-blue-500 transition-colors duration-200" />
                      <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
                    </div>
                  </label>
                </td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit Button */}
                    <button
                      onClick={() =>
                        navigate("/owner/add-room", {
                          state: { room: item },
                        })
                      }
                      className="px-3 py-1 text-xs border border-blue-300 text-blue-500 rounded-full hover:bg-blue-50 transition-all cursor-pointer"
                    >
                      Edit
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        setRooms((prev) =>
                          prev.filter((_, i) => i !== index)
                        )
                      }
                      className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded-full hover:bg-red-50 transition-all cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListRoom;