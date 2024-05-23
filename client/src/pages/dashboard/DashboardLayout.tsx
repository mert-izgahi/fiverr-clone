import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";
import DashboardHeader from "../../layout/DashboardHeader";
import DashboardSidebar from "../../layout/DashboardSidebar";

function DashboardLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: false, mobile: !opened },
      }}
    >
      <AppShell.Header className="bg-body-tertiary">
        <DashboardHeader toggle={toggle} opened={opened} />
      </AppShell.Header>
      <AppShell.Navbar className="bg-body-tertiary">
        <DashboardSidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;
