const apiUrl = "https://tasker-server.vercel.app/";

export const fetchProjects = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/projects/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (response.error) {
        throw new Error("Request: " + response.message);
      }
      const projects = await response.json();
      return projects;
    } catch (error) {
      console.error("Error Fetching Projects: ", error);
      throw error;
    }
};

export const addToDoCard = async (newCard, projectId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newCard, projectId }),
  };

  try {
    const response =  await fetch(`${apiUrl}/projects/cards/todo/add`, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add todo card.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding todo card:", error.message);
    throw error;
  }
};
export const addReviewCard = async (newCard, projectId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newCard, projectId }),
  };

  try {
    const response =  await fetch(`${apiUrl}/projects/cards/review/add`, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add review card.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding review card:", error.message);
    throw error;
  }
};
export const addProgressCard = async (newCard, projectId) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newCard, projectId }),
  };

  try {
    const response =  await fetch(`${apiUrl}/projects/cards/progress/add`, requestOptions);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add progress card.");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding progress card:", error.message);
    throw error;
  }
};