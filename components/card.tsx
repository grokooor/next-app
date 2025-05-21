import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardCompactProps = {
  title?: string | null;
  description?: string | null;
  content?: React.ReactNode | null;
  className?: string | null;
  footer?: React.ReactNode | null;
};

const Card = ({
  title,
  description,
  content,
  className,
  footer,
}: CardCompactProps) => {
  return (
    <ShadcnCard className={cn("w-full max-w-[840px] self-center", className)}>
      {title || description ? (
        <CardHeader>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      {content ? <CardContent>{content}</CardContent> : null}
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </ShadcnCard>
  );
};

export { Card };
