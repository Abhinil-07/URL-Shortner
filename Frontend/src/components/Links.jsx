import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Links = ({
  redirectURL,
  shortId,
  visitHistory,
  number,
  id,
  fetchData,
}) => {
  async function handleRedirect() {
    try {
      const response = await axios.get("http://localhost:4000/url/SKKZS9IDQ", {
        maxRedirects: 0,
      });
      console.log(response);
    } catch (error) {
      // Handle redirection manually
      if (error.response.status === 302) {
        const redirectUrl = error.response.headers.location;
        window.location.href = redirectUrl;
      } else {
        console.log("Error occurred:", error);
      }
    }
  }

  const deleteHandler = async () => {
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

      <button onClick={handleRedirect}>{shortId}</button>
      <button
        type="button"
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        Visit
      </button>
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
