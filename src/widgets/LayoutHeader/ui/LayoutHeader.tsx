import { AppBar, Toolbar, Typography } from "@mui/material";

export const LayoutHeader = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LayoutHeader
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
