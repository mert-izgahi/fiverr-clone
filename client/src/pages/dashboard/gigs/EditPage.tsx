import { useParams } from "react-router-dom";
import GigForm from "../../../components/GigForm";
import { useGetGigQuery } from "../../../redux/gigs/api";
import LoadingState from "../../../components/LoadingState";

function EditPage() {
  const { id } = useParams();

  const {
    data: gigData,
    isLoading: isLoadingGig,
    error: loadingError,
  } = useGetGigQuery({ _id: id as string } as any, {
    skip: !id,
  });

  if (isLoadingGig) {
    return <LoadingState />;
  }

  if (loadingError) {
    return <div>{loadingError as string}</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <GigForm mode="edit" gig={gigData} />
        </div>
      </div>
    </div>
  );
}

export default EditPage;
