import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShareFolder({ onClose }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  const onUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleShare = async () => {
    try {
      // Implement the logic to share the folder with the selected user
      // You may need to make a POST request to your server with the folder ID and selected user ID
      // Example: await axios.post("http://localhost:3001/shareFolder", { folderId: folder._id, userId: selectedUser });
      console.log("Share logic goes here");
      onClose(); // Close the share dialog after sharing
    } catch (error) {
      console.error("Error sharing folder:", error);
    }
  };

  return (
    <div className="share-folder">
      <h3>Share Folder</h3>
      <select onChange={onUserChange} value={selectedUser}>
        <option value="">Select User</option>
        {users.map((user) => (
          <option key={user.email} value={user.email}>
            {user.email}
          </option>
        ))}
      </select>
      <button onClick={handleShare}>Share</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
