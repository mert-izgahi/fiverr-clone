import { ActionIcon, Image, InputError, InputWrapper } from "@mantine/core";
import { FileWithPath, IMAGE_MIME_TYPE, Dropzone } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";

function Step5({ form }: { form: UseFormReturnType<any> }) {
  const onImageDrop = (acceptedFiles: FileWithPath[]) => {
    const _images = acceptedFiles.map((file) => URL.createObjectURL(file));
    form.setFieldValue("images", _images);
    form.setFieldValue("imagesFiles", acceptedFiles);
  };

  return (
    <div>
      <InputWrapper className="mb-4">
        <Dropzone
          accept={IMAGE_MIME_TYPE as any}
          onDrop={onImageDrop}
          className={`py-5 mb-3 ${form.errors.images && "border-danger"}`}
        >
          <p className="mb-0 text-center">
            Drag and drop some files here (first image will use as cover)
          </p>
        </Dropzone>

        <InputError>{form.errors.images && form.errors.images}</InputError>
      </InputWrapper>

      <div className="row row-cols-12 row-cols-md-3 row-cols-lg-3 g-3">
        {(form.values.images as string[]).map((image, index) => (
          <div className="col " key={index}>
            <div className="position-relative">
              <ActionIcon
                color="red"
                onClick={() => {
                  form.removeListItem("images", index);
                }}
                className="position-absolute top-0 end-0 m-2"
              >
                <i className="bi bi-x-lg"></i>
              </ActionIcon>
              <Image
                src={image}
                height={300}
                alt="Gig image"
                className="rounded img-fluid"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Step5;
