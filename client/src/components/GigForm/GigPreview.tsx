import { UseFormReturnType } from "@mantine/form";

function GigPreview({ form }: { form: UseFormReturnType<any> }) {
  return (
    <div className="container">
      <h1>{form.values.title}</h1>
      <p className="mb-5 text-muted">{form.values.description}</p>
      <div className="row row-cols-12 row-cols-md-3 row-cols-lg-3 g-3 mb-5">
        {(form.values.images as string[]).map((image, index) => (
          <div className="col" key={index}>
            <img src={image} alt="" className="img-fluid rounded" />
          </div>
        ))}
      </div>

      <div className="mb-3">
        <p className="text-muted">
          <strong>Delivery Days:</strong> {form.values.deliveryDays}
        </p>
        <p className="text-muted">
          <strong>Price:</strong> ${form.values.price}
        </p>
        <p className="text-muted">
          <strong>Category:</strong> {form.values.category}
        </p>
        <p className="text-muted">
          <strong>Tags:</strong> {form.values.tags.join(", ")}
        </p>
        <p className="text-muted">
          <strong>Features:</strong> {form.values.features.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default GigPreview;
