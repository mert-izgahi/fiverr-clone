import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

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
      DashboardLayout
    </AppShell>
  );
}

export default DashboardLayout;
