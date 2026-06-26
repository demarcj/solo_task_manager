
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { is_start } from "../../hooks/timer_hooks";
import { useSignals } from "@preact/signals-react/runtime";

interface StartPromptProps {
  open: boolean;
  onClose: () => void;
};

export const StartPrompt = ({ open, onClose }: StartPromptProps) => {
  useSignals();
  const on_close = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
    if(reason === 'backdropClick'){
      return;
    }
    onClose();
  };

  const start_timer = (set_is_start: boolean) => {
    is_start.value = set_is_start;
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => on_close(event, reason)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Ready to begin?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Start your session when you are ready. The timer and workspace will stay available behind
          this prompt.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => start_timer(true)} variant="contained" autoFocus>
          Start Timer
        </Button>
        <Button onClick={() => start_timer(false)} variant="contained" color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
