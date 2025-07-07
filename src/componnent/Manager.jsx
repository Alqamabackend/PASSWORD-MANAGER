import React, { useEffect, useState } from "react";
import axios from "axios";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPasswordId, setShowPasswordId] = useState(null);

  // Fetch all passwords from backend
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/password/all");
        setPasswordArray(res.data);
      } catch (error) {
        console.error("Failed to fetch passwords:", error);
      }
    };
    fetchPasswords();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/password/add", form);
      setPasswordArray([...passwordArray, res.data]);
      setForm({ site: "", username: "", password: "" });
    } catch (error) {
      console.error("Failed to save password:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this password?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/password/${id}`);
      const updated = passwordArray.filter((item) => item._id !== id);
      setPasswordArray(updated);
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />
      </div>

      <div className="mycontainer">
        <h1 className="text-4xl font-bold py-2 border border-white text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 py-2 border border-white text-center text-lg">
          Your own password Manager
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            savePassword();
          }}
          autoComplete="off"
          className="flex flex-col p-4 text-black gap-8 items-center"
        >
          <input type="text" name="fakeuser" className="hidden" autoComplete="off" />
          <input type="password" name="fakepass" className="hidden" autoComplete="off" />

          <input
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            autoComplete="new-site"
            className="rounded-full border border-green-500 w-full p-4 py-1"
          />

          <div className="flex w-full justify-between gap-8">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              autoComplete="new-username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              autoComplete="new-password"
              className="rounded-full border border-green-500 w-full p-4 py-1"
            />
          </div>

          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </form>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Password to Show</div>
          ) : (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Delete</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => (
                  <tr key={item._id}>
                    <td className="py-2 border border-white text-center w-32">
                      <a
                        href={item.site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black-700 hover:underline hover:decoration-2 hover:underline-offset-4 transition-all duration-150"
                      >
                        {item.site}
                      </a>
                    </td>
                    <td className="py-2 border border-white text-center w-32">
                      {item.username}
                    </td>
                    <td className="py-2 border border-white text-center w-32">
                      {showPasswordId === item._id
                        ? item.password
                        : "•".repeat(item.password.length)}
                      <button
                        className="ml-2 text-blue-700 underline text-sm"
                        onClick={() =>
                          setShowPasswordId(
                            showPasswordId === item._id ? null : item._id
                          )
                        }
                      >
                        {showPasswordId === item._id ? "Hide" : "Show"}
                      </button>
                    </td>
                    <td className="py-2 border border-white text-center w-32">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
