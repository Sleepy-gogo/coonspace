import Stars from "~/components/background/stars";
import AdminDashboard, {
  AdminDashboardSkeleton,
} from "./_components/dashboard";
import { Suspense } from "react";

async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const pageQuery = (await searchParams).page;
  const currentPage =
    typeof pageQuery === "string" ? parseInt(pageQuery, 10) : 1;

  const page = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  return (
    <>
      <div className="container mx-auto flex min-h-[80vh] flex-col gap-8 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Reports
        </h1>

        <Suspense fallback={<AdminDashboardSkeleton />}>
          <AdminDashboard currentPage={page} />
        </Suspense>
      </div>
      <Stars />
    </>
  );
}

export default AdminPage;
