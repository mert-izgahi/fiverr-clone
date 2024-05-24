import { Button, Textarea } from "@mantine/core";
import { UseFormReturnType, useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { themeConstants } from "../../helpers";

const faqValidation = Yup.object().shape({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
});

function Step4({ form }: { form: UseFormReturnType<any> }) {
  const faqForm = useForm({
    validate: yupResolver(faqValidation),
    initialValues: {
      question: "",
      answer: "",
    },
    validateInputOnBlur: false,
    validateInputOnChange: true,
  });

  const addFaq = (values: any) => {
    form.insertListItem("faqs", values);
    faqForm.reset();
    faqForm.setValues({ question: "", answer: "" });
  };

  const removeFaq = (index: number) => {
    form.removeListItem("faqs", index);
  };
  return (
    <>
      <div className="mb-4">
        <Textarea
          label="Question"
          withAsterisk
          description="What is the question of your gig?"
          placeholder="Gig question"
          {...faqForm.getInputProps("question")}
          value={faqForm.values.question}
          classNames={themeConstants.textInputClasses(faqForm, "question")}
        />
      </div>
      <div className="mb-4">
        <Textarea
          label="Answer"
          withAsterisk
          description="What is the answer of your gig?"
          placeholder="Gig answer"
          {...faqForm.getInputProps("answer")}
          value={faqForm.values.answer}
          classNames={themeConstants.textInputClasses(faqForm, "answer")}
        />
      </div>
      <div className="mb-4 d-flex justify-content-end">
        <Button
          leftSection={<i className="bi bi-plus" />}
          type="button"
          className="btn btn-secondary"
          onClick={faqForm.onSubmit(addFaq) as any}
        >
          Add
        </Button>
      </div>

      <div className="list-group">
        {form.values.faqs.map((faq: any, index: number) => (
          <div key={index} className="card mb-3">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0">{faq.question}</p>
                <Button
                  color="red"
                  variant="subtle"
                  onClick={() => removeFaq(index)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </div>
            </div>
            <div className="card-body">
              <p className="mb-0">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Step4;
