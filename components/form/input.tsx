import { cn } from "@/lib/utils";

const Input = ({
  type,
  name,
  placeholder,
  className,
}: {
  type?: string;
  name?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={cn(className)}
    />
  );
};
export { Input };
