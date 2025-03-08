import React, { useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Event, Timeline_t } from "../../../types";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Stack from "@mui/material/Stack";
import TimelineElement from "./TimelineElement";
import EventDetail from "./EventDetail";

interface TimelinePanelProps {
  timeline: Timeline_t | undefined;
  events: Event[] | undefined;
  editPermission: boolean | undefined;
}

const TimelinePanel: React.FC<TimelinePanelProps> = ({
  timeline,
  events,
  editPermission,
}: {
  timeline: Timeline_t | undefined;
  events: Event[] | undefined;
  editPermission: boolean | undefined;
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  return (
    <Stack
      direction="row"
      sx={{
        boxSizing: "border-box",
        maxHeight: "50vh",
      }}
    >
      <Card
        sx={{
          width: "50%",
          padding: 0,
          flexGrow: 1,
          flexDirection: "column",
          overflow: "hidden",
          overflowY: "scroll", // Enable vertical scrolling when
        }}
      >
        <Box>
          <Timeline position="alternate-reverse">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                Start: {timeline?.timeline_start}
              </TimelineContent>
            </TimelineItem>
            {events?.map((event) => (
              <TimelineElement
                key={event.id}
                event={event}
                onSelect={setSelectedEvent}
              />
            ))}

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>

              {timeline?.timeline_end != "9999-12-31" ? (
                <TimelineContent>End: {timeline?.timeline_end}</TimelineContent>
              ) : (
                <TimelineContent></TimelineContent>
              )}
            </TimelineItem>
          </Timeline>
        </Box>
      </Card>
      <Card
        sx={{
          width: "50%",
          margin: 0,
          padding: 0,
          flexGrow: 1,
          flexDirection: "column",
          overflow: "hidden",
          overflowY: "scroll", // Enable vertical scrolling when
        }}
      >
        <CardContent>
          {selectedEvent ? (
            <EventDetail
              event={selectedEvent}
              editPermission={editPermission}
            />
          ) : (
            <Typography>Select an event to view details</Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default TimelinePanel;
