// import React, { useState } from "react";
// import { useStore } from "../store/store";

// function PostCategory() {
//   const { token } = useStore();

//   const [categoryName, setCategoryName] = useState("");

//   const handleFormSubmit = async (e) => {
//     try {
//       e.preventDefault();

//       const res = await fetch(
//         `http://localhost:4000/admin/dashboard/post-category-api`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ categoryName }),
//         },
//       );
//       console.log(res, "res from backend after hitting post-category-api");

//       if (res.ok) {
//         const data = await res.json();
//         console.log(data, "data from backend after hitting post-category-api");
//         alert(data.message);
//         setCategoryName("");
//       }
//     } catch (error) {
//       console.error("Error posting category:", error);
//     }
//   };

//   return (
//     <>
//       <div>PostCategory</div>

//       <form onSubmit={handleFormSubmit}>
//         <label htmlFor="categoryName">Category Name:</label>
//         <input
//           type="text"
//           id="categoryName"
//           name="categoryName"
//           value={categoryName}
//           onChange={(e) => setCategoryName(e.target.value)}
//           required
//         />
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//     </>
//   );
// }

// export default PostCategory;

import React, { useState } from "react";
import { useStore } from "../store/store";
import "../css/PostCategory.css";

function PostCategory() {
  const { token } = useStore();
  const [categoryName, setCategoryName] = useState("");

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch(
        "http://localhost:4000/admin/dashboard/post-category-api",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ categoryName }),
        },
      );

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        setCategoryName("");
      }
    } catch (error) {
      console.error("Error posting category:", error);
    }
  };

  return (
    <div className="post-category-container">
      <div className="post-category-card">
        <h2 className="title">Add New Category</h2>

        <form onSubmit={handleFormSubmit} className="category-form">
          <div className="form-group">
            <label htmlFor="categoryName">Category Name</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              placeholder="Enter category name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostCategory;
