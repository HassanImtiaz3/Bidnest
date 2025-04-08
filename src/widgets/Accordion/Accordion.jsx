import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AccordionExpandDefault() {
  return (
    <div className="mt-4 mb-4">
      <Typography variant="h5" align="left" sx={{ mb: 2 }}>
        Frequently Asked Questions
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography component="span">My post is not showing. What should I do?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left' }}>
          <Typography>
            Ensure all fields are filled before submitting; posts need admin approval and may appear under "My Drafts" if not published.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">How can I submit my bid?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left' }}>
          <Typography>
            Go to the tender listing, click “Submit Bid” on the desired tender, ensure eligibility, and attach all required documents.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          <Typography component="span">Why is my bid submission failing?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left' }}>
          <Typography>
            Check for missing mandatory fields, file size limits, sufficient bid credits, and ensure a stable internet connection.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4-content"
          id="panel4-header"
        >
          <Typography component="span">How do I get updates about bid results?</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left' }}>
          <Typography>
            Bid results are available under “My Bids” - “Bid Status” once the evaluation is complete. You will receive a notification if you win or lose the bid.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
