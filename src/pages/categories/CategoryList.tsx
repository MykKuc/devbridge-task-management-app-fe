import React, { useMemo } from 'react';
import { GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import StyledDataGrid from '../../components/StyledDataGrid';
import CustomPagination from '../../components/Pagination';
import GetCatogories from './GetCategories';
import './CategoryList.css';
import Content from '../../components/Content';

function CategoryList() {
  const categoriesRes = GetCatogories();

  const categoriesData = useMemo(
    () =>
      categoriesRes.map((t) => ({
        ...t,
        actions: null,
      })),
    [categoriesRes]
  );

  const columns: GridColumns = [
    { field: 'title', headerName: 'Title', flex: 1, headerAlign: 'left', align: 'left', minWidth: 100 },
    { field: 'description', headerName: 'Description', flex: 3, headerAlign: 'left', align: 'left', minWidth: 300 },
    {
      field: 'creator',
      headerName: 'Creator',
      sortable: false,
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      minWidth: 95,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      valueGetter: ({ value }) => value && new Date(value),
      flex: 1,
      minWidth: 95,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          className="category-action-button"
          icon={<VisibilityIcon />}
          onClick={() => console.log(`View category with id ${params.id}`)}
          label="View"
        />,
        <GridActionsCellItem
          className="category-action-button"
          icon={<EditIcon />}
          onClick={() => console.log(`Edit category with id ${params.id}`)}
          label="Edit"
        />,
        <GridActionsCellItem
          className="category-action-button"
          icon={<DeleteIcon />}
          onClick={() => console.log(`Delete category with id ${params.id}`)}
          label="Delete"
        />,
      ],
      sortable: false,
      flex: 1.5,
      minWidth: 180,
      headerAlign: 'center',
      align: 'center',
    },
  ];

  return (
    <Content name={'Categories'}>
      <div className="button-wrapper">
        <button className="button-primary">Create</button>
      </div>
      <div className="categories-table-wrapper">
        <StyledDataGrid
          headerHeight={70}
          rowHeight={60}
          autoPageSize
          disableColumnMenu
          disableSelectionOnClick
          columns={columns}
          rows={categoriesData}
          components={{
            Pagination: CustomPagination,
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'title', sort: 'desc' }],
            },
          }}
        />
      </div>
    </Content>
  );
}

export default CategoryList;
