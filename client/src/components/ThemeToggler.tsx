import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { ActionIcon } from "@mantine/core";
import { setColorSchema } from "../redux/colorSchema/slice";

function ThemeToggler() {
  const dispatch = useAppDispatch();
  const { colorSchema } = useAppSelector((store) => store.colorSchema);
  return (
    <ActionIcon
      size={"lg"}
      className="btn btn-ghost"
      onClick={() => {
        dispatch(setColorSchema(colorSchema === "light" ? "dark" : "light"));
      }}
    >
      {colorSchema === "light" ? (
        <i className="bi bi-moon"></i>
      ) : (
        <i className="bi bi-sun"></i>
      )}
    </ActionIcon>
  );
}

export default ThemeToggler;
