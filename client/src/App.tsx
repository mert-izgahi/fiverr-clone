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
  DashboardCategoriesListPage,
  DashboardUsersListPage,
  DashboardUsersEditPage,
  DashboardNotificationsPage,
  DashboardReviewsPage,
} from "./pages/dashboard";

import {
  RootLayout,
  RootHomePage,
  RootExplorePage,
  RootSignInPage,
  RootSignUpPage,
  RootForgetPasswordPage,
  RootGigPage,
  RootPaymentPage,
  RootPaymentResultPage,
  RootOrdersPage,
} from "./pages/root";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<RootHomePage />} />
        <Route path="explore" element={<RootExplorePage />} />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <RootOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route path="gigs/:id" element={<RootGigPage />} />
        <Route
          path="gigs/:id/payment"
          element={
            <ProtectedRoute>
              <RootPaymentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="payment-result"
          element={
            <ProtectedRoute>
              <RootPaymentResultPage />
            </ProtectedRoute>
          }
        />
        <Route path="sign-in" element={<RootSignInPage />} />
        <Route path="sign-up" element={<RootSignUpPage />} />
        <Route path="forget-password" element={<RootForgetPasswordPage />} />
      </Route>
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardOverviewPage />} />
        <Route path="account" element={<DashboardAccountPage />} />
        <Route path="notifications" element={<DashboardNotificationsPage />} />
        <Route path="reviews" element={<DashboardReviewsPage />} />
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
        <Route path="users">
          <Route index element={<DashboardUsersListPage />} />
          <Route path=":id" element={<DashboardUsersEditPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
