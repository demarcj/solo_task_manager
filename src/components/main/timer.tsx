import {
  Box,
  Button,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { useSignals } from '@preact/signals-react/runtime';
import { effect, signal } from '@preact/signals-react';
import { is_start } from "../../hooks/timer_hooks";

const timer_storage_key = 'timer_history';

interface TimerHistoryEntry {
  timer: string;
  unformatted_time: number;
}

const seconds_since = (start_time: TemporalInstant) => {
  const duration = start_time.until(Temporal.Now.instant(), {
    largestUnit: 'hours',
    smallestUnit: 'seconds',
    roundingMode: 'floor'
  });

  return (duration.hours * 60 * 60) + (duration.minutes * 60) + duration.seconds;
};

const format_time = (total_seconds: number) => {
  const hours = Math.floor(total_seconds / 3600);
  const minutes = Math.floor((total_seconds % 3600) / 60);
  const seconds = total_seconds % 60;

  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, '0'))
    .join(' : ');
};

const get_today = () => Temporal.Now.plainDateISO().toString();

const parse_timer_seconds = (timer: string) => {
  const [hours, minutes, seconds] = timer
    .split(':')
    .map((time_part) => Number(time_part.trim()));

  if ([hours, minutes, seconds].some((time_part) => Number.isNaN(time_part))) {
    return 0;
  }

  return (hours * 60 * 60) + (minutes * 60) + seconds;
};

const read_timer_history = () => {
  const stored_timers = localStorage.getItem(timer_storage_key);
  let timers_by_date: Record<string, TimerHistoryEntry | string> = {};

  if (stored_timers) {
    try {
      const parsed_timers = JSON.parse(stored_timers) as unknown;

      if (parsed_timers && typeof parsed_timers === 'object' && !Array.isArray(parsed_timers)) {
        timers_by_date = parsed_timers as Record<string, TimerHistoryEntry | string>;
      }
    } catch {
      timers_by_date = {};
    }
  }

  return timers_by_date;
};

const get_saved_seconds_for_today = () => {
  const timer_for_today = read_timer_history()[get_today()];

  if (typeof timer_for_today === 'string') {
    return parse_timer_seconds(timer_for_today);
  }

  if (
    timer_for_today
    && typeof timer_for_today === 'object'
    && typeof timer_for_today.unformatted_time === 'number'
  ) {
    return timer_for_today.unformatted_time;
  }

  return 0;
};

const save_timer = (total_seconds: number) => {
  const today = get_today();
  const timers_by_date = read_timer_history();

  localStorage.setItem(
    timer_storage_key,
    JSON.stringify({
      ...timers_by_date,
      [today]: {
        timer: format_time(total_seconds),
        unformatted_time: total_seconds
      }
    })
  );
};

const start_time = signal<TemporalInstant | null>(null);
const saved_seconds = signal(get_saved_seconds_for_today());
const display_time = signal(saved_seconds.peek() > 0 ? format_time(saved_seconds.peek()) : '-- : -- : --');

effect(() => {
  if (!is_start.value) {
    const paused_start_time = start_time.peek();

    if (paused_start_time) {
      saved_seconds.value = saved_seconds.peek() + seconds_since(paused_start_time);
      display_time.value = format_time(saved_seconds.peek());
      save_timer(saved_seconds.peek());
    }

    start_time.value = null;
    return;
  }

  start_time.value = start_time.peek() ?? Temporal.Now.instant();

  const update_time = () => {
    const running_start_time = start_time.peek();

    if (running_start_time) {
      display_time.value = format_time(saved_seconds.peek() + seconds_since(running_start_time));
    }
  };

  update_time();

  const interval_id = window.setInterval(update_time, 1000);

  return () => window.clearInterval(interval_id);
});

effect(() => {
  if (!is_start.value) {
    return;
  }

  const warn_before_close = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = '';
  };

  window.addEventListener('beforeunload', warn_before_close);

  return () => window.removeEventListener('beforeunload', warn_before_close);
});

export const Timer = () => {
  useSignals();

  return (
    <Box className="time_box">
      <Paper className="quote-panel" elevation={0}>
        <Typography variant="h2">Time </Typography>
        <Divider />
        <Typography variant="body1" sx={{pb: `15px`}}>
          {display_time.value}
        </Typography>
        <Button 
          variant="outlined" 
          size="large"
          onClick={() => is_start.value = !is_start.value}
        >
          { is_start.value ? `Stop` : `Start` }
        </Button>
      </Paper>
    </Box>
  )
}
