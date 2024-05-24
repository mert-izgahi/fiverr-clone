import { MultiSelect, Select, TagsInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { themeConstants } from "../../helpers";
import { featuresList } from "../../constants/featuresList";
import { useGetCategoriesQuery } from "../../redux/categories/api";
import { useMemo } from "react";
import LoadingState from "../LoadingState";

function Step3({ form }: { form: UseFormReturnType<any> }) {
  const { data: categoryData, isLoading } = useGetCategoriesQuery({
    all: true,
  } as any);
  const categories = useMemo(() => {
    if (categoryData) {
      return categoryData.records.map((category) => ({
        value: category._id,
        label: category.name,
      }));
    }
  }, [categoryData]);

  if (isLoading) {
    return <LoadingState />;
  }
  return (
    <>
      <>
        <div className="mb-3">
          <Select
            label="Category"
            withAsterisk
            description="What is the category of your gig?"
            placeholder="Gig category"
            data={categories}
            {...form.getInputProps("category")}
            classNames={themeConstants.selectInputClasses(form, "category")}
          />
        </div>
        <div className="mb-3">
          <TagsInput
            label="Tags"
            withAsterisk
            description="What are the tags of your gig?"
            placeholder="Gig tags"
            {...form.getInputProps("tags")}
            classNames={themeConstants.textInputClasses(form, "tags")}
          />
        </div>
        <div className="mb-3">
          <MultiSelect
            searchable
            label="Features"
            withAsterisk
            description="What are the features of your gig?"
            placeholder="Gig features"
            data={featuresList}
            {...form.getInputProps("features")}
            classNames={themeConstants.selectInputClasses(form, "features")}
          />
        </div>
      </>
    </>
  );
}

export default Step3;
