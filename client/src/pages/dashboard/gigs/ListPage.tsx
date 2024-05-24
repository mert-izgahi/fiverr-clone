import { useMemo } from "react";
import TableSearchField from "../../../components/TableSearchField";
import { ActionIcon, Button, Table, TableScrollContainer } from "@mantine/core";
import TablePagination from "../../../components/TablePagination";
import { Link, useSearchParams } from "react-router-dom";
import {
  useGetGigsBySellerIdQuery,
  useGetGigsQuery,
} from "../../../redux/gigs/api";
import { useAppSelector } from "../../../redux/store";
import GigsTable from "../../../components/GigsTable";

function ListPage() {
  const [searchParams] = useSearchParams();
  const { data: gigsData, isLoading } = useGetGigsQuery({
    searchParams: searchParams.toString(),
  } as any);

  const gigs = useMemo(() => {
    if (gigsData) {
      return gigsData.records;
    }
  }, [gigsData]);

  const totalPages = useMemo(() => {
    if (gigsData) {
      return gigsData.total;
    }
  }, [gigsData]);

  return (
    <>
      <GigsTable gigs={gigs!} totalPages={totalPages!} isLoading={isLoading} />
    </>
  );
}

export default ListPage;
