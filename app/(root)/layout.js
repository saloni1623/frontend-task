import Navbar from "@/component/Navbar";

export default function RootLayout({ children }) {
    return (
     <main>
        <Navbar/>
        <section>
      {children}
      </section>
     </main>
    );
  }
  