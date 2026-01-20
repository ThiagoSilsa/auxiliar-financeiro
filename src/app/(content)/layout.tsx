import Header from "@/components/created/header/header";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>
    <Header/>
    {children}
    </main>;
}
