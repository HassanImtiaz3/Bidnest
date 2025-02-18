import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const back = () => {
  return (
    <>
      <Box position="absolute" top={20} left={20}>
        <Link to="/">
          <ArrowLeft size={32} />
        </Link>
      </Box>
    </>
  );
};

export default back;
