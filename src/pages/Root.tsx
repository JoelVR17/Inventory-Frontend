import Navbar from "../components/Navbar";

const Root = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 mt-6">
        <div className="flex min-h-80 justify-between">
          <div className="min-h-full w-1/2">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-500 to-blue-600">
                Inventory Solutions
              </span>{" "}
              for Your Business.
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Here at our inventory store, we specialize in providing solutions
              where technology, innovation, and strategic investments can
              optimize efficiency and drive sustainable growth.
            </p>
          </div>
          <div className="min-h-full w-1/3">
            <img
              src="/img1.png"
              className="w-full h-auto"
              alt="Welcome Image"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;
