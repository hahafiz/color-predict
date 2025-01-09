const App = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex-row w-full ">
        <div className="container mx-auto px-4 py-8 bg-slate-600 min-h-[400px]"></div>
        <form className="container mx-auto py-8 max-w-48">
          <label className="relative block">
            <span className="sr-only">Guess the hex code</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
            </span>
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              placeholder="Guess the hex code"
              type="text"
              name="hexcode"
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default App;
