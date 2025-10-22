import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
const FrontPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gridTemplateColumns="repeat(8, 1fr)"
      gap="20px"
      backgroundColor={colors.primary[400]}
    >
      <Box
        gridColumn="span 5"
        gridRow="1 / -1"
        p="30px"
        backgroundColor={colors.primary[400]}
      >
        {/* Slanted background layer */}
              <div
        style={{
          backgroundImage: "url('/assets/figma-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "rotate(-40deg)",
          // filter: "grayscale(100%)", // remove color
          height: "180%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: "-20%",
        }}
      />
      </Box>
      {/* Foreground content */}
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        p="30px"
      >
        <Typography variant="h1" fontWeight="600" color={colors.grey[100]}>
          Full Charts
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          color={colors.greenAccent[500]}
        >
          Multiple card designs with graphic components
        </Typography>
        <div
          className="relative shadow-lg ring-2 ring-white/40 rounded-full overflow-hidden"
          style={{
            width: "60px", // 👈 controls size of circle
            height: "60px",
            borderRadius: "50%",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          <img
            src="/assets/figma-avatar@4x.png"
            alt="Avatar"
            style={{
              minWidth: "100%", // ensures width fills container
              minHeight: "100%", // ensures height fills container
              objectFit: "cover",
              display: "block", // removes any extra space below the image
              borderRadius: "0%", // ensures the image is circular
            }}
          />
        </div>
        <Box className="flex flex-col items-end" sx={{ pt: "20px" }}>
          <Typography variant="h5" fontWeight="500" color={colors.grey[100]}>
            BUSHRA C C
          </Typography>
          <Typography variant="h5" fontWeight="500" color={colors.grey[100]}>
            UX/UI Designer
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FrontPage;
