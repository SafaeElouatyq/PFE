import React, { useState } from "react";
import ProfileAdmin from "./profileAdmin";
import EditProfileFormAdmin from "./EditProfileFormAdmin";
import ChangePasswordFormAdmin from "./ChangePasswordFormAdmin";
import AddAdminForm from "./AddAdminForm";
import "../../assets/bigProfile.css";

export default function BigProfileAdmin() {
  const [rightView, setRightView] = useState("");

  const Edit = () => setRightView("edit");
  const Password = () => setRightView("password");
  const AddAdmin = () => setRightView("addAdmin");
  const Back = () => setRightView("");

  return (
    <div className="big-profile-layout">
      <div className="big-profile-left">
        <ProfileAdmin onEdit={Edit} onPassword={Password} onAddAdmin={AddAdmin} />
      </div>
      <div className="big-profile-right">
        {rightView === "" && (
          <div style={{ color: "#bbb", fontSize: 22, margin: "auto" }}>
            
          </div>
        )}
        {rightView === "edit" && <EditProfileFormAdmin onBack={Back} />}
        {rightView === "password" && <ChangePasswordFormAdmin onBack={Back} />}
        {rightView === "addAdmin" && <AddAdminForm onBack={Back} />}
      </div>
    </div>
  );
}