import { Pagination as Pgnation } from "@mui/material";
import { memo } from "react";

interface IPropsPagination {
  totalItems: number;
  perPageCount: number;
  onChange: any;
}

const Pagination = (props: IPropsPagination) => {
  const { totalItems, perPageCount, onChange } = props;
  return (
    <>
      <Pgnation
        count={~~(totalItems / perPageCount)}
        variant="outlined"
        shape="rounded"
        onChange={(event, pageNumber) => onChange(event, pageNumber)}
      />
    </>
  );
};

export default memo(Pagination);
