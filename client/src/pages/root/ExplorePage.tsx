import { useMemo } from "react";
import { useGetGigsQuery } from "../../redux/gigs/api";
import { useSearchParams } from "react-router-dom";
import GigsList from "../../components/GigsList";

function ExplorePage() {
  const [searchParams] = useSearchParams();

  const { data: gigsData, isLoading } = useGetGigsQuery(
    {
      searchParams: searchParams.toString(),
    } as any,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const gigs = useMemo(() => {
    if (gigsData) {
      return gigsData.records;
    }
  }, [gigsData, searchParams.toString()]);

  const totalPages = useMemo(() => {
    if (gigsData) {
      return gigsData.total;
    }
  }, [gigsData, searchParams.toString()]);
  return (
    <div className="container py-5">
      <h3 className="mb-4">Explore</h3>
      <GigsList gigs={gigs!} totalPages={totalPages!} isLoading={isLoading} />
    </div>
  );
}

export default ExplorePage;
