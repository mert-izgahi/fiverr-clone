import { TextInput, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { themeConstants } from "../../helpers";

function Step1({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <div className="mb-3">
        <TextInput
          label="Title"
          withAsterisk
          description="What is the title of your gig?"
          placeholder="Gig title"
          {...form.getInputProps("title")}
          classNames={themeConstants.textInputClasses(form, "title")}
        />
      </div>
      <div className="mb-3">
        <Textarea
          label="Description"
          withAsterisk
          description="What is the description of your gig?"
          placeholder="Gig description"
          {...form.getInputProps("description")}
          classNames={themeConstants.textInputClasses(form, "title")}
        />
      </div>
    </>
  );
}

export default Step1;
