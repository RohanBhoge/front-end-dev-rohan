import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import type { Column } from './DataTable';

// --- MOCK DATA ---
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
}

const mockData: User[] = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', age: 32, status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', age: 28, status: 'inactive' },
  { id: 3, name: 'Sam Brown', email: 'sam.brown@example.com', age: 45, status: 'active' },
  { id: 4, name: 'Emily White', email: 'emily.white@example.com', age: 22, status: 'active' },
  { id: 5, name: 'Chris Green', email: 'chris.green@example.com', age: 39, status: 'inactive' },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'status', title: 'Status', dataIndex: 'status' },
];

// --- STORYBOOK META ---
const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// --- STORIES ---
export const Default: Story = {
  args: {
    data: mockData,
    columns: columns,
  },
};

export const Selectable: Story = {
  args: {
    ...Default.args,
    selectable: true,
    onRowSelect: (selectedRows) => console.log('Selected Rows:', selectedRows),
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    loading: true,
    data: [], // Pass empty array in loading state
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [], // Pass empty array to show empty state
  },
};