import { useState } from "react";
import { TableWithPagination } from "./VendorTable";
import { VendorDetailCard } from "./VendorDetailCard";
import { Box } from "@mui/material";

export function VendorsDashboard() {
  const [mode, setMode] = useState("list");
  const [selectedVendor, setSelectedVendor] = useState(null);

  const handleView = (vendor) => {
    setSelectedVendor(vendor);
    setMode("view");
  };

  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setMode("edit");
  };

  const handleBack = () => {
    setMode("list");
  };

  const handleSave = async (updatedVendor) => {
    try {
      // Here you would make an API call to update the vendor
      console.log("Updated vendor data:", updatedVendor);
      setSelectedVendor(updatedVendor);
      setMode("view");
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  return (
    <Box>
      {mode === "list" && (
        <TableWithPagination onView={handleView} onEdit={handleEdit} />
      )}
      
      {(mode === "view" || mode === "edit") && selectedVendor && (
        <VendorDetailCard 
          vendor={selectedVendor} 
          mode={mode}
          onBack={handleBack}
          onSave={handleSave}
        />
      )}
    </Box>
  );
}