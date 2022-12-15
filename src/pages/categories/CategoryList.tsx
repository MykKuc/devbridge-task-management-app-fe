import React, { useEffect, useState } from 'react';
import { GridActionsCellItem, GridColumns, GridRowParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

import StyledDataGrid from '../../components/StyledDataGrid';
import CustomPagination from '../../components/Pagination';
import './CategoryList.css';
import Content from '../../components/Content';
import CategoryCreation from './category-creation/CategoryCreation';
import CategoryEdit from './CategoryEdit';
import config from '../../config';
import CustomNoRowsOverlay from 'components/CustomNoRowsOverlay';

interface Category {
  id: Number;
  name: String;
  description: String;
  creationDate: Date;
  author: String;
}

function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editId, setEditId] = useState(0);

  const fetchCategories = () => {
    fetch(config.backendURL + '/categories/')
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log('Failed to fetch.');
          return [];
        }
      })
      .then((data: Category[]) => {
        setCategories(data);
      });
  };

  useEffect(fetchCategories, []);

  const columns: GridColumns = [
    { field: 'name', headerName: 'Title', flex: 1, headerAlign: 'left', align: 'left', minWidth: 100 },
    { field: 'description', headerName: 'Description', flex: 3, headerAlign: 'left', align: 'left', minWidth: 300 },
    {
      field: 'author',
      headerName: 'Creator',
      sortable: false,
      flex: 1,
      headerAlign: 'left',
      align: 'left',
      minWidth: 95,
    },
    {
      field: 'creationDate',
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
          onClick={() => {
            setEditId(params.id as number);
            setShowEdit(true);
          }}
          label="Edit"
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
      <CategoryCreation
        show={showModal}
        close={() => {
          setShowModal(false);
        }}
        fetchCategories={fetchCategories}
      />
      <div className="button-wrapper">
        <button onClick={() => setShowModal(true)} className="button-primary">
          Create
        </button>
      </div>
      {showEdit && (
        <CategoryEdit
          show={showEdit}
          close={() => {
            setShowEdit(false);
          }}
          id={editId}
          fetchCategories={fetchCategories}
        />
      )}
      <div className="categories-table-wrapper">
        <StyledDataGrid
          headerHeight={70}
          rowHeight={60}
          autoPageSize
          disableColumnMenu
          disableSelectionOnClick
          columns={columns}
          rows={categories}
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          componentsProps={{
            noRowsOverlay: { message: 'No categories yet!' },
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
