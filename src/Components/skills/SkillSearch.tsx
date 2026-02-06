import { FiSearch, FiX } from "react-icons/fi";

export const SkillSearch = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative w-64 mb-4">
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search skills..."
        aria-label="Search skills"
        className="w-full px-4 py-2 pl-10 pr-10 bg-gray-900 text-white border-4 border-gray-300 focus:outline-none focus:border-gray-100 placeholder-gray-200"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};
