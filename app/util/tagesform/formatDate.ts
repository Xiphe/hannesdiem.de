import { format } from 'date-fns';

export default function formatTagesformFeedDate(date: Date | number) {
  return format(date, 'iii, dd MMM yyyy HH:mm:ss OOO');
}
