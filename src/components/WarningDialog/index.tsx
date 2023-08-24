import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { WarningDialogProps } from "./WarningDialog.types";

export default function WarningDialog({
  openDialog,
  title,
  description,
  cancelBtnText,
  confirmBtnText,
  handleCancel,
  handleConfirm,
}: WarningDialogProps) {
  // const [open, setOpen] = React.useState(openDialog);

  // const onCancel = () => {
  //   setOpen(false);
  //   handleCancel();
  // };

  // const onConfirm = () => {
  //   setOpen(false);
  //   handleConfirm();
  // };

  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        sx={{
          paper: {
            backgroundColor: "background.default",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          variant="h6"
          sx={{
            color: "error.main",
            fontWeight: 600,
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: "text.primary",
            }}
          >
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            padding: "20px",
          }}
        >
          <Button
            onClick={handleConfirm}
            sx={{
              width: "50%",
              backgroundColor: "error.main",
              color: "#ffffff",
              fontWeight: 600,
              borderRadius: "20px",
              "&:hover": {
                backgroundColor: "error.main",
                opacity: "0.6",
              },
            }}
          >
            {confirmBtnText}
          </Button>
          <Button
            onClick={handleCancel}
            sx={{
              width: "50%",
              borderRadius: "20px",
              color: "text.main",
              backgroundColor: "text.disabled",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "text.disabled",
                opacity: "0.6",
              },
            }}
          >
            {cancelBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
