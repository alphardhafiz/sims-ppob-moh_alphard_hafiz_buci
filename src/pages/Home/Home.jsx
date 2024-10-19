import { useSelector } from "react-redux";
import NameBalanceSection from "../../components/NameBalanceSection";

const Home = () => {
  const services = useSelector((state) => state.services).services
  console.log(services)

  return (
    <div className="flex flex-col gap-10 px-24">
      <NameBalanceSection />
      <div className="flex w-full justify-between">
        {services.map((service, index) => (
           <div key={index} className="flex flex-col items-center">
           <div className="w-12 h-12 flex items-center justify-center mb-2">
             <img src={service.service_icon} alt={service.service_name} className="w-full h-full object-contain" />
           </div>
           <p className="text-xs text-center">{service.service_name}</p>
         </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
