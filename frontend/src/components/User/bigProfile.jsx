import React, { useState } from "react";
import Profile from "./profile";
import HistoriqueCommandes from "./HistoriqueCommandes";
import EditProfileForm from "./EditProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";
import "../../assets/bigProfile.css";

export default function BigProfile() {
  const [rightView, setRightView] = useState("history"); 

  const Edit = () => setRightView("edit");
  const Password = () => setRightView("password");
  const Back = () => setRightView("history");

  return (
    <div className="big-profile-layout">
      <div className="big-profile-left">
        <Profile onEdit={Edit} onPassword={Password} />
      </div>
      <div className="big-profile-right">
        {rightView === "history" && <HistoriqueCommandes />}
        {rightView === "edit" && <EditProfileForm onBack={Back} />}
        {rightView === "password" && <ChangePasswordForm onBack={Back} />}
      </div>
    </div>
  );
}