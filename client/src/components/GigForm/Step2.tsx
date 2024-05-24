import { NumberInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { themeConstants } from "../../helpers";

function Step2({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <div className="mb-3">
        <NumberInput
          label="Delivery Days"
          withAsterisk
          description="How many days will you deliver?"
          placeholder="Delivery Days"
          {...form.getInputProps("deliveryDays")}
          classNames={themeConstants.textInputClasses(form, "deliveryDays")}
        />
      </div>
      <div className="mb-3">
        <NumberInput
          label="Price"
          withAsterisk
          prefix="$"
          description="What is the price of your gig?"
          placeholder="Price"
          {...form.getInputProps("price")}
          classNames={themeConstants.textInputClasses(form, "price")}
        />
      </div>
    </>
  );
}

export default Step2;
