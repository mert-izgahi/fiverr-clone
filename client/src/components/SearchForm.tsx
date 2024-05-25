import { ActionIcon, Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { themeConstants } from "../helpers";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchForm({ ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const form = useForm({
    initialValues: {
      search: searchParams.get("search") || "",
    },
  });
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    const { search } = values;
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }
    searchParams.set("page", "1");
    // setSearchParams(searchParams);
    navigate(`/explore?${searchParams.toString()}`);
  };
  return (
    <form {...props} onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        placeholder="Search"
        {...form.getInputProps("search")}
        flex={1}
        classNames={themeConstants.textInputClasses(form, "search")}
        rightSection={
          <ActionIcon variant="transparent" type="submit">
            <i className="bi bi-search"></i>
          </ActionIcon>
        }
      />
    </form>
  );
}

export default SearchForm;
