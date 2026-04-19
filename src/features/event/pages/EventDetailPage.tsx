import { useParams } from "react-router-dom";
import { useEventService } from "../services/EventService";
import Card from "@/components/Card";
import ListTable from "@/components/ListTable";
import { parseLinks } from "@/lib/parseLinks";
import { ParagraphImage } from "@/components/ParagraphImage";
import { useHistory } from "@/hooks/useHistory";
import { useEffect } from "react";

const EventDetailPage = () => {
  const { tag } = useParams();
  const { getEventByTag } = useEventService();
  const event = getEventByTag(tag as string);
  const { addToHistory } = useHistory();

  useEffect(() => {
    if (!event) return;
    addToHistory(event.tag, event.title);
  }, [addToHistory, event]);

  if (!event) return null;

  return (
    <>
      {event.desc && event.desc?.length >= 1 && (
        <Card title={event.title}>
          <div style={{ display: "flow-root" }}>
            {event.image && (
              <ParagraphImage tag={tag as string} title={event.title} />
            )}

            {event.desc.map((p, i) => (
              <p key={i}>{parseLinks(p)}</p>
            ))}
          </div>
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
    </>
  );
};

export default EventDetailPage;
