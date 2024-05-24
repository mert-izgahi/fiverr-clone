import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useGetGigsBySellerIdQuery,
  useGetGigsQuery,
} from "../../../redux/gigs/api";
import GigsTable from "../../../components/GigsTable";
import { useAppSelector } from "../../../redux/store";

function ListPage() {
  const {
    currentUser: { role, _id },
  } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const { data: gigsData, isLoading } = useGetGigsQuery(
    {
      searchParams: searchParams.toString(),
    } as any,
    {
      skip: role !== "admin",
    }
  );
  const { data: sellerGigsData, isLoading: isLoadingSellerGigs } =
    useGetGigsBySellerIdQuery(
      {
        searchParams: searchParams.toString(),
        sellerId: _id,
      } as any,
      {
        skip: role !== "user" || !_id,
      }
    );

  const gigs = useMemo(() => {
    if (role === "admin") {
      if (gigsData) {
        return gigsData.records;
      }
    } else {
      if (sellerGigsData) {
        return sellerGigsData.records;
      }
    }
  }, [role, gigsData, sellerGigsData]);

  const totalPages = useMemo(() => {
    if (role === "admin") {
      if (gigsData) {
        return gigsData.total;
      }
    } else {
      if (sellerGigsData) {
        return sellerGigsData.total;
      }
    }
  }, [role, gigsData, sellerGigsData]);

  return (
    <>
      <GigsTable gigs={gigs!} totalPages={totalPages!} isLoading={isLoading} />
    </>
  );
}

export default ListPage;
