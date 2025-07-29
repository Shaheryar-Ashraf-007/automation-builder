import InfoBar from "../components/infobar";
import Sidebar from "../components/sidebar"
export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div >
      

      <div className="absolute left-0 w-full top-0">
        <Sidebar />
        <InfoBar />
      
              {children}
      </div>
    </div>
  );
}
