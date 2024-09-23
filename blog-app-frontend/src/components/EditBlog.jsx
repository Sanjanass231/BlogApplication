import React from "react";
import { useState } from "react";
// for text area editor
import Editor from "react-simple-wysiwyg";
// for form validation
import { Form, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
    const [html, setHtml] = useState();
    const params = useParams();

  const navigate = useNavigate();
  //  for form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Submit form
  const formSubmit = async (data) => {
    const formData = new FormData();

    // Append all the fields to the FormData object
    formData.append("title", data.title);
    formData.append("shortDesc", data.shortDesc);
    formData.append("description", html); // HTML content from WYSIWYG editor
    formData.append("author", data.author);

    // Append the file (if uploaded)
    if (data.image[0]) {
      formData.append("image", data.image[0]); // Attach the first file
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/edit/${params.id}`, {
        method: "POST",
        body: formData, // Use FormData for file upload
      });

      const result = await res.json();

      if (result.status) {
        toast.success("Blog updated successfully!");
        navigate("/");
      } else {
        toast.error(result.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("Failed to create the blog.");
    }
  };

  function onChange(e) {
    setHtml(e.target.value);
  }
  return <div>hkjh</div>;
}

export default EditBlog;
