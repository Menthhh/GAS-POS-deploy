interface EditButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const EditButton = ({ label, onClick, className }: EditButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#4398E7]  w-[74px] h-[33px]  rounded-md  ${className} hover:bg-[#347EC2]`}
    >
      <p className="text-white font-medium">{label}</p>
    </button>
  );
};

export default EditButton;
