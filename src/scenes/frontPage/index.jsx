import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { Link } from "react-router-dom";

const shortcuts = [
  {
    title: "Analytics",
    description: "Track revenue, activity, and performance at a glance.",
    icon: <InsightsOutlinedIcon />,
    to: "/dashboard",
    tint: "#eef0ff",
    color: "#5869e8",
  },
  {
    title: "People & teams",
    description: "Keep your contacts and team information organized.",
    icon: <Groups2OutlinedIcon />,
    to: "/team",
    tint: "#e8f6ef",
    color: "#23845b",
  },
  {
    title: "Your schedule",
    description: "See upcoming events and keep the week on track.",
    icon: <CalendarMonthOutlinedIcon />,
    to: "/calendar",
    tint: "#fff3e8",
    color: "#bd6b28",
  },
];

const FrontPage = () => (
  <Box sx={{ maxWidth: 1440, mx: "auto", p: { xs: 2, sm: 3, lg: 4 } }}>
    <Box
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.35fr 0.65fr" },
        alignItems: "center",
        gap: 3,
        minHeight: { md: 350 },
        p: { xs: 3, sm: 5, lg: 6 },
        overflow: "hidden",
        border: "1px solid #e4e8ff",
        borderRadius: 6,
        background:
          "radial-gradient(circle at 88% 15%, rgba(151, 164, 255, .24), transparent 28%), linear-gradient(120deg, #ffffff 0%, #f2f4ff 100%)",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 620 }}>
        <Chip
          label="YOUR WORKSPACE"
          size="small"
          sx={{
            mb: 2.5,
            bgcolor: "#e9ecff",
            color: "#4355d1",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        />
        <Typography
          component="h1"
          sx={{
            mb: 1.5,
            color: "#17212f",
            fontSize: { xs: 34, sm: 46, lg: 54 },
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: "-0.045em",
          }}
        >
          A clearer view of your work.
        </Typography>
        <Typography
          sx={{ maxWidth: 510, color: "#667085", fontSize: 17, lineHeight: 1.7 }}
        >
          Welcome back, Bushra. Bring your team, insights, and day-to-day
          operations together in one calm, focused space.
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3.5 }}>
          <Button
            component={Link}
            to="/dashboard"
            variant="contained"
            endIcon={<ArrowForwardRoundedIcon />}
            sx={{
              px: 2.5,
              py: 1.2,
              borderRadius: 2.5,
              bgcolor: "#5869e8",
              boxShadow: "0 8px 18px rgba(88, 105, 232, .22)",
              textTransform: "none",
              fontWeight: 700,
              "&:hover": { bgcolor: "#4355d1" },
            }}
          >
            Open dashboard
          </Button>
          <Button
            component={Link}
            to="/learn-react"
            variant="text"
            sx={{
              px: 2,
              borderRadius: 2.5,
              color: "#344054",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Explore the learning hub
          </Button>
        </Stack>
      </Box>

      <Box
        sx={{
          position: "relative",
          display: "grid",
          placeItems: "center",
          minHeight: 220,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 230,
            height: 230,
            borderRadius: "50%",
            bgcolor: "rgba(88, 105, 232, .09)",
          }}
        />
        <Card
          elevation={0}
          sx={{
            position: "relative",
            width: "min(100%, 310px)",
            p: 1,
            border: "1px solid rgba(255,255,255,.9)",
            borderRadius: 4,
            boxShadow: "0 22px 55px rgba(51, 64, 128, .12)",
            transform: { md: "rotate(2deg)" },
          }}
        >
          <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar
                src="/assets/figma-avatar@4x.png"
                alt="Bushra C C"
                sx={{ width: 52, height: 52, border: "3px solid #eef0ff" }}
              />
              <Box>
                <Typography sx={{ color: "#17212f", fontWeight: 700 }}>
                  Bushra C C
                </Typography>
                <Typography sx={{ color: "#667085", fontSize: 13 }}>
                  Front End Developer
                </Typography>
              </Box>
            </Stack>
            <Box
              sx={{
                mt: 2.5,
                p: 2,
                borderRadius: 3,
                bgcolor: "#f7f8fc",
              }}
            >
              <Typography sx={{ color: "#667085", fontSize: 12 }}>
                YOUR SPACE, AT A GLANCE
              </Typography>
              <Typography sx={{ mt: 0.6, color: "#17212f", fontSize: 17, fontWeight: 700 }}>
                Everything in its place.
              </Typography>
              <Box
                sx={{
                  mt: 1.5,
                  height: 7,
                  borderRadius: 99,
                  bgcolor: "#e5e8f3",
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: "72%",
                    height: "100%",
                    borderRadius: 99,
                    background: "linear-gradient(90deg, #5869e8, #9aa6ff)",
                  },
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>

    <Box sx={{ mt: { xs: 4, sm: 5 } }}>
      <Typography
        component="h2"
        sx={{ color: "#17212f", fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em" }}
      >
        Your workspace
      </Typography>
      <Typography sx={{ mt: 0.5, mb: 2.5, color: "#667085", fontSize: 15 }}>
        Pick up where you left off.
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
          gap: 2,
        }}
      >
        {shortcuts.map((shortcut) => (
          <Card
            key={shortcut.title}
            component={Link}
            to={shortcut.to}
            elevation={0}
            sx={{
              display: "block",
              color: "inherit",
              textDecoration: "none",
              border: "1px solid #e8edf4",
              borderRadius: 3.5,
              transition: "transform 180ms ease, box-shadow 180ms ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 12px 28px rgba(23, 33, 47, .08)",
              },
            }}
          >
            <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 44,
                    height: 44,
                    color: shortcut.color,
                    bgcolor: shortcut.tint,
                    borderRadius: 2.5,
                    "& svg": { fontSize: 23 },
                  }}
                >
                  {shortcut.icon}
                </Box>
                <ArrowForwardRoundedIcon sx={{ color: "#98a2b3", fontSize: 20 }} />
              </Stack>
              <Typography sx={{ mt: 2, color: "#17212f", fontSize: 17, fontWeight: 700 }}>
                {shortcut.title}
              </Typography>
              <Typography sx={{ mt: 0.5, color: "#667085", fontSize: 14, lineHeight: 1.6 }}>
                {shortcut.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  </Box>
);

export default FrontPage;
