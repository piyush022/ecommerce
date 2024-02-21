import Header from "./Header";
import Footer from "./Footer";

import { Toaster, toast } from "sonner";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Toaster position="top-left" richColors />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
