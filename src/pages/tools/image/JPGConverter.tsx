import React, { useState } from "react";
import { Box, ToggleButtonGroup, ToggleButton, Paper } from "@mui/material";
import JPGToPNG from "./JPGToPNG";
import PNGToJPG from "./PNGToJPG";

const JPGConverter: React.FC = () => {
  const [mode, setMode] = useState<"jpg2png" | "png2jpg">("jpg2png");

  return (
    <Box sx={{ maxWidth: 420, mx: "auto", mt: 6 }}>
      <Paper elevation={4} sx={{ p: 2, mb: 2, textAlign: "center" }}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_, val) => val && setMode(val)}
        >
          <ToggleButton value="jpg2png">JPG إلى PNG</ToggleButton>
          <ToggleButton value="png2jpg">PNG إلى JPG</ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      {mode === "jpg2png" ? <JPGToPNG /> : <PNGToJPG />}
    </Box>
  );
};

export default JPGConverter;
