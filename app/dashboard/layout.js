import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate">
      {/* Sidebar */}
      <div className="w-64 bg-slate-50 py-4 px-6 border-r-2">
        {/* Sidebar content goes here */}
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        {/* Add links to navigate to different sections */}
        <ul className="mt-4">
          <li className="mb-2"><Link href="/dashboard/flight" className="btn btn-ghost">Flight Ticket</Link></li>
          <li className="mb-2"><Link href="/dashboard/booking" className="btn btn-ghost">User Bookings</Link></li>
          {/* Add more links as needed */}
        </ul>
      </div>
      {/* Main content area */}
      <div className="flex-1 p-4 bg-slate-50">
        {children}
      </div>
    </div>
  );
};

export default Layout;
