import { useSelector } from "react-redux";

const Banners = () => {
  const banners = useSelector((state) => state.banners.banners);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">Temukan promo menarik</h2>
      <div className="relative w-full overflow-hidden h-48">
        <div className="flex absolute left-0 animate-scroll gap-4">
          {[...banners, ...banners].map((banner, index) => (
            <img 
              key={index} 
              src={banner.banner_image} 
              alt={banner.banner_name}
              className="h-full w-auto object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banners;
