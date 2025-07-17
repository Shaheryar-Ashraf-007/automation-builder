
export default function ConnectionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
    <div className="border-l-[1px] border-t-[1px] pb-20 h-screen rounded-l-3xl border-muted-foreground/20 overflow-screen">
      {children}
      
    </div>

    </div>
  );
}
