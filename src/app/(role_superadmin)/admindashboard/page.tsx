import Page from "@/components/common/Page/Page";
import {Box} from "@/components/common/Box/Box";
import AdminSidebar from "@/components/admin/AdminSidebar";
const AdminDashboard = () => {
  return (
    <Page>
      <Box className="flex flex-col lg:flex-row lg:space-x-6 justify-between text-black my-10 space-x-0 w-[95%]">
        <AdminSidebar/>
      </Box>
    </Page>
  );
}

export default AdminDashboard