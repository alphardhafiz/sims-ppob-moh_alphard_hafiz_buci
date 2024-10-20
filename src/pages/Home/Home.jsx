import Banners from "../../components/Banners";
import NameBalanceSection from "../../components/NameBalanceSection";
import ServicesSection from "../../components/ServicesSection";

const Home = () => {

  return (
    <div className="flex flex-col gap-10 px-24">
      <NameBalanceSection />
      <ServicesSection />
      <Banners />
    </div>
  );
};

export default Home;
