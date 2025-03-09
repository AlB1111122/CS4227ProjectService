import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useNewEventProcessFormData from "../../../hooks/useNewEventProcessFormData";
import useFileUpload from "../../../hooks/useFileUpload";
import useSubmitEvent from "../../../hooks/posts/useNewEvent";

const NewEventForm = ({ timelineId }: { timelineId: number | undefined }) => {
  const { selectedFiles, handleFileChange } = useFileUpload();
  const { formData, handleChange } = useNewEventProcessFormData({
    start_date: "",
    end_date: "",
    name: "",
    description: "",
    financial_impact: "",
    document_id: 1,
    timeline: timelineId,
    type: null,
  });

  const { submitEvent, loading, error, success } = useSubmitEvent(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitEvent();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "100%",
        width: "100%",
        margin: 0,
        paddingTop: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "white",
        marginTop: 0,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Create new event
      </Typography>

      <TextField
        label="Start Date"
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />

      <TextField
        label="End Date"
        type="date"
        name="end_date"
        value={formData.end_date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        fullWidth
        required
      />

      <TextField
        label="Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        required
      />

      <TextField
        label="Financial Impact"
        type="number"
        name="financial_impact"
        value={formData.financial_impact}
        onChange={handleChange}
        fullWidth
        required
      />

      <div>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx,.txt"
        />
        <label htmlFor="fileInput">
          <Button variant="contained" component="span" fullWidth>
            Choose Document
          </Button>
        </label>

        {selectedFiles && (
          <Typography mt={2}>
            Selected File: {selectedFiles[0].name} (
            {(selectedFiles[0].size / 1024).toFixed(2)} KB)
          </Typography>
        )}
      </div>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>

      {error && <Typography color="error">{error}</Typography>}
      {success && (
        <Typography color="success.main">
          Event Created Successfully!
        </Typography>
      )}
    </Box>
  );
};

export default NewEventForm;
