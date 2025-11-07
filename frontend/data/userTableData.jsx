import React from 'react';
import { Space, Table, Tag, Input } from 'antd';

const { TextArea } = Input;

export const columns = (onUpdateNotes) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Member ID',
    dataIndex: 'memberId',
    key: 'memberId',
    width: 150,
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    key: 'notes',
    render: (text, record) => (
      <TextArea
        rows={2}
        defaultValue={text || ''}
        placeholder="Add notes..."
        onBlur={(e) => {
          if (onUpdateNotes && e.target.value !== text) {
            onUpdateNotes(record.id, e.target.value);
          }
        }}
      />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => {
      const colorMap = {
        'new': 'blue',
        'engaged': 'cyan',
        'consult_booked': 'orange',
        'client': 'green',
        'lost': 'red',
      };
      return (
        <Tag color={colorMap[status] || 'default'}>
          {status?.toUpperCase() || 'NEW'}
        </Tag>
      );
    },
  },
  {
    title: 'Last Contacted',
    dataIndex: 'lastContactedAt',
    key: 'lastContactedAt',
    render: (date) => date ? new Date(date).toLocaleDateString() : '-',
  },
  {
    title: 'Next Action',
    dataIndex: 'nextActionAt',
    key: 'nextActionAt',
    render: (date) => date ? new Date(date).toLocaleDateString() : '-',
  },
];

export function mapPtMembersToTableData(ptMembers = []) {
  return ptMembers.map((pm) => ({
    key: pm.id,
    id: pm.id,
    memberId: pm.memberId,
    notes: pm.notes,
    status: pm.status || 'new',
    lastContactedAt: pm.lastContactedAt,
    nextActionAt: pm.nextActionAt,
    gymId: pm.gymId,
    ptId: pm.ptId,
  }));
}

