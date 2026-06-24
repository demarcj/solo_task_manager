declare module '*.css';

interface TemporalInstant {
  until: (
    other: TemporalInstant,
    options: {
      largestUnit: 'hours';
      smallestUnit: 'seconds';
      roundingMode: 'floor';
    }
  ) => {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

declare const Temporal: {
  Now: {
    instant: () => TemporalInstant;
    plainDateISO: () => {
      toString: () => string;
    };
  };
};
