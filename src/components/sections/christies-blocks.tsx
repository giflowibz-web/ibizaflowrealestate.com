import React from 'react';
import Image from 'next/image';

interface ChristieBlockProps {
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
}

const ChristieBlock: React.FC<ChristieBlockProps> = ({
  label,
  title,
  description,
  imageSrc,
  reverse = false,
}) => {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
        {/* Dark Overlay for content readability */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
      </div>

      {/* Content Container */}
      <div className="container relative h-full flex items-center">
        <div 
          className={`max-w-[600px] text-white p-8 md:p-12 transition-all duration-700 delay-100 ${
            reverse ? 'ml-auto text-right md:text-right' : 'mr-auto text-left'
          }`}
        >
          <span className="block font-body text-[14px] font-bold uppercase tracking-[0.2em] text-[#B69E76] mb-4">
            {label}
          </span>
          <h2 className="font-display text-[40px] md:text-[56px] leading-[1.1] mb-6">
            {title}
          </h2>
          <p className="font-body text-[16px] md:text-[18px] leading-[1.6] opacity-90 mb-8 max-w-[500px] ml-0 mr-auto group-hover:opacity-100 transition-opacity">
            {description}
          </p>
          <a 
            href="#" 
            className="inline-flex items-center group/btn"
          >
            <span className="bg-[#B69E76] text-white px-8 py-3.5 text-[14px] font-bold uppercase tracking-[0.1em] transition-all duration-300 group-hover/btn:bg-white group-hover/btn:text-black">
              Explore
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

const ChristiesBlocks = () => {
  // Using the provided assets from the <assets> tag
  const blocks = [
    {
      label: "Explore",
      title: "Christie’s Auction House",
      description: "Christie’s Real Estate Auction House is the premier destination for selling and acquiring the world’s most exclusive properties. Leveraging Christie’s esteemed legacy in luxury, our auction platform connects motivated sellers with high-net-worth buyers, ensuring a competitive and transparent bidding process that maximizes value.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/-6150944162079123331-29.jpg",
      reverse: false,
    },
    {
      label: "Explore",
      title: "Christie’s Art Spotlight",
      description: "Christie’s Art Spotlight showcases the finest works from emerging and established artists, offering exclusive insights into the world of art. Whether you're a seasoned collector or new to the scene, our curated features provide expert commentary, market trends, and a closer look at exceptional pieces.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/images_28.png",
      reverse: true,
    },
    {
      label: "Explore",
      title: "Christie’s International Social",
      description: "Stay engaged with the world of fine art, luxury, and exceptional collectibles through Christie's International Social. Join our global community for exclusive updates, behind-the-scenes content, and real-time auction highlights. Follow us for expert insights, stunning collections, and a front-row seat to the most prestigious events in the industry.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a6bda00f-9d85-4858-8c8d-a58f8ab1c935-aaronkirman-com/assets/images/-6150944162079123331-29.jpg", // Reusing high quality asset since 3rd specific one was not distinct in list
      reverse: false,
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {blocks.map((block, index) => (
        <ChristieBlock 
          key={index}
          label={block.label}
          title={block.title}
          description={block.description}
          imageSrc={block.imageSrc}
          reverse={block.reverse}
        />
      ))}
    </div>
  );
};

export default ChristiesBlocks;