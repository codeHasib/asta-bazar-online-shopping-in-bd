import Footer from "@/components/public/Footer";
import Navbar from "@/components/public/Nav";
import FloatingCart from "@/components/shared/FloatingCart";
import SplashWrapper from "@/components/SplashWrapper";

const PublicLayout = ({ children }) => {
  return (
    <section>
      <SplashWrapper>
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
        <FloatingCart></FloatingCart>
      </SplashWrapper>
    </section>
  );
};

export default PublicLayout;
