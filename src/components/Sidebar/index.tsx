import { useState } from "react";
import { Box, Switch, Typography, Dialog, DialogContent } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

//local imports
import { useCustomTheme, useThemeUpdate } from "../../theme/theme";
import { BoardForm } from "../BoardForm";
import { selectKanbanBoards } from "redux/kanban/kanbanSelectors";

import { ReactComponent as DarkLogoIcon } from "assets/logo-dark.svg";
import { ReactComponent as LightLogoIcon } from "assets/logo-light.svg";
import { ReactComponent as BoardIcon } from "assets/icon-board.svg";
import { ReactComponent as DarkThemeIcon } from "assets/icon-dark-theme.svg";
import { ReactComponent as LightThemeIcon } from "assets/icon-light-theme.svg";
import { ReactComponent as HideSidebarIcon } from "assets/icon-hide-sidebar.svg";

import {
  Container,
  RouteContainer,
  RouteTitle,
  ListContainer,
  List,
  Footer,
  ThemeContainer,
  SidebarToggle,
  NewBoardContainer,
} from "./Sidebar.styles";

const Sidebar = ({
  toggleDrawer,
  toggleDrawerMobile,
}: {
  toggleDrawer: () => void;
  toggleDrawerMobile: () => void;
}) => {
  const theme = useCustomTheme();
  const toggleMode = useThemeUpdate();
  const kanbanBoards = useSelector(selectKanbanBoards);
  const [openAddBoardFormDialog, setOpenAddBoardFormDialog] =
    useState<boolean>(false);

  const handleAddBoardFormDialogOpen = () => {
    toggleDrawerMobile();
    setOpenAddBoardFormDialog(true);
  };
  const handleAddBoardFormDialogClose = () => setOpenAddBoardFormDialog(false);
  return (
    <Container>
      <RouteContainer>
        <Box
          sx={{
            padding: "20px 10px",
          }}
        >
          {theme?.palette.mode === "dark" ? (
            <LightLogoIcon />
          ) : (
            <DarkLogoIcon />
          )}
        </Box>
        <RouteTitle>All Board ({kanbanBoards.length})</RouteTitle>
        <ListContainer>
          {kanbanBoards.map((kanban: any) => (
            <List key={kanban.id} onClick={toggleDrawerMobile}>
              <NavLink
                to={`kanban/${kanban.id}`}
                style={({ isActive }) => {
                  return {
                    width: "90%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "10px",
                    textDecoration: "none",
                    borderTopRightRadius: "20px",
                    padding: "10px",
                    borderBottomRightRadius: "20px",
                    fontWeight: isActive ? "bold" : "",
                    backgroundColor: isActive ? "#635fc7" : "inherit",
                    color: isActive ? "white" : "#828fa3",
                  };
                }}
              >
                <BoardIcon fill="#828FA3" />
                <Box
                  sx={{
                    color: "inherit",
                  }}
                >
                  {kanban.title}
                </Box>
              </NavLink>
            </List>
          ))}
          <NewBoardContainer onClick={handleAddBoardFormDialogOpen}>
            <BoardIcon fill="#635fc7" />
            <Box>+ Create New Board</Box>
          </NewBoardContainer>
        </ListContainer>
      </RouteContainer>
      <Footer>
        <ThemeContainer>
          <LightThemeIcon />
          <Switch
            checked={theme?.palette.mode === "dark"}
            color="primary"
            onChange={toggleMode}
            inputProps={{ "aria-label": "controlled" }}
          />
          <DarkThemeIcon />
        </ThemeContainer>
        <SidebarToggle onClick={toggleDrawer}>
          <HideSidebarIcon />
          <Typography>Hide Sidebar</Typography>
        </SidebarToggle>
      </Footer>

      {/**Add Board Form Dailog */}
      <Dialog
        onClose={handleAddBoardFormDialogClose}
        open={openAddBoardFormDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogContent>
          <BoardForm handleClose={handleAddBoardFormDialogClose} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Sidebar;
