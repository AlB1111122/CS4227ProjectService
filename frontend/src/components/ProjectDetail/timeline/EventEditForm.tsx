import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { Event } from "../../../types";
import { AttachFile, Delete } from "@mui/icons-material";
import { useEventUpdate } from "../../../hooks/patches/useEventUpdate"; // Import the custom hook
import { useEventDelete } from "../../../hooks/deletes/useEventDelete"; // Import the custom hook

const EventEditForm = ({ event }: { event: Event }) => {
  const [formData, setFormData] = useState({ ...event });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getUpdatedFields = () => {
    const updatedFields: any = {};
    Object.keys(formData).forEach((key) => {
      // @ts-ignore
      if (formData[key] !== event[key]) {
        // @ts-ignore
        updatedFields[key] = formData[key];
      }
    });
    return updatedFields;
  };

  const {
    updateEvent,
    loading: updating,
    error: updateError,
  } = useEventUpdate(event.id);
  const {
    deleteEvent,
    loading: deleting,
    error: deleteError,
  } = useEventDelete(event.id);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const updatedFields = getUpdatedFields();
    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected.");
      return;
    }

    await updateEvent(updatedFields);
  };

  const onDelete = async () => {
    await deleteEvent();
  };

  return (
    <Card sx={{ mx: "auto", boxShadow: 3, borderRadius: 3, p: 2 }}>
      <CardHeader
        title="Edit Event"
        sx={{ backgroundColor: "#f5f5f5", textAlign: "center" }}
      />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Financial Impact"
                name="financial_impact"
                value={formData.financial_impact}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            startIcon={<AttachFile />}
            href="https://gitlab.com/c2842/semester-8/cs4227_project/group-work/-/tree/main/prototype?ref_type=heads"
            target="_blank"
            fullWidth
            sx={{ fontSize: 16, mt: 2 }}
          >
            New related documents (not integrated)
          </Button>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={updating}
              >
                {updating ? "Submitting..." : "Submit Changes"}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={onDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Event"}
              </Button>
            </Grid>
          </Grid>
        </form>
        {(updateError || deleteError) && <p>{updateError || deleteError}</p>}
      </CardContent>
    </Card>
  );
};

export default EventEditForm;
