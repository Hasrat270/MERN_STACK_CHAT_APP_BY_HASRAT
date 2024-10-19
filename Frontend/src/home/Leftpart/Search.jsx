import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();
  console.log(allUsers);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };
  return (
    <div className="h-20">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className=" 
              border-[1px]
            border-yellow-500
            bg-slate-900
              rounded-lg p-3 
              flex 
              items-center 
              gap-2 
              w-[100%]">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button>
                <FaSearch className="text-yellow-500 hover:scale-125 text-xl rounded-full duration-300" />
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
