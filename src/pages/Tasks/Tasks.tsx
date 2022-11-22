import React, { useMemo } from 'react';
import { GridActionsCellItem, GridColumnHeaderParams, GridColumns, GridRowParams } from '@mui/x-data-grid';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import StyledDataGrid from '../../Components/StyledDataGrid';
import CustomPagination from '../../Components/Pagination';
import GetTasks from './GetTasks';
import './tasks.css';
import Content from '../../Components/Content';

function Tasks() {
  const tasksRes = GetTasks();

  const tasksData = useMemo(() =>
    tasksRes.map(t =>
    ({
      ...t,
      summary: t.summary == null ? t.description.substring(0, 47) + "..." : t.summary,
      actions: null
    })), [tasksRes]
  )

  const columns: GridColumns = [
    {
      field: 'votes', type: 'number', renderHeader: (params: GridColumnHeaderParams) => (
        <ThumbUpIcon />
      ), flex: 1, minWidth: 70, headerAlign: 'left', align: 'left'
    },
    { field: 'title', headerName: 'Title', flex: 2, headerAlign: 'left', align: 'left', minWidth: 100 },
    { field: 'category', headerName: 'Category', flex: 2, headerAlign: 'left', align: 'left' },
    { field: 'summary', headerName: 'Description', sortable: false, flex: 3, headerAlign: 'left', align: 'left', minWidth: 160 },
    { field: 'creator', headerName: 'Creator', sortable: false, flex: 1.5, headerAlign: 'left', align: 'left', minWidth: 95 },
    { field: 'date', headerName: 'Date', type: 'date', valueGetter: ({ value }) => value && new Date(value), flex: 1, minWidth: 95 },
    {
      field: 'actions', headerName: 'Actions', type: 'actions', getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          className='task-action-button'
          icon={<ThumbUpIcon />}
          onClick={() => console.log(`Like task with id ${params.id}`)}
          label="Like"
        />,
        <GridActionsCellItem
          className='task-action-button'
          icon={<VisibilityIcon />}
          onClick={() => console.log(`View task with id ${params.id}`)}
          label="View"
        />,
        <GridActionsCellItem
          className='task-action-button'
          icon={<EditIcon />}
          onClick={() => console.log(`Edit task with id ${params.id}`)}
          label="Edit"
        />,
        <GridActionsCellItem
          className='task-action-button'
          icon={<DeleteIcon />}
          onClick={() => console.log(`Delete task with id ${params.id}`)}
          label="Delete"
        />,
      ], sortable: false, flex: 1.5, minWidth: 180, headerAlign: 'center', align: 'center',
    },
  ]

  return (
    <Content name={'Tasks'}>
      <div className="button-wrapper">
        <button className="button-primary">Create</button>
      </div>
      <div className="tasks-table-wrapper">
        <StyledDataGrid
          headerHeight={70}
          rowHeight={60}
          autoPageSize
          disableColumnMenu
          disableSelectionOnClick
          columns={columns}
          rows={tasksData}
          components={{
            Pagination: CustomPagination,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'votes', sort: 'desc' }],
            },
          }}
        />
      </div>
    </Content>
  )
}

export default Tasks;