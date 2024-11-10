import Navbar from "@/component/Navbar";
import { getAuth } from "firebase/auth";

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