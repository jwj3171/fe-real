interface CardHeaderProps {
  customerName: string;
  className?: string;
}

export default function CardHeader({
  customerName,
  className,
}: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-100">
      <h3 className={`font-bold ${className || "text-lg"}`}>
        {customerName} 고객님
      </h3>
    </div>
  );
}
