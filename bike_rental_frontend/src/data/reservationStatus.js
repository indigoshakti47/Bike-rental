export const statuses = [
  { text: 'Received', value: 'reserved', color: 'green', icon: 'fas fa-grin-hearts' },
  { text: 'Canceled', value: 'canceled', color: 'red', icon: 'fas fa-heart-broken' },
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
