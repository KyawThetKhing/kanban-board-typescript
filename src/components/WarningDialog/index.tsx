import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function WarningDialog({
  openDialog,
  title,
  description,
  cancelBtnText,
  confirmBtnText,
  handleCancel,
  handleConfirm,
}: {
  openDialog: boolean;
  title: string;
  description: string;
  cancelBtnText: string;
  confirmBtnText: string;
  handleCancel: () => void;
  handleConfirm: () => void;
}) {
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
              color: "#e4ebfa",
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
            }}
          >
            {cancelBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
