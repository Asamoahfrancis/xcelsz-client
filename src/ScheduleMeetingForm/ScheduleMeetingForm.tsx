import { DatePicker, TimePicker, Input, Button, Form } from "antd";

const { TextArea } = Input;

const ScheduleMeetingForm = ({ onSubmit }: { onSubmit: any }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Form.Item
        name="title"
        label="Meeting Title"
        rules={[{ required: true, message: "Please input a title!" }]}
      >
        <Input placeholder="Enter meeting title" />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[{ required: true, message: "Please select a date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="time"
        label="Time"
        rules={[{ required: true, message: "Please select a time!" }]}
      >
        <TimePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Duration (minutes)"
        rules={[{ required: true, message: "Please input duration!" }]}
      >
        <Input type="number" placeholder="Enter duration in minutes" />
      </Form.Item>
      <Form.Item name="participants" label="Participants">
        <Input placeholder="Enter participants (comma-separated)" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <TextArea rows={4} placeholder="Enter meeting description" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ScheduleMeetingForm;
