export const fetchData = async (url, method, body, accessToken) => {
  try {
    const options = {
      method: method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json", // You can adjust the content type based on your needs
      },
    };
    if (body) {
      options.body = JSON.stringify(body); // If body is provided, stringify it
    }

    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
