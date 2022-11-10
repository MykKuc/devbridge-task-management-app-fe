import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

const StyledDataGrid = styled(DataGrid)(() => ({
  border: 0,
  color: 'white',
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  '& .MuiIconButton-root': {
    color: 'white'
  },
  // allows multiline text in grids
  '& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight) > .MuiDataGrid-cell': {
    whiteSpace: 'normal',
    textAlign: 'left'
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaders': {
    borderTop: '2px solid var(--accent-color)',
    borderBottom: '2px solid var(--accent-color)',
    borderRadius: 0,
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: '1rem',
    fontWeight: 600
  },
  '& .MuiDataGrid-cell, & .MuiDataGrid-row--lastVisible': {
    borderBottom: '1px solid var(--accent-color)',
  },
  '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
    outline: 'none'
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: 'none',
    marginTop: '30px'
  },
  '& .MuiDataGrid-actionsCell': {
    gridGap: '8px 0px'
  },
  '& .MuiDataGrid-actionsCell .MuiButtonBase-root': {
    padding: '0px',
    color: 'var(--accent-color)'
  },
  '& .MuiDataGrid-actionsCell .MuiButtonBase-root:not(:last-child)': {
    marginRight: '5px'
  },
  '& .MuiDataGrid-actionsCell .MuiButtonBase-root svg': {
    border: '1px solid var(--accent-color)',
    padding: '5px',
    borderRadius: '10px',
    fontSize: '1.75rem',
  }
}));

export default StyledDataGrid;