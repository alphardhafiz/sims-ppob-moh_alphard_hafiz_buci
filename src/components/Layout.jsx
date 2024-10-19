/* eslint-disable react/prop-types */
import Navbar from "./Navbar"; 

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col gap-4">
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
