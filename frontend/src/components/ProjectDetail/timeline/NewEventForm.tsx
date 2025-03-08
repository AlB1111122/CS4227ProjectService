import React, { useState } from "react";
import { API_SERVER } from "../../../consts";
import { Box, Button, TextField, Typography } from "@mui/material";

const NewEventForm = ({ timelineId }: { timelineId: number | undefined }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);

  const handleFileChange = (e: { target: { files: any } }) => {
    const files = e.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    name: "",
    description: "",
    financial_impact: "",
    document_id: 1,
    timeline: timelineId,
    type: null,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      financial_impact: formData.financial_impact,
    };

    try {
      const response = await fetch(API_SERVER + "event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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

        {selectedFiles && ( //not integrated with doc service, does nothing
          <Typography mt={2}>
            Selected File: {selectedFiles[0].name} (
            {(selectedFiles[0].size / 1024).toFixed(2)} KB)
          </Typography>
        )}
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default NewEventForm;
