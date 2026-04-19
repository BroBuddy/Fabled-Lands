import events_001 from "../data/events_001_100.json";
import events_101 from "../data/events_101_200.json";
import events_201 from "../data/events_201_300.json";
import events_301 from "../data/events_301_400.json";
import events_401 from "../data/events_401_500.json";
import type { Event, EventItem } from "../types/EventType";

const typedEvents001 = events_001 as Event[];
const typedEvents101 = events_101 as Event[];
const typedEvents201 = events_201 as Event[];
const typedEvents301 = events_301 as Event[];
const typedEvents401 = events_401 as Event[];

export function useEventService() {
  const eventData: Event[] = [
    ...typedEvents001,
    ...typedEvents101,
    ...typedEvents201,
    ...typedEvents301,
    ...typedEvents401,
  ];

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
