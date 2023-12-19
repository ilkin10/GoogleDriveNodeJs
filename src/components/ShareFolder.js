import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ShareFolder({ folder, onClose }) {
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
      if (!folder) {
        console.error("Folder ID is missing");
        return;
      }
      if (!selectedUser) {
        console.error("User is missing");
        return;
      }
      // Make a POST request to share the folder with the selected user
      await axios.post("http://localhost:3001/shareFolder", {
        folderId: folder,
        userEmail: selectedUser,
      });

      // Display an alert when the folder is shared successfully
      alert("Folder shared successfully");

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
