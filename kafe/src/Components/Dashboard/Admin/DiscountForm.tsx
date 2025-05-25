import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import dayjs from "dayjs";
import { FormEvent, useRef, useState } from "react";

const DiscountForm = () => {
  const [code, setCode] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<number | "">("");
  const [startDateTime, setStartDateTime] = useState(
    dayjs().format("YYYY-MM-DDTHH:mm")
  );
  const [endDateTime, setEndDateTime] = useState(
    dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm")
  );
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const handleOnReset = () => {
    setCode("");
    setName("");
    setValue("");
    setStartDateTime(dayjs().format("YYYY-MM-DDTHH:mm"));
    setEndDateTime(dayjs().add(1, "hour").format("YYYY-MM-DDTHH:mm"));
    setChecked(false);
  };

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (code && name && value && startDateTime && endDateTime) {
      const data = {
        name,
        code,
        global: checked,
        value,
        date: {
          start: startDateTime,
          end: endDateTime,
        },
      };

      const response = await fetch("http://localhost:5000/api/discount/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) setError("Error while creating new Discount");
      else setError("");
    }
  };

  return (
    <Form noValidate onSubmit={handleOnSubmit}>
      {error && <p style={{ color: "red", fontWeight: 700 }}>{error}</p>}
      <Form.Group as={Col} className="mb-4">
        <Form.Label>Code</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="SOMETHING20"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          value={code}
        />
      </Form.Group>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Spring discount"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
              )
            }
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Value</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="20"
            min={1}
            max={99}
            value={value}
            onChange={(e) => {
              const str = e.target.value;
              if (str.length > 2) return;
              setValue(Number(str) || "");
            }}
          />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Set as global"
          feedbackType="invalid"
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
        />
      </Form.Group>
      <Stack direction="horizontal" gap={3} style={{ justifyContent: "end" }}>
        <Button type="reset" variant="outline-dark" onClick={handleOnReset}>
          Reset
        </Button>
        <Button type="submit">Create Discount</Button>
      </Stack>
    </Form>
  );
};

export default DiscountForm;
