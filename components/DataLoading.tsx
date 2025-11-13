import Loading from "./Loading";

interface LoadingWithProgressProps {
  progress: number;
}

const DataLoading = ({ progress }: LoadingWithProgressProps) => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <Loading />

        <div className="flex flex-col items-center gap-4 w-80 md:w-[700px] absolute -bottom-34">
          <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-lime-400 to-lime-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex flex-col items-center gap-2 text-white">
            <p className="text-lg font-medium">Đang tải dữ liệu</p>
            <p className="text-sm text-gray-300">Xin vui lòng chờ...</p>
            <p className="text-2xl font-bold text-lime-400">{progress}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataLoading;
