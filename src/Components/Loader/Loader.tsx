const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center pointer-events-none z-50">
      <div className="spinner w-10 h-10 border-4 border-gray-300 rounded-full border-t-red-600 animate-spin"></div>
      <div>{/* <img width={100} src={spinner} alt="" /> */}</div>
    </div>
  );
};

export default Loader;
