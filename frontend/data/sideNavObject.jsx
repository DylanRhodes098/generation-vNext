export const SideNavData = [
  {
    key: 'grp',
    label: 'Dashboard',
    type: 'group',
    children: [
      { key: '13', label: 'Home', path: "" },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'sub1',
    label: 'Spaces',
    type: 'group',
    children: [
      {
        key: 'sub2',
        label: 'Navigation Two',
        children: [
          { key: '5', label: 'Option 5' },
          { key: '6', label: 'Option 6' },
          {
            key: 'sub3',
            label: 'Submenu',
            children: [
              { key: '7', label: 'Option 7' },
              { key: '8', label: 'Option 8' },
            ],
          },
        ],
      },

    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

export const SideNavRoutes = {
  '13': '/',           // Home
  '5': '/option-5',
  '6': '/option-6',
  '7': '/option-7',
  '8': '/option-8',
  '9': '/option-9',
  '10': '/option-10',
  '11': '/option-11',
  '12': '/option-12',
};