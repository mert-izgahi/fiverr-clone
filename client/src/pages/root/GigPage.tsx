import { useParams } from "react-router-dom";
import { useGetGigQuery } from "../../redux/gigs/api";
import dayjs from "dayjs";
import { Accordion } from "@mantine/core";
import LoadingState from "../../components/LoadingState";
import OrderForm from "../../components/OrderForm";

function GigPage() {
  const { id } = useParams();
  const {
    data: gig,
    isLoading: isLoadingGig,
    error: gigError,
  } = useGetGigQuery({ _id: id as string } as any, {
    skip: !id,
  });

  if (gigError) {
    return <div>{gigError as string}</div>;
  }

  if (isLoadingGig) {
    return <LoadingState />;
  }

  return (
    <div className="container py-5">
      <div className="row row-cols-12 row-cols-md-2 row-cols-lg-2 g-4">
        <div className="col-12 col-md-8 col-lg-8">
          <div className="d-flex align-items-center ">
            <h1 className="mb-3">{gig?.title}</h1>
            <p className="ms-auto mb-0">
              {dayjs(gig?.createdAt).format("DD MMM YYYY")}
            </p>
          </div>
          <img
            src={gig?.coverUrl}
            alt=""
            className="w-100 img-fluid rounded-3 mb-4"
            style={{ height: 400, objectFit: "cover" }}
          />

          <h3 className="mb-3">About the Gig</h3>
          <p className="mb-5">{gig?.description}</p>

          <h3 className="mb-3">Details</h3>
          <table className="table table-borderless mb-5">
            <tbody>
              <tr>
                <td>Category</td>
                <td>{gig?.category?.name}</td>
              </tr>
              <tr>
                <td>Delivery Days</td>
                <td>{gig?.deliveryDays}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>${gig?.price}</td>
              </tr>

              <tr>
                <td>Tags</td>
                <td>{gig?.tags?.join(", ")}</td>
              </tr>
              <tr>
                <td>Features</td>
                <td>{gig?.features?.join(", ")}</td>
              </tr>

              <tr>
                <td>Created At</td>
                <td>{dayjs(gig?.createdAt).format("DD MMM YYYY")}</td>
              </tr>

              <tr>
                <td>Updated At</td>
                <td>{dayjs(gig?.updatedAt).format("DD MMM YYYY")}</td>
              </tr>

              <tr>
                <td>Seller</td>
                <td>{gig?.seller?.firstName + " " + gig?.seller?.lastName}</td>
              </tr>

              <tr>
                <td>Rating</td>
                <td>{gig?.rating}</td>
              </tr>

              <tr>
                <td>Views</td>
                <td>{gig?.views}</td>
              </tr>

              <tr>
                <td>Total Reviews</td>
                <td>{gig?.totalReviews}</td>
              </tr>
            </tbody>
          </table>

          <h3 className="mb-3">FAQs</h3>

          <Accordion className="mb-5">
            {gig?.faqs?.map((faq, index) => (
              <Accordion.Item key={index} value={faq.question}>
                <Accordion.Control>{faq.question}</Accordion.Control>
                <Accordion.Panel>{faq.answer}</Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>

        <div className="col-12 col-md-4 col-lg-4">
          <OrderForm gig={gig!} />
        </div>
      </div>
    </div>
  );
}

export default GigPage;
