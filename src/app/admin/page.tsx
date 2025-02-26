import Stars from "~/components/background/stars";
import AdminDashboard from "./_components/dashboard";

async function AdminPage() {
  return (
    <>
      <div className="container mx-auto flex min-h-[80vh] flex-col gap-8 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Reports
        </h1>
        
        <AdminDashboard />
      </div>
      <Stars />
    </>
  );
}

export default AdminPage;
