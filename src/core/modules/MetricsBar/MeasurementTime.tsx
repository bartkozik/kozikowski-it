interface MeasurementTimeProps {
  readonly timestamp: number | null | undefined;
  readonly fallback: string;
}

export function MeasurementTime({ timestamp, fallback }: MeasurementTimeProps) {
  if (timestamp === null || timestamp === undefined) return fallback;
  const date = new Date(timestamp);
  return <time dateTime={date.toISOString()}>{date.toLocaleString()}</time>;
}
