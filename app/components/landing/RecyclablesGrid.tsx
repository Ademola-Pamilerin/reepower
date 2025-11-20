import Image from "next/image";
import Link from "next/link";

interface RecyclableItem {
  id: number;
  image: string;
  icon: string;
  type: string;
  weight: string;
  price: string;
}

interface RecyclablesGridProps {
  title: string;
  titleHighlight: string;
  description: string;
  items: RecyclableItem[];
  buttonText?: string;
  gridColumns?: number;
}

export default function RecyclablesGrid({
  title,
  titleHighlight,
  description,
  items,
  gridColumns,
  buttonText = "See All",
}: RecyclablesGridProps) {
  const itemCount = items.length;
  const isMultipleOf4 = itemCount % 4 === 0;
  const isGreaterThan4 = itemCount > 4;
  const isLessThan4 = itemCount < 4;

  // Split items if greater than 4
  const firstFourItems = isGreaterThan4 ? items.slice(0, 4) : [];
  const remainingItems = isGreaterThan4 ? items.slice(4) : [];

  const renderItemContent = (item: typeof items[0]) => (
    <>
      <div className="relative w-full h-[200px]">
        <Image
          src={item.image}
          alt={item.type}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-4 h-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-black font-parkinsans">
            {item.type}
          </span>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">
            Weight: <span className="font-semibold">{item.weight}</span>
          </p>
          <p className="text-sm text-gray-600">
            Price: <span className="font-semibold">{item.price}</span>
          </p>
        </div>
        <Link
          href={`/item/${item.id}`}
          className="w-full px-4 py-2 rounded-lg bg-green-600 text-white font-parkinsans font-semibold hover:bg-green-700 transition-colors text-center inline-block"
        >
          Make an Offer
        </Link>
      </div>
    </>
  );

  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center lg:items-start md:justify-between mb-12">
          <div className="mb-6 md:mb-0 md:flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-black leading-tight font-parkinsans">
              {title.split(titleHighlight)[0]}
              <span className="text-green-600">{titleHighlight}</span>
              {title.split(titleHighlight)[1]}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
          <div className="md:ml-8">
            <Link
              href="/all"
              className="px-8 py-4 rounded-lg border border-green-600 text-green-600 font-parkinsans font-semibold hover:bg-green-50 transition-colors inline-block"
            >
              {buttonText}
            </Link>
          </div>
        </div>

        {/* Items Grid */}
        {isMultipleOf4 ? (
          // Multiple of 4: Full width, start from left
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {renderItemContent(item)}
              </div>
            ))}
          </div>
        ) : isGreaterThan4 ? (
          // Greater than 4: First 4 from left, remaining centered
          <div className="w-full">
            {/* First 4 items - left aligned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {firstFourItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {renderItemContent(item)}
                </div>
              ))}
            </div>
            {/* Remaining items - centered */}
            <div className="flex flex-wrap justify-center gap-6">
              {remainingItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-xs"
                >
                  {renderItemContent(item)}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Less than 4: All centered
          <div className="flex flex-wrap justify-center gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-xs"
              >
                {renderItemContent(item)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
