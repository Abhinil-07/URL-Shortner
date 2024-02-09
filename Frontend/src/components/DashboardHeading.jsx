const DashboardHeading = () => {
  return (
    <div className="flex justify-between items-center  w-3/4 border-2 rounded-2xl border-gray-600 p-4">
      <h1 className=" text-sm font-semibold">Sl.No</h1>
      <div className=" w-[400px]  overflow-wrap">Original URL</div>

      <button>Shortened Code</button>
      <button type="button" className="text-zinc-900">
        Visit
      </button>
      <p>Counts</p>
      <button type="button" className="text-zinc-900">
        Delete
      </button>
    </div>
  );
};

export default DashboardHeading;
