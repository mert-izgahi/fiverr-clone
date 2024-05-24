import { ActionIcon, TextInput } from "@mantine/core";
import { themeConstants } from "../helpers";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function TableSearchField() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        placeholder="Search"
        classNames={themeConstants.textInputClasses(null, "search")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightSection={
          <ActionIcon type="submit">
            <i className="bi bi-search"></i>
          </ActionIcon>
        }
      />
    </form>
  );
}

export default TableSearchField;
