export const SideNavData = [
  {
    key: 'grp-main',
    label: 'Main',
    type: 'group',
    children: [
      { key: 'home', label: 'Home', path: '/' },
      { key: 'member-directory', label: 'Global Members', path: '/Globalmembers' },
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'grp-crm',
    label: 'My CRM',
    type: 'group',
    children: [
      { key: 'my-members', label: 'My Members', path: '/crm/members' },        // private CRM list
      { key: 'segments', label: 'Segments', path: '/crm/segments' },           // tags + saved filters
      { key: 'calendar', label: 'Calendar', path: '/crm/calendar' },           // availability + bookings
      { key: 'forms', label: 'Intake forms', path: '/crm/forms' },             // member intake forms
      { key: 'emails', label: 'Emails', path: '/crm/emails' },                 // one-off emails
      { key: 'sequences', label: 'Email sequences', path: '/crm/sequences' },  // drips
    ],
  },
  {
    type: 'divider',
  },
  {
    key: 'grp-analytics',
    label: 'Analytics',
    type: 'group',
    children: [
      { key: 'analytics-overview', label: 'Overview', path: '/analytics' },
    ],
  },
];


export const SideNavRoutes = {
  'home': '/',           // Home
  'member-directory': '/GlobalMembers',            // Global Members
  'my-members': '/myMembers',      // My CRM
};