interface DeleteSelectedButtonProps {
  onClick: () => void;
  className?: string;
}

const DeleteSelectedButton = ({
  onClick,
  className,
}: DeleteSelectedButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-primary px-5 py-2  rounded-md font-thin hover:bg-white hover:ring-1 hover:ring-secondary ${className}`}
    >
      <p className="font-ibm-plex-sans-thai font-bold text-white hover:text-primary ">
        ลบข้อมูลที่เลือก
      </p>
    </button>
  );
};

export default DeleteSelectedButton;
