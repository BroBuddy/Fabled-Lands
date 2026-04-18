import TagList from "@/components/TagList";
import { useEventService } from "../services/EventService";
import Card from "@/components/Card";

function EventPage() {
  const { getEventData } = useEventService();
  const data = getEventData();

  return (
    <Card title="Events">
      <TagList tags={data} />
    </Card>
  );
}

export default EventPage;
