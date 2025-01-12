import React from "react";
import { useState } from "react";
// for text area editor
import Editor from "react-simple-wysiwyg";
// for form validation
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  // for editor
  const [html, setHtml] = useState();
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
      const res = await fetch("http://127.0.0.1:8000/api/store", {
        method: "POST",
        body: formData, // Use FormData for file upload
      });

      const result = await res.json();

      if (result.status) {
        toast.success("Blog created successfully!");
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

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Create Blog</h4>
        <a href="/" className="btn btn-dark">
          Back
        </a>
      </div>
      <div className="card border-0 shadow-lg">
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                {...register("title", { required: true })}
                type="text"
                className={`form-control ${errors.title && "is-invalid"} `}
                placeholder="Title"
              />
              {errors.title?.type === "required" && (
                <p className="invalid-feedback">tille field is required</p>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Short Description</label>
              <textarea
                {...register("shortDesc")}
                rows="5"
                cols="30"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <br />
              <Editor
                value={html}
                containerProps={{ style: { height: "700px" } }}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              <br />
              <input
                {...register("image")}
                type="file"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <br />
              <input
                {...register("author", { required: true })}
                type="text"
                placeholder="Author"
                className={`form-control ${errors.author && "is-invalid"} `}
              />
              {errors.author?.type === "required" && (
                <p className="invalid-feedback">author field is required</p>
              )}
            </div>
            <button className="btn btn-dark">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
