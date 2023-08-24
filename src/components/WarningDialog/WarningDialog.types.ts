export type WarningDialogProps = {
    openDialog: boolean;
    title: string;
    description: string;
    cancelBtnText: string;
    confirmBtnText: string;
    handleCancel: React.MouseEventHandler<HTMLButtonElement>;
    handleConfirm: React.MouseEventHandler<HTMLButtonElement>;
}