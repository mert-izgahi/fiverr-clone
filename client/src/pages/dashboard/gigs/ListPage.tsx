import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetGigsBySellerIdQuery } from "../../../redux/gigs/api";
import GigsTable from "../../../components/GigsTable";
import { useAppSelector } from "../../../redux/store";

function ListPage() {
  const {
    currentUser: { role, _id },
  } = useAppSelector((state) => state.auth);
  const [searchParams] = useSearchParams();
  const { data: sellerGigsData, isLoading: isLoadingSellerGigs } =
    useGetGigsBySellerIdQuery({
      searchParams: searchParams.toString(),
      sellerId: _id,
    } as any);

  const gigs = useMemo(() => {
    if (sellerGigsData) {
      return sellerGigsData.records;
    }
  }, [role, sellerGigsData]);

  const totalPages = useMemo(() => {
    if (sellerGigsData) {
      return sellerGigsData.total;
    }
  }, [role, sellerGigsData]);

  return (
    <>
      <GigsTable
        gigs={gigs!}
        totalPages={totalPages!}
        isLoading={isLoadingSellerGigs}
      />
    </>
  );
}

export default ListPage;
