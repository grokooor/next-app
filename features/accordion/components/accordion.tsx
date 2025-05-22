"use client";
import { ArrowLeft, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { default as React } from "react";

import {
  Accordion as ShacnAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import ModeToggle from "@/features/dark-mode/components/toggle";
import { cn } from "@/lib/utils";

export const mycomponents: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Player Demo",
    href: "/player",
    description: `A Youtube Video Player Component Demo.`,
  },
];

export const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <a
      ref={ref}
      className={cn(
        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <div className="text-sm font-medium leading-none">{title}</div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {children}
      </p>
    </a>
  );
});
ListItem.displayName = "ListItem";

// this may be for next/navigation
const InsideAccordion = () => {
  return (
    <div className="grid gap-3 py-4 grid-cols-1 lg:grid-cols-2">
      {mycomponents.map((component) => (
        <ListItem
          key={component.title}
          title={component.title}
          href={component.href}
        >
          {component.description}
        </ListItem>
      ))}
    </div>
  );
};

export function Accordion() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-full">
      <ShacnAccordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="open">
          <div className="grid grid-cols-3 w-full items-center justify-between pb-4">
            <div className="flex gap-2">
              <div
                className={cn(buttonVariants({ variant: "outline" }))}
                onClick={() => router.push("/")}
              >
                <Home className="justify-self-start" />
              </div>
              {pathname == "/" ? (
                <></>
              ) : (
                <div
                  className={cn(buttonVariants({ variant: "outline" }))}
                  onClick={() => router.back()}
                >
                  <ArrowLeft className="justify-self-start" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 w-fit md:w-full m-auto">
              <AccordionTrigger
                className={cn(
                  // 'justify-self-center',
                  buttonVariants({ variant: "ghost" }),
                  "hover:no-underline",
                  "text-xs md:text-sm"
                )}
              >
                Menu
              </AccordionTrigger>
            </div>

            <div className="flex gap-2 md:gap-4 justify-end">
              <ModeToggle />
            </div>
          </div>

          <AccordionContent>
            <InsideAccordion />
          </AccordionContent>
        </AccordionItem>
      </ShacnAccordion>
    </div>
  );
}
