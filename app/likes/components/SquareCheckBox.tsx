import {
  SqureDefaultCheckIcon,
  SqureActiveCheckIcon,
} from "@/components/common/button/icons";

interface SquareCheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function SquareCheckBox({
  checked = false,
  onChange,
  className,
}: SquareCheckBoxProps) {
  const handleClick = () => {
    onChange?.(!checked);
  };

  return (
    <div
      className={`h-full cursor-pointer p-2 ${className || ""}`}
      onClick={handleClick}
    >
      {checked ? (
        <SqureActiveCheckIcon className="aspect-square h-full" />
      ) : (
        <SqureDefaultCheckIcon className="aspect-square h-full" />
      )}
    </div>
  );
}
