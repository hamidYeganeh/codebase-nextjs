import { Button } from "@/ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/Popover";

export default function Home() {
  return (
    <main className="min-h-[300dvh] w-full py-10 px-4 sm:px-8 space-y-10 pt-80">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"flat"}>Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-100" align="start" shadow={"2xl"}>
          <p>Popover Content</p>
        </PopoverContent>
      </Popover>
    </main>
  );
}
