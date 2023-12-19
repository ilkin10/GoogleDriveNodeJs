import React, { useState, useEffect } from "react";
import axios from "axios";

function ConditionalRendering({ folder_, onClose_ }) {
  const [sharedFolders, setSharedFolders] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSharedFolders = async () => {
    try {
      // Make a GET request to fetch shared folders
      const response = await axios.get(
        `http://localhost:3001/getSharedFoldersOfUserByEmail`,
        {
          userEmail: selectedUser,
        }
      );

      setSharedFolders(response.data);
      console.log("AA: ", sharedFolders);
    } catch (error) {
      console.error("Error fetching shared folders:", error);
    }
  };
  useEffect(() => {
    // Fetch shared folders when the component mounts
    fetchSharedFolders();
  }, []);

  useEffect(() => {
    // Fetch users when the component mounts
    fetchUsers();
  }, []);

  const onUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handleUnShare = async () => {
    // Perform unshare logic here
    try {
      if (!folder_) {
        console.error("Folder ID is missing");
        return;
      }

      // Make a POST request to unshare the folder with the selected user
      await axios.post("http://localhost:3001/unshareFolder", {
        folderId: folder_,
        userEmail: selectedUser,
      });

      // Display an alert when the folder is unshared successfully
      alert("Folder unshared successfully");

      onClose_(); // Close the share dialog after unsharing
    } catch (error) {
      console.error("Error unsharing folder:", error);
    }
  };

  const handleShare = async () => {
    try {
      if (!folder_) {
        console.error("Folder ID is missing");
        return;
      }
      if (!selectedUser) {
        console.error("User is missing");
        return;
      }

      // Make a POST request to share the folder with the selected user
      await axios.post("http://localhost:3001/shareFolder", {
        folderId: folder_,
        userEmail: selectedUser,
      });
      console.log(sharedFolders);

      // Display an alert when the folder is shared successfully
      alert("Folder shared successfully");

      onClose_(); // Close the share dialog after sharing
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

      {selectedUser &&
        (selectedUser.sharedFolders &&
        sharedFolders.map((folder) => folder.folderId === folder_) ? (
          <button onClick={handleUnShare}>Unshare</button>
        ) : (
          <button onClick={handleShare}>Share</button>
        ))}

      <button onClick={onClose_}>Cancel</button>
    </div>
  );
}

export default function ShareFolder({ folder, onClose }) {
  return <ConditionalRendering folder_={folder} onClose_={onClose} />;
}

//  const [selectedUser, setSelectedUser] = useState("");
//  const [users, setUsers] = useState([]);

//  const fetchUsers = async () => {
//    try {
//      const response = await axios.get("http://localhost:3001/getUsers");
//      setUsers(response.data);
//    } catch (error) {
//      console.error("Error fetching users:", error);
//    }
//  };

//  useEffect(() => {
//    // Fetch users when the component mounts
//    fetchUsers();
//  }, []);

//  const onUserChange = (event) => {
//    setSelectedUser(event.target.value);
//  };

//  const handleShare = async () => {
//    try {
//      if (!folder) {
//        console.error("Folder ID is missing");
//        return;
//      }
//      if (!selectedUser) {
//        console.error("User is missing");
//        return;
//      }
//      // Make a POST request to share the folder with the selected user
//      await axios.post("http://localhost:3001/shareFolder", {
//        folderId: folder,
//        userEmail: selectedUser,
//      });

//      // Display an alert when the folder is shared successfully
//      alert("Folder shared successfully");

//      onClose(); // Close the share dialog after sharing
//    } catch (error) {
//      console.error("Error sharing folder:", error);
//    }
//  };

//  return (
//    <div className="share-folder">
//      <h3>Share Folder</h3>
//      <select onChange={onUserChange} value={selectedUser}>
//        <option value="">Select User</option>
//        {users.map((user) => (
//          <option key={user.email} value={user.email}>
//            {user.email}
//          </option>
//        ))}
//      </select>
//      <button onClick={handleShare}>Share</button>
//      <button onClick={onClose}>Cancel</button>
//    </div>
//  );
