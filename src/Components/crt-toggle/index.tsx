export const CRTToggle = ({
  HandleCRT,
}: {
  HandleCRT: React.MouseEventHandler<HTMLInputElement>;
}) => {
  return (
    <span className="fixed top-2 left-2 flex align-middle z-[2]">
      <input
        type="checkbox"
        onClick={HandleCRT}
        className="appearance-none h-4 w-4 m-2 outline-3 outline-dashed outline-offset-2 bg-white checked:bg-transparent rounded-none"
      />
      <p className="flex uppercase text-xl align-middle m-1">CRT TOGGLE</p>
    </span>
  );
};
