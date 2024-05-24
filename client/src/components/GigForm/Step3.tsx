import { MultiSelect, Select, TagsInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { categoryIcons } from "../../constants/categoryIcons";
import { themeConstants } from "../../helpers";
import { featuresList } from "../../constants/featuresList";

function Step3({ form }: { form: UseFormReturnType<any> }) {
  return (
    <>
      <>
        <div className="mb-3">
          <Select
            label="Category"
            withAsterisk
            description="What is the category of your gig?"
            placeholder="Gig category"
            data={categoryIcons.map((category) => category.categoryLabel)}
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
