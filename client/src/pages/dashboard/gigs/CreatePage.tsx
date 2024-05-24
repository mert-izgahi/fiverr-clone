import {
  Button,
  FileButton,
  Image,
  MultiSelect,
  NumberInput,
  Select,
  Stepper,
  TagsInput,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useState } from "react";
import * as Yup from "yup";
import { themeConstants } from "../../../helpers";
import { featuresList } from "../../../constants/featuresList";
import { categoryIcons } from "../../../constants/categoryIcons";
import GigForm from "../../../components/GigForm";





function CreatePage() {
  
  

  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <GigForm mode="create"/>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
