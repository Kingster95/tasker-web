const apiUrl = "http://localhost:5000";

export const login = async (email, password) => {
  try {
    const response =await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.error) {
      throw new Error("Request: " + response.message);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Loggin In: ", error);
    throw error;
  }
};

export const register = async (email, password) => {
    try {
      const response =await fetch(`${apiUrl}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Request: " + response.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error Loggin In: ", error);
      throw error;
    }
  };