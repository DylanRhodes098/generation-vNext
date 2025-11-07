import React from 'react';
import { Space, Table, Tag, Switch } from 'antd';

export const columns = (onClaimMember) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Join Date',
    dataIndex: 'joinDate',
    key: 'joinDate',
    render: (date) => date ? new Date(date).toLocaleDateString() : '-',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status) => (
      <Tag color={status === 'Active' ? 'green' : 'orange'}>
        {status?.toUpperCase() || 'INACTIVE'}
      </Tag>
    ),
  },
  {
    title: 'Claim',
    key: 'claim',
    render: (_, record) => (
      <Switch
        checked={record.status === 'Active'}
        disabled={record.status === 'Active'}
        onChange={(checked) => {
          if (checked && onClaimMember) {
            onClaimMember(record);
          }
        }}
      />
    ),
  },
];

export function mapMembersToTableData(members = []) {
  return members.map((m) => ({
    key: m.id,
    id: m.id,
    name: m.fullName || m.name,
    email: m.email,
    phone: m.phone,
    joinDate: m.joinDate,
    status: m.isActive ? 'Active' : 'Inactive',
    gymId: m.gymId,
  }));
}

