import events_001 from "../data/events_001_100.json";
import events_101 from "../data/events_101_200.json";
import type { Event, EventItem } from "../types/EventType";

export function useEventService() {
  const eventData: Event[] = [...events_001, ...events_101];

  const getEventData = (): EventItem[] => {
    if (!eventData) return [];
    return eventData.map(({ tag, title }) => ({ tag, title }));
  };

  const getEventByTag = (tag: string): Event | undefined => {
    return eventData.find((item: Event) => item.tag === tag);
  };

  const getEventCount = (): number => eventData.length;

  return { getEventData, getEventByTag, getEventCount };
}
