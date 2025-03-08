import React from "react";
import { Event } from "../../../types";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

interface TimelineEventProps {
  event: Event;
  onSelect: (event: Event) => void;
}

const TimelineElement: React.FC<TimelineEventProps> = ({ event, onSelect }) => {
  return (
    <TimelineItem
      onClick={() => onSelect(event)}
      className="cursor-pointer hover:bg-gray-100 p-2 rounded"
    >
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{event.name}</TimelineContent>
    </TimelineItem>
  );
};

export default TimelineElement;
