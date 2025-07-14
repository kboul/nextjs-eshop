import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { orderStatuses } from "./constants";
import { getGreekOrderFilterStatus } from "./utils";

export default function StatusFilter({ onSelect, status }: { onSelect: (status: string) => void; status: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{getGreekOrderFilterStatus(status)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(orderStatuses).map((status) => (
          <DropdownMenuItem onClick={() => onSelect(status)}>{getGreekOrderFilterStatus(status)}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
