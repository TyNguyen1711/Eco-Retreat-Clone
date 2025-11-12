const PrimaryButton = ({
  handleClick,
  title,
}: {
  handleClick: any;
  title: string;
}) => {
  return (
    <button
      onClick={handleClick}
      className="w-max px-16 md:px-20 p-3 md:py-5 cursor-pointer z-10 bg-[#5fcd6f] rounded-2xl border-[#017111] border-2 hover:bg-white hover:border-white drop-shadow-lg drop-shadow-white/0 hover:drop-shadow-white transition-all duration-300 overflow-hidden group"
    >
      <span className="text-white text-lg md:text-xl font-bold group-hover:text-primary transition-colors duration-300 uppercase">
        {title}
      </span>
    </button>
  );
};
export default PrimaryButton;
