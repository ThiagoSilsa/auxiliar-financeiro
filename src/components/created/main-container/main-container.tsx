import { cn } from "@/lib/utils";

function MainContainer({ className, children }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto max-w-7xl flex flex-col items-center justify-between p-4 sm:px-6 sm:py-4 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ContainerDiv({ className, children }: React.ComponentProps<"div">) {
  return <div className={cn("w-full grid gap-4", className)}>{children}</div>;
}

export { MainContainer, ContainerDiv };
