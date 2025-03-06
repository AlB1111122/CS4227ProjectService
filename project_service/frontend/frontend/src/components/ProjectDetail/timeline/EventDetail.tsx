import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Event } from "../../../types";
import { AttachFile } from "@mui/icons-material";
import EventEditForm from "./EventEditForm";

interface DetailCardProps {
  editPermission: boolean | undefined;
  event: Event;
}

const EventDetail: React.FC<DetailCardProps> = ({
  editPermission,
  event,
}: {
  event: Event;
  editPermission: boolean | undefined;
}) => {
  const formattedFinancialImpact = new Intl.NumberFormat("ie-IE", {
    style: "currency",
    currency: "EUR",
  }).format(event.financial_impact);

  return (
    <div>
      <Card
        sx={{
          mx: "auto",
          boxShadow: 3,
          borderRadius: 3,
          marginBottom: 2,
        }}
      >
        <CardHeader
          title={event.name}
          titleTypographyProps={{ variant: "h5", fontWeight: "bold" }}
          sx={{ backgroundColor: "#f5f5f5", padding: 2, textAlign: "center" }}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {event.description}
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2} margin={0} maxWidth={"100%"}>
            <Grid item xs={6} padding={1}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                padding={1}
              >
                Start Date
              </Typography>
              <Typography variant="body1" padding={1}>
                {event.start_date}
              </Typography>
            </Grid>
            <Grid item xs={6} padding={1}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                padding={1}
              >
                End Date
              </Typography>
              <Typography variant="body1" padding={1}>
                {event.end_date}
              </Typography>
            </Grid>
            <Grid item xs={6} padding={1}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                padding={1}
              >
                Created At
              </Typography>
              <Typography variant="body1" padding={1}>
                {event.created_at}
              </Typography>
            </Grid>
            <Grid item xs={6} padding={1}>
              <Typography variant="subtitle2" color="text.secondary">
                Financial Impact
              </Typography>
              <Typography variant="body1">
                {formattedFinancialImpact}
              </Typography>
            </Grid>
            {event.document_id && (
              <>
                <Button
                  variant="contained"
                  startIcon={<AttachFile />}
                  href={`https://gitlab.com/c2842/semester-8/cs4227_project/group-work/-/tree/main/prototype?ref_type=heads}`}
                  target="_blank"
                  fullWidth
                  sx={{ fontSize: 16 }}
                >
                  View related documents (not integrated)
                </Button>
              </>
            )}
          </Grid>
        </CardContent>
      </Card>
      {editPermission ? <EventEditForm event={event} /> : null}
    </div>
  );
};

export default EventDetail;
