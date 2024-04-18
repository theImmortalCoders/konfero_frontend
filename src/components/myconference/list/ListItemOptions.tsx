import { BsFillTrash3Fill, BsThreeDotsVertical } from "react-icons/bs";
import { Box } from "@/components/common/Box/Box";
import { useRef, useState } from "react";

export default function ListItemOptions({
  confId,
  handleDelete,
}: {
  confId: number;
  handleDelete: Function;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClickOutside = (e: any) => {
    if (open && !optionsRef.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  window.addEventListener("click", handleClickOutside);

  return (
    <div className="relative select-none" ref={optionsRef}>
      <div
        className="flex justify-center items-center w-9 h-9 hover:bg-neutral-300 duration-75 rounded-full"
        onClick={handleClick}
      >
        <BsThreeDotsVertical fontSize="1.5rem" />
      </div>
      <div
        className={`${
          open ? "absolute" : "hidden"
        } top-[20px] right-1/2 min-w-60`}
        ref={optionsRef}
      >
        <Box>
          <div
            onClick={() => handleDelete(confId)}
            className="flex justify-center items-center cursor-pointer"
          >
            <BsFillTrash3Fill color="red" />
            <p>&nbsp;Usuń konferencję</p>
          </div>
        </Box>
      </div>
    </div>
  );
}
