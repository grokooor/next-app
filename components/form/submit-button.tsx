import { LucideLoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "../ui/button";

type SubmitButtonProps = { label: string };

const SubmitButton = ({ label }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      aria-label="Go"
      color="primary"
      disabled={pending}
      className="w-full"
    >
      {/* {connection ? (!pending ? "Add" : "Adding") : "Connect RPC first"} */}
      {pending && <LucideLoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
      <p>{label}</p>
    </Button>
  );
};
export { SubmitButton };
