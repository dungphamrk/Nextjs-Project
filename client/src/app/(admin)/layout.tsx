"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AccountBookOutlined,
  BellOutlined,
  HomeOutlined,
  MenuOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DashboardOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Sidebar, Menu, MenuItem, menuClasses } from "react-pro-sidebar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only run on the client side
    setIsClient(true);
    if (isClient) {
      setBroken(window.matchMedia("(max-width: 800px)").matches);

      const handleResize = () => {
        setBroken(window.matchMedia("(max-width: 800px)").matches);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]);

  useEffect(() => {
    if (isClient) {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        if (!user.role) {
          router.push("/home");
        }
      }
    }
  }, [isClient, router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        className="text-white hover:bg-black"
        width="250px"
        collapsed={collapsed}
        backgroundColor="#031525"
        onBackdropClick={() => setToggled(false)}
        transitionDuration={1000}
        toggled={toggled}
        customBreakPoint="800px"
        onBreakPoint={setBroken}
        rootStyles={{
          minWidth: "80px",
          minHeight: "100%",
        }}
      >
        <Menu
          rootStyles={{
            [`.${menuClasses.icon}`]: {
              borderRadius: "100%",
              backgroundColor: "#33539e",
              color: "#96a7bf",
            },
          }}
          menuItemStyles={{
            button: {
              minWidth: "80px",
              [`&.active`]: {
                backgroundColor: "#33539e",
                color: "#b6c8d9",
              },
              "&:hover": {
                backgroundColor: "#0f243a",
              },
            },
          }}
        >
          <MenuItem onClick={() => router.push("/UserList")} icon={<UserOutlined />}>
            User
          </MenuItem>
          <MenuItem onClick={() => router.push("/Post")} icon={<AppstoreOutlined />}>
           Bài đăng
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className="flex-1 flex flex-col">
        <nav className="flex justify-between items-center p-3 bg-white shadow-md">
          {broken ? (
            <button className="sb-button" onClick={() => setToggled(!toggled)}>
              <MenuOutlined />
            </button>
          ) : (
            <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
              <MenuOutlined />
            </button>
          )}
        </nav>
        <div className="flex-1 p-4 bg-gray-100 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
