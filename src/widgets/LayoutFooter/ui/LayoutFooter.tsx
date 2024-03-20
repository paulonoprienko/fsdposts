import { AppBar, Toolbar, Typography } from "@mui/material";

export const LayoutFooter = () => {
  return (
    <AppBar
      component="footer"
      position="static"
      sx={{
        background: "#eff4ff",
        flex: "0 0 auto",
        boxShadow: `0px -2px 4px -1px rgba(0,0,0,0.02),
          0px -4px 5px 0px rgba(0,0,0,0.14),
          0px -1px 10px 0px rgba(0,0,0,0.12)`,
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ color: "#000" }}>
          LayoutBottom
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
