import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPassword(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-50">
      <main className="bg-white w-96">
        <form
          onSubmit={handleSubmit}
          className="mx-12 my-12 flex flex-col gap-4"
        >
          <h1 className="text-center text-2xl font-bold mb-4">Login</h1>
          <div className="flex flex-col gap-2">
            <label>Username:</label>
            <input
              type="text"
              placeholder="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="focus:outline-none border-b focus:border-b-2 text-slate-600 py-1"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Password:</label>
            <div className="flex border-b focus-within:border-b-2">
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 focus:outline-none text-slate-600 py-1"
              />
              <button
                type="button"
                onClick={() => setShowPassword((old) => !old)}
                className="px-2"
              >
                {showPassword ? (
                  <AiFillEyeInvisible
                    className="animate-pulse duration-100"
                    size={23}
                  />
                ) : (
                  <AiFillEye size={23} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 mt-8 py-2 text-white"
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
