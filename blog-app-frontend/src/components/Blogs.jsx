import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

const Blogs = () => {
  
  const [blogs, setBlogs] = useState();
  const fetchBlogs = async () => {
    const res = await fetch('http://127.0.0.1:8000/api/index');
    const result = await res.json();
    setBlogs(result.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container">
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Blogs</h4>
        <a href="/create" className="btn btn-dark">
          Create
        </a>
      </div>
      <div className="row">
        {
          (blogs) && blogs.map((blog) => {
            return (<BlogCard blog={blog} />)
          })
        }
      
      </div>
    </div>
  );
}

export default Blogs
