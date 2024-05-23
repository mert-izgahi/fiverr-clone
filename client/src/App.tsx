import { Route, Routes } from "react-router-dom";
import {
  DashboardAccountPage,
  DashboardLayout,
  DashboardOverviewPage,
  DashboardSettingsPage,
  DashboardConversationsListPage,
  DashboardConversationsDetailsPage,
  DashboardOrdersListPage,
  DashboardOrdersDetailsPage,
  DashboardGigsListPage,
  DashboardGigsCreatePage,
  DashboardGigsEditPage,
  DashboardCategoriesListPage
} from "./pages/dashboard";
function App() {
  return <Routes>
    <Route path="/" element={<DashboardLayout />}>
      <Route index element={<DashboardOverviewPage />} />
      <Route path="account" element={<DashboardAccountPage />} />
      <Route path="settings" element={<DashboardSettingsPage />} />
      <Route path="conversations">
        <Route index element={<DashboardConversationsListPage />} />
        <Route path=":id" element={<DashboardConversationsDetailsPage />} />
      </Route>
      <Route path="orders">
        <Route index element={<DashboardOrdersListPage />} />
        <Route path=":id" element={<DashboardOrdersDetailsPage />} />
      </Route>
      <Route path="gigs">
        <Route index element={<DashboardGigsListPage />} />
        <Route path="create" element={<DashboardGigsCreatePage />} />
        <Route path=":id" element={<DashboardGigsEditPage />} />
      </Route>
      <Route path="categories" element={<DashboardCategoriesListPage />} />
    </Route>
  </Routes>;
}

export default App;
