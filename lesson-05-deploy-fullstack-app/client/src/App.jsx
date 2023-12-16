import { useEffect, useState } from "react";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [refreshCount, setRefreshCount] = useState(0);
  const [text, setText] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseUrl}/db`);
        const jsonResp = await response.json();
        setData(jsonResp.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [refreshCount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setText("");

    try {
      const response = await fetch(`${baseUrl}/db`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        console.log("Data submitted successfully");
        // Handle success response
      } else {
        console.error("Submission failed");
        // Handle error response
      }
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle exception
    }
  };

  return (
    <div className="mx-10">
      <h1 className="text-center py-10 text-3xl font-bold">
        Hello World From Client!
      </h1>

      {/* input form  */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto my-8">
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Add Text
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter name"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <button
          onClick={() => setRefreshCount(refreshCount + 1)}
          type="button"
          className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          ↻ Refresh
        </button>
      </form>
      {/* render list */}
      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border md:border-none block md:table-row">
            <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">
              ID
            </th>
            <th className="bg-gray-100 p-2 text-gray-600 font-bold md:border md:border-gray-300 block md:table-cell">
              Text
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border md:border-none block md:table-row"
            >
              <td className="p-2 border md:border-gray-300 block md:table-cell">
                {item.id}
              </td>
              <td className="p-2 border md:border-gray-300 block md:table-cell">
                {item.text}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
