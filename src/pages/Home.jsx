import { useState, useEffect } from "react";

const Home = () => {
  const [activeSection, setActiveSection] = useState("");
  const [members, setMembers] = useState([]);

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
              Table API .map()
            </p>
          </div>
        )}
        {activeSection === "admin" && (
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-orange-700 mb-8">
              Admin Control Panel
            </h2>
            <p className="text-xl text-brown-900 bg-red-100 p-5 rounded-lg border border-red-500">
              (CRUD) (DELETE)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
