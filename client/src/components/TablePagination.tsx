import { Pagination } from "@mantine/core";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function TablePagination({ total }: { total: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  return (
    <Pagination
      total={total}
      value={page}
      onChange={(page) => {
        setPage(page);
        searchParams.set("page", String(page));
        setSearchParams(searchParams);
      }}
      
    />
  );
}

export default TablePagination;
