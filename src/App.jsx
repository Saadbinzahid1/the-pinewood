import styled from "styled-components";
import GlobalStyle from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";
import Row from "./ui/Row";

function App() {
  return (
    <>
      <GlobalStyle />

      <Row type="vertical">
        <Row type="horizontal">
          <Heading as="h1">Pinewood</Heading>

          <div>
            <Heading as="h2">Check in and out</Heading>
            <Button
              variation="primary"
              size="medium"
              onClick={() => alert("Check In")}
            >
              Check in
            </Button>
            <Button
              variation="secondary"
              size="small"
              onClick={() => alert("Check Out")}
            >
              Check out
            </Button>
          </div>
        </Row>

        <Row type="vertical">
          <Heading as="h3">Form</Heading>
          <form>
            <Input type="number" placeholder="Number of guests" />
            <Input type="number" placeholder="How many days" />
          </form>
        </Row>
      </Row>
    </>
  );
}

export default App;
