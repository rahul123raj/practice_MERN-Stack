import { useRef } from "react";

const AddData = () => {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = formData.get("data"); // Extract the `data` field

    // Send data in JSON format
    const response = await fetch("http://localhost:5000/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate JSON payload
      },
      body: JSON.stringify({ data }), // Wrap in an object
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        Data (comma-separated):
        <input type="text" name="data" placeholder="e.g., test1,test2,test3" required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddData;
