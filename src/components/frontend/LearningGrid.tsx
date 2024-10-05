import React from "react";

interface HighlightTextProps {
  text: string;
}

const HighlightText: React.FC<HighlightTextProps> = ({ text }) => (
  <span className="highlight">{text}</span>
);

// interface CTAButtonProps {
//   active: boolean;

//   children: React.ReactNode;
// }

// const CTAButton: React.FC<CTAButtonProps> = ({ active, children }) => {
//   return (
//     <a
//       href={'#'}
//       className={`cta-button ${active ? 'active' : ''}`}
//     >
//       {children}
//     </a>
//   );
// };



// Define the type for the learning grid item
interface LearningGridItem {
  order: number;
  heading: string;
  highliteText?: string; // Optional as it's only used in one item
  description: string;
  BtnText?: string; // Optional as it's only used in one item
  BtnLink?: string; // Optional as it's only used in one item
}

// Define the learning grid array
const LearningGridArray: LearningGridItem[] = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid: React.FC = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"} ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-[294px]"
                : card.order % 2 === 0
                ? "bg-richblack-800 h-[294px]"
                : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"}`}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold ">
                  {card.heading}
                  {card.highliteText && <HighlightText text={card.highliteText} />}
                </div>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>

                {card.BtnText && card.BtnLink && (
                  <div className="w-fit mt-2">
                    <button >
                      button
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
                <p className="text-richblack-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


export default LearningGrid;
