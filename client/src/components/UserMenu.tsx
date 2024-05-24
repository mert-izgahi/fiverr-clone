import { Avatar, Menu } from "@mantine/core";
import { useAppSelector } from "../redux/store";
import { useSignOutMutation } from "../redux/auth/api";

function UserMenu() {
  const { currentUser } = useAppSelector((state) => state.auth);
  const [signOut] = useSignOutMutation();
  const onSignOut = async () => {
    await signOut({});
    window.location.href = "/";
  };
  return (
    <Menu width={160}>
      <Menu.Target>
        <Avatar src={currentUser?.imageUrl} alt={currentUser?.firstName} />
      </Menu.Target>
      <Menu.Dropdown className="bg-body">
        <Menu.Label>{currentUser?.firstName}</Menu.Label>
        <Menu.Item
          onClick={onSignOut}
          leftSection={<i className="bi bi-box-arrow-right"></i>}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default UserMenu;
