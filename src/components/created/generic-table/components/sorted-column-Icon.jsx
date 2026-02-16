import { FaSortDown, FaSortUp } from "react-icons/fa";

const SortedColumnIcon = ({ isSorted }) => {
  if (isSorted === "asc") {
    return (
      <div className="flex flex-col">
        <FaSortUp size={10} className="text-white" />
        <FaSortDown size={10} className="opacity-30" />
      </div>
    );
  } else if (isSorted === "desc") {
    return (
      <div className="flex flex-col">
        <FaSortUp size={10} className="opacity-30" />
        <FaSortDown size={10} className="text-white" />
      </div>
    );
  } else {
    return null;
  }
};

export default SortedColumnIcon;
