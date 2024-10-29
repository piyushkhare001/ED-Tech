// components/Spinner.tsx

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="flex items-center justify-center h-screen min-w-sceen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
