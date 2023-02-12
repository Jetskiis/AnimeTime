import Card from "./Card";

//card view - default view for website

const CardView = () => {
  return (
    <div>
      <h2 className="px-5 pt-5 text-xl font-bold uppercase text-gray-600">
        TV
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        TV Shorts
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        Leftover
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        Movie
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
      </div>

      <h2 className="px-5 pt-4 text-xl font-bold uppercase text-gray-600">
        ONA / OVA / Special
      </h2>
      <div className="grid gap-y-5 px-4 py-5 md:grid-cols-2 md:gap-x-5 base:grid-cols-3 base:gap-x-1">
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
        <Card className="col-span-1" />
      </div>
    </div>
  );
};

export default CardView;
