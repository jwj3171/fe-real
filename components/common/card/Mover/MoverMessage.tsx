interface MoverMessageProps {
  message: string;
  className?: string;
}

export default function MoverMessage({
  message,
  className,
}: MoverMessageProps) {
  return (
    <p
      className={`text-[16px] font-medium text-gray-800 sm:text-[18px] ${className || ""}`}
    >
      {message}
    </p>
  );
}
