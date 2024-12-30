"use client";
import * as React from "react";

import { Button } from "../../../components/ui/button";
import AdminSignIn from "./_sign-in-tabs/admin-sign-in";
import B2BSignIn from "./_sign-in-tabs/b2b-sign-in";
import OrganisationSignIn from "./_sign-in-tabs/organisation-sign-in";
import UserSignIn from "./_sign-in-tabs/user-sign-in";

const SignIn = () => {
  const [signInTab, setSignInTab] = React.useState([
    {
      id: 0,
      title: "Admin",
      isSelected: true,
      component: <AdminSignIn />,
    },
    {
      id: 1,
      title: "User",
      isSelected: false,
      component: <UserSignIn />,
    },
    {
      id: 2,
      title: "Organisation",
      isSelected: false,
      component: <OrganisationSignIn />,
    },
    {
      id: 3,
      title: "B2B",
      isSelected: false,
      component: <B2BSignIn />,
    },
  ]);

  const activeTab = React.useMemo(
    () => signInTab.find((item) => item.isSelected)?.id,
    [signInTab]
  );

  const handleSelectNotificaitonTab = (id: number) => {
    setSignInTab((prev) =>
      prev.map((item) => ({
        ...item,
        isSelected: item.id === id,
      }))
    );
  };

  return (
    <div className="auth-form">
      <div className="flex items-center">
        <div className="flex items-center">
          {signInTab.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              className={`px-8 py-4 rounded-none hover:bg-transparent text-primary font-normal hover:text-primary ${
                tab.isSelected && "border-b-2 border-b-primary font-bold"
              }`}
              onClick={() => {
                handleSelectNotificaitonTab(tab.id);
              }}
            >
              {tab.title}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-5">
        {signInTab.find((item) => item.id === activeTab)?.component}
      </div>
    </div>
  );
};

// const getTabIcon = (tabTitle: string, activeTab: number | undefined) => {
//   switch (tabTitle) {
//     case "Save":
//       return activeTab === 1 ? (
//         <img src={BookmarkYellow} alt="BookmarkYellow" className="h-6 w-6" />
//       ) : (
//         <img src={BookmarkGray} alt="BookmarkGray" className="h-6 w-6" />
//       );
//     case "Archive":
//       return activeTab === 2 ? (
//         <img src={ArchiveFill} alt="ArchiveFill" className="h-6 w-6" />
//       ) : (
//         <Icon icon="Archive" />
//       );
//     default:
//       return null;
//   }
// };

export default SignIn;
