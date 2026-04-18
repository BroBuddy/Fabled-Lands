import { Link, useParams } from "react-router-dom";
import { useEventService } from "../services/EventService";
import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { parseLinks } from "@/lib/parseLinks";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

const EventDetailPage = () => {
  const { tag } = useParams();
  const { getEventByTag } = useEventService();
  const event = getEventByTag(tag as string);

  if (!event) return null;

  const currentNumber = parseInt(tag!.replace(/\D/g, ""), 10);
  const prefix = tag!.replace(/\d+$/, "");
  const prevTag = `${prefix}${String(currentNumber - 1).padStart(3, "0")}`;
  const nextTag = `${prefix}${String(currentNumber + 1).padStart(3, "0")}`;

  return (
    <>
      {event.desc && event.desc?.length >= 1 && (
        <Card title={event.title}>
          {event.desc.map((p, i) => (
            <p key={i}>{parseLinks(p)}</p>
          ))}
        </Card>
      )}
      {event.tables?.map((table, index) => (
        <ListTable key={index} table={table} />
      ))}
      {event.note && (
        <Card title="Notes">
          {event.note?.map((p, i) => (
            <p key={i}>{parseLinks(p)}</p>
          ))}
        </Card>
      )}

      <div className="flex justify-center gap-5">
        <Link to={`/event/${prevTag}`}>
          <ChevronLeftCircle size={30} />
        </Link>
        <Link to={`/event/${nextTag}`}>
          <ChevronRightCircle size={30} />
        </Link>
      </div>
    </>
  );
};

export default EventDetailPage;
