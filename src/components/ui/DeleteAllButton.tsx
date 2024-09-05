interface DeleteAllButtonProps {
  onClick: () => void;
  className: string;
}

const DeleteAllButton = ({ onClick, className }: DeleteAllButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#F62626]  px-5 py-2  rounded-md font-thin hover:bg-white hover:ring-1 hover:ring-secondary hover:text-primary ${className}`}
    >
      <p className="font-ibm-plex-sans-thai font-bold text-white hover:text-primary ">ลบทั้งหมด</p>
    </button>
  );
};

export default DeleteAllButton;
