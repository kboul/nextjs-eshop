import { Badge } from "@/components/ui/badge";
import { OrderAction } from "./types";
import { orderStatuses } from "./constants";

const getStatusBadge = (status: string) => {
  switch (status) {
    case orderStatuses.accepted:
      return <Badge className="bg-green-100 text-green-800">Ολοκληρώθηκε</Badge>;
    case "open":
      return <Badge className="bg-blue-100 text-blue-800">Σε εξέλιξη</Badge>;
    case "expired":
      return <Badge className="bg-red-100 text-red-800">Έληξε</Badge>;
    case orderStatuses.draft:
      return <Badge className="bg-gray-100 text-gray-800">Προς επεξεργασία</Badge>;
    case orderStatuses.canceled:
      return <Badge variant="destructive">Ακυρώθηκε</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const getGreekOrderAction = (orderAction: OrderAction) => {
  return { finalize: "στάλθηκε", accept: "ολοκληρώθηκε", cancel: "ακυρώθηκε" }[orderAction];
};

const getGreekOrderFilterStatus = (status: string) =>
  ({
    [orderStatuses.all]: "Όλες",
    [orderStatuses.accepted]: "Ολοκληρωμένες",
    [orderStatuses.canceled]: "Ακυρωμένες",
    [orderStatuses.draft]: "Προς Επεξεργασία",
    [orderStatuses.open]: "Σε εξέλιξη"
  }[status]);

export { getStatusBadge, getGreekOrderAction, getGreekOrderFilterStatus };
