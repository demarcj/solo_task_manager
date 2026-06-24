import {
  Box,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { is_start } from "../../hooks/timer_hooks";

export const Timer = () => {
  return (
    <Box className="time_box">
      <Paper className="quote-panel" elevation={0}>
        <Typography variant="h2">Time </Typography>
        <Divider />
        <Typography variant="body1">
          { is_start.value ? `time start` : `-- : -- : --` }
        </Typography>
      </Paper>
    </Box>
  )
}