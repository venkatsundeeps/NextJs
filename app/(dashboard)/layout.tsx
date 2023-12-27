"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full overflow-scroll relative h-screen bg-teal-500">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900 outline outline-2 outline-teal-500 ">
          <Sidebar />
        </div>
        <main className="md:pl-72  ">
          <Navbar></Navbar>
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
