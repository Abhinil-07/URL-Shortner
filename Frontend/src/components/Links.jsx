import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Links = ({
  redirectURL,
  shortId,
  visitHistory,
  number,
  id,
  fetchData,
  onDelete,
}) => {
  const deleteHandler = async () => {
    console.log(redirectURL);
    try {
      const response = await axios.delete(
        `http://localhost:4000/url/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      // alert("Deleted successfully");
      toast.success("Deleted successfully");
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-between items-center  w-3/4 border-2 rounded-2xl border-gray-600 p-4">
      <h1 className=" text-2xl font-semibold">{number + 1}</h1>
      <div className=" w-[400px]  overflow-wrap">{redirectURL}</div>

      {/* <button onClick={handleRedirect}></button> */}
      <a href={`http://localhost:4000/url/${shortId}`} target="blank">
        {shortId}
      </a>
      <a href={`http://localhost:4000/url/${shortId}`} target="blank">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Visit
        </button>
      </a>

      <p>{visitHistory}</p>
      <button
        onClick={deleteHandler}
        type="button"
        className="focus:outline-none text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Delete
      </button>
      <Toaster />
    </div>
  );
};

export default Links;
