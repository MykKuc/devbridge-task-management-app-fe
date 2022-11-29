import { gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="standard"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) => apiRef.current.setPage(value - 1)}
      sx={{
        '& .MuiPaginationItem-root': {
          border: '1px solid var(--accent-color)',
          color: 'var(--accent-color)',
        },
        '& .MuiPaginationItem-root:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        '& .MuiPaginationItem-root.Mui-selected:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      }}
    />
  );
}

export default CustomPagination;
