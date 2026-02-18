import { useState, useEffect, useRef } from 'react';

export function State() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Hook pour détecter quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Composant pour animer les nombres
  const AnimatedCounter = ({  suffix = "", prefix = "" ,label= ""}) => {
    return (
      <span className="text-xl sm:text-3xl md:text-nowrap font-bold text-[#AF937F]    tabular-">
      {suffix}  {prefix} {label}
      </span>
    );
  };

  const stats = [
    {
      number: 10,
      suffix: "+",
      label: "ans d'expérience",
    },
    {
      number: 30,
      suffix: "+",
      label: "collaborateurs",
    },
    {
      number: 100,
      suffix: "",
      label: "% satisfaction client",
    }
  ];

  return (
    <div ref={sectionRef} className=" sm:py-16   ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex  flex-wrap md:flex-nowrap justify-center  md:gap-0 my-4 md:my-0    px-4 sm:px-6 lg:px-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`
                 rounded-2xl px-8 lg:p-8
                transition-all duration-500 

             
              `}
          
            >
              <div className="text-center">
                <div className="mb-4">
                <span className="text-xl sm:text-3xl md:text-nowrap font-bold text-[#AF937F]    tabular-nums">
      {stat.suffix}  {stat.prefix}{stat.number} {stat.label}
      </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    
    </div>
  );
}
