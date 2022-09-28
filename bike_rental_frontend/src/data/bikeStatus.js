export const statuses = [
  { text: 'Available', value: 'true', color: 'green', icon: 'fas fa-grin-hearts' },
  { text: 'Not Available', value: 'false', color: 'red', icon: 'fas fa-heart-broken' },
];

export const clientStatesChanges = {
  reserved: {
    text: 'Reserved',
    status: 'reserved',
    color: 'success',
  },
  canceled: {
    text: 'Canceled',
    status: 'canceled',
    color: 'danger',
  },
};
