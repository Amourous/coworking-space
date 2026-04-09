export const C = {
  SPACE_TYPES: {
    hot_desk: 'Hot Desk',
    dedicated_desk: 'Dedicated Desk',
    quiet_booth: 'Quiet Booth',
    meeting_room: 'Meeting Room',
    collab_room: 'Collab Room',
    event_room: 'Event Room',
    lounge: 'Lounge'
  },
  CAFETERIA_CATEGORIES: {
    coffee: 'Coffee',
    tea: 'Tea',
    cold_drinks: 'Cold Drinks',
    sandwiches: 'Sandwiches',
    wraps: 'Wraps',
    salads: 'Salads',
    pastries: 'Pastries',
    snacks: 'Snacks',
    desserts: 'Desserts'
  },
  RESERVATION_STATUS: {
    upcoming: 'Upcoming',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled'
  }
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
