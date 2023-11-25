const getToken = async (email: string, password: string) => {
  const res = await fetch("http://localhost:3030/api/v1/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);
  } else {
    const data = await res.json();
    throw new Error(data.messege);
  }
};
const refreshToken = async (oldToken: string) => {
  const res = await fetch("http://localhost:3030/api/v1/user/token", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: oldToken,
    }),
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.setItem("token", data.token);
  }
};
const deleteToken = async (token: string) => {
  const res = await fetch("http://localhost:3030/api/v1/user/token", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({token}),
  });
  if (res.ok) {
    const data = await res.json();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } else {
    const data = await res.json();
    throw new Error(data.messege);
  }
};

export default { refreshToken, deleteToken, getToken };
