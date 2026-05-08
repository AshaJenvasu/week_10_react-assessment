import { useState, useEffect } from "react";
import Table from "../components/Table";

const Home = () => {
  const [activeSection, setActiveSection] = useState("");
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    position: "",
  });

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setMembers(data);
      console.log("Data fetched successfully:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getButtonClass = (section) => {
    const baseClass =
      "px-10 py-4 rounded-full shadow-2xl font-black text-lg transition-all duration-300 ease-in-out transform hover:scale-110 border-2";
    if (activeSection === section) {
      return `${baseClass} bg-amber-400 text-brown-950 border-red-700 ring-4 ring-orange-400 scale-105 shadow-orange-500/50`;
    }
    return `${baseClass} bg-white text-black border-black hover:border-orange-600`;
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to erase this human from the database?",
      )
    )
      return;
    try {
      const res = await fetch(
        `https://67eca027aa794fb3222e43e2.mockapi.io/members/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        setMembers(members.filter((member) => member.id !== id));
        alert("Erase successfully! The pride remains.");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://67eca027aa794fb3222e43e2.mockapi.io/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      if (res.ok) {
        const newMember = await res.json();
        setMembers([...members, newMember]);
        setFormData({
          name: "",
          lastName: "",
          position: "",
        });
        alert("New warrior added to the ranks!");
      }
    } catch (error) {
      console.error("Error creating member:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-24 px-10 min-h-screen bg-[#EAEAEA]">
      {/* 1. Header */}
      <h1 className="text-6xl font-black text-center mb-20 leading-tight tracking-tighter text-brown-950 shadow-amber-200">
        Generation Thailand <br />
        <span className="text-orange-600">React - Assessment</span>
      </h1>

      {/* 2. Buttons Container  */}
      <div className="flex gap-20 mb-16">
        <button
          onClick={() => setActiveSection("user")}
          className={getButtonClass("user")}
        >
          User Home Section
        </button>
        <button
          onClick={() => setActiveSection("admin")}
          className={getButtonClass("admin")}
        >
          Admin Home Section
        </button>
      </div>

      {/* 3. Section Display  */}
      <div className="w-full max-w-5xl mt-10 p-10 bg-white rounded-2xl shadow-xl border-t-8 border-orange-600">
        {!activeSection && (
          <p className="text-center text-3xl font-bold text-gray-500 italic">
            {`"Who decided that? I will decide what to show!" - Choose a section`}
          </p>
        )}
        {activeSection === "user" && (
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-black mb-8">
              User Database
            </h2>
            <p className="text-xl text-brown-900 bg-amber-100 p-5 rounded-lg border border-yellow-500">
              <Table data={members} isAdmin={false} />
            </p>
          </div>
        )}
        {activeSection === "admin" && (
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-orange-700 mb-8">
              Admin Control Panel
            </h2>
            <div className="mb-12 p-8 bg-white rounded-xl border-4 border-amber-500 shadow-lg">
              <h3 className="text-2xl font-black mb-6 text-brown-950 uppercase italic">
                Create User Here
              </h3>
              <form onSubmit={handleCreate} className="flex gap-4 items-end">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none"
                    value={formData.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastname: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-sm">Position</label>
                  <input
                    type="text"
                    placeholder="Position"
                    className="border-2 border-gray-300 p-2 rounded-lg focus:border-orange-500 outline-none"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-600 text-white px-8 py-2 rounded-lg font-black hover:bg-orange-800 shadow-md transition-all transform hover:scale-105 h-[44px]"
                >
                  Save
                </button>
              </form>
            </div>
            <p className="text-xl text-brown-900 bg-red-100 p-5 rounded-lg border border-red-500">
              <Table data={members} isAdmin={true} onDelete={handleDelete} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
