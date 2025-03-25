export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
        <div className="h-12 w-full bg-white"></div>
        {children}
        </>
    )
}