import { useRef } from "react";
import Button from "./components/Button";
import Container from "./components/Container";
import Input from "./components/Input";
import Form, { type FormHandle } from "./components/Form";

const App = () => {
  const customForm = useRef<FormHandle>(null);
  const saveHandler = (data: unknown) => {
    const extractedData = data as { name: string; age: string };
    console.log(extractedData);
    customForm.current?.clear();
  }

  const input = useRef<HTMLInputElement>(null);
  return (
    <main>
      <Form onSave={saveHandler} ref={customForm}>
        <Input id="name" label="Your name goes here" ref={input} />
        <Input id="age" label="Your age goes here" />
        <p>
          <Button>Save</Button>
        </p>
      </Form>
      <p>
        <Button>HEY LOOK A BUTTON</Button>
      </p>
      <p>
        <Button href="https://google.com">OH LOOK THIS ONE IS A LINK</Button>
      </p>
      <Container as={Button} type="button">
        I wonder if this works
      </Container>
    </main>
  );
};

export default App;
