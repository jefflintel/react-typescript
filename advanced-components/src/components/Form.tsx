import {
  type ComponentPropsWithoutRef,
  type FormEvent,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

export type FormHandle = {
    clear: () => void;
 };

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref
) {
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    return {
      clear() {
        console.log("clearing the form");
        form.current?.reset();
      },
    };
  });

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  };

  return (
    <form {...otherProps} onSubmit={submitHandler} ref={form}>
      {children}
    </form>
  );
});

export default Form;
