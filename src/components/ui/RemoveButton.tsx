interface RemoveButtonProps {
  label: string;
  onClick: () => void;
  className?: string;
}

const RemoveButton = ({ label, onClick, className }: RemoveButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#F62626]  w-[74px] h-[33px] rounded-md  ${className} hover:bg-[#F24C4E]`}
    >
      <p className="text-white font-medium">{label}</p>
    </button>
  );
};

export default RemoveButton;
