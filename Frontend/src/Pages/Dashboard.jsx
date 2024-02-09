import axios from "axios";
import { useEffect, useState } from "react";
import Links from "../components/Links";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const shortenHandler = async () => {
    const response = await axios.post(
      "http://localhost:4000/url/new",
      {
        link: input,
      },
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    toast.success("Shortened successfully");
    setInput("");
    fetchData();
  };
  const [links, setLinks] = useState([]);
  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/users/details", {
        withCredentials: true,
      });
      console.log(data.links);
      setLinks(data.links);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="flex flex-col">
        <h1 className="text-3xl text-center font-bold mt-10 mb-10">
          Dashboard
        </h1>
        <div className="mb-10 flex justify-start ml-72 gap-x-4">
          <input
            type="text"
            className="bg-inherit border-2  border-gray-600 text-white text-lg rounded-lg  w-[800px] p-2.5"
            placeholder="Enter the link to be shortened"
            required
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={shortenHandler}
          >
            Shorten
          </button>
          <Toaster />
        </div>

        <div className="flex flex-col justify-center items-center gap-y-8">
          {links.map((link, index) => (
            <Links
              key={index}
              redirectURL={link.redirectURL}
              shortId={link.shortId}
              visitHistory={link.visitHistory.length}
              number={index}
              id={link._id}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
