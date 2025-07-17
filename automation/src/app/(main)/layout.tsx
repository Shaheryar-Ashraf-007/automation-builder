import InfoBar from "../components/infobar";
import Sidebar from "../components/sidebar"
export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      <Sidebar />

      <div className="w-full">
        <InfoBar />
      
              {children}
      </div>
    </div>
  );
}
