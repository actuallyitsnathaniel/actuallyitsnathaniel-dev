export const CRTToggle = ({
  HandleCRT,
  isCRT,
}: {
  HandleCRT: () => void;
  isCRT: boolean;
}) => {
  return (
    <div className="w-min fixed top-2 right-2 z-10 border border-white p-2 items-center gap-1 crt-preview">
      <label className="flex items-center gap-2 cursor-pointer p-1">
        <input
          type="checkbox"
          checked={isCRT}
          onChange={HandleCRT}
          className="appearance-none h-4 w-4 outline-3 outline-dashed outline-offset-1 bg-transparent checked:bg-white rounded-none"
        />
        <span className="uppercase text-sm scale-120 pr-0.5 whitespace-nowrap">
          &nbsp;CRT TOGGLE
        </span>
      </label>
    </div>
  );
};
