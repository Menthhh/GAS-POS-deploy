"use server";

export const onSubmit = async (formData) => {

  const response = await fetch("/api/create-receive", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  let result_text;
  if (response.ok) {
    const result = await response.json();
    result_text = result;
    console.log("Success:", result_text);
  } else {
    result_text = response.statusText;
    console.error("Error:", result_text);
  }

  return result_text;
};
