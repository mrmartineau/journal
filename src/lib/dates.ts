export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full'
  }).format(new Date(date));
};
export const formatDateTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(date));
};
