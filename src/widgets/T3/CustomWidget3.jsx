import React from "react";
import { Box, Stack, Typography, SvgIcon, useTheme, useMediaQuery } from "@mui/material";
import OutlineButton from "../OutlinedButton/OutlinedButton";

function TrophyIcon(props) {
  return (
    <SvgIcon {...props} viewBox="150 50 39 36">
      <g>
        <path
          d="M156,50c-1.412,0-2.871,0.533-4.031,1.547C150.809,52.561,150,54.119,150,56c0,1.594,0.668,2.953,1.5,4.031
        s1.84,1.928,2.766,2.766c1.852,1.676,3.234,3.053,3.234,5.203c0,0.229-0.223,0.779-0.516,1.219
        c-0.293,0.439-0.562,0.703-0.562,0.703l2.156,2.109c0,0,0.481-0.48,0.938-1.172c0.393-0.592,0.82-1.354,0.937-2.344
        c0.17,0.486,0.334,0.984,0.516,1.453c1.031,2.66,2.221,5.045,3.562,6.844c0.486,0.656,0.99,1.236,1.547,1.734
        c-3.1,0.223-5.578,2.801-5.578,5.953V86h18v-1.5c0-3.188-2.525-5.777-5.672-5.953c0.563-0.498,1.102-1.084,1.594-1.734
        c1.348-1.793,2.519-4.184,3.562-6.844c0.193-0.498,0.381-1.031,0.563-1.547c0.1,1.031,0.533,1.828,0.937,2.437
        c0.457,0.691,0.938,1.172,0.938,1.172l2.156-2.109c0,0-0.269-0.264-0.562-0.703S181.5,68.229,181.5,68
        c0-2.15,1.383-3.527,3.234-5.203c0.926-0.838,1.934-1.688,2.766-2.766S189,57.594,189,56c0-1.881-0.809-3.439-1.969-4.453
        C185.871,50.533,184.412,50,183,50c-1.916,0-3.229,0.873-3.938,1.5h-19.125C159.229,50.873,157.916,50,156,50z M156,53
        c0.709,0,1.166,0.223,1.5,0.422c0.041,3.059,0.568,6.527,1.406,9.937c-0.797-1.078-1.793-1.975-2.672-2.766
        c-0.949-0.856-1.816-1.646-2.391-2.391S153,56.814,153,56c0-1.049,0.41-1.699,0.984-2.203C154.559,53.293,155.35,53,156,53z
         M183,53c0.65,0,1.441,0.293,2.016,0.797C185.59,54.301,186,54.951,186,56c0,0.814-0.27,1.459-0.844,2.203
        c-0.574,0.744-1.441,1.535-2.391,2.391c-0.896,0.809-1.91,1.74-2.719,2.859c0.861-3.434,1.412-6.932,1.453-10.031
        C181.834,53.223,182.291,53,183,53z M160.688,54.5h17.625c-0.229,4.459-1.383,9.896-3.141,14.391
        c-0.973,2.484-2.098,4.641-3.188,6.094s-2.086,2.016-2.531,2.016c-0.439,0-1.4-0.562-2.484-2.016
        c-1.084-1.453-2.221-3.604-3.188-6.094C162.035,64.391,160.916,58.936,160.688,54.5z M168,59v7.5h3V59H168z M166.5,81.5h6
        c1.078,0,1.816,0.662,2.344,1.5h-10.688C164.684,82.162,165.422,81.5,166.5,81.5z"
        ></path>
      </g>
    </SvgIcon>
  );
}

export default function WinSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ py: 5, backgroundColor: theme.palette.primary.main }}>
      <Box sx={{ width: "90%", mx: "auto" }}>
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          sx={{ mt: 3 }}
          alignItems={isMobile ? "center" : "flex-start"}
        >
          <Box sx={{ flex: isMobile ? "none" : 0.7, textAlign: isMobile ? "center" : "left" }}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              justifyContent={isMobile ? "center" : "flex-start"}
            >
              <TrophyIcon sx={{ width: 50, height: 80 }} />
              <Typography variant="h4" component="h2" fontWeight="bold">
                Win More New Business
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              flex: isMobile ? "none" : 0.3,
              width: isMobile ? "100%" : "auto",
              textAlign: isMobile ? "center" : "right",
            }}
          >
            <OutlineButton className='buttonDesign' fullWidth={isMobile}>Register Now</OutlineButton>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
