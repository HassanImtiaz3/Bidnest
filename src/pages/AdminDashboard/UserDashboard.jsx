import { useState } from "react";
import { TableWithPagination } from "./Table";
import { UserDetailCard } from "./UserDetailCard";
import { Box } from "@mui/material";

export function UserDashboard() {
  const [mode, setMode] = useState("list");
  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
    setMode("view");
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setMode("edit");
  };

  const handleBack = () => {
    setMode("list");
  };

  const handleSave = async (updatedUser) => {
    try {
      // Here you would make an API call to update the user
      // For now, we'll just log it and switch to view mode
      console.log("Updated user data:", updatedUser);
      setSelectedUser(updatedUser);
      setMode("view");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Box>
      {mode === "list" && (
        <TableWithPagination onView={handleView} onEdit={handleEdit} />
      )}
      
      {(mode === "view" || mode === "edit") && selectedUser && (
        <UserDetailCard 
          user={selectedUser} 
          mode={mode}
          onBack={handleBack}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}