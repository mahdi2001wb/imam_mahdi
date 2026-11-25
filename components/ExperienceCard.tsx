import { ReactNode } from "react";

interface Props {
  title: string;
  subTitle: string;
  icon: ReactNode;
}

const ExperienceCard = ({ title, subTitle, icon }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <span className="w-12 h-12 rounded-full  border-[1px] border-blue-600 flex items-center justify-center">
        <span className="text-2xl text-white">{icon}</span>
      </span>
      <div>
        <h3 className="text-2xl font-bold text-white hover:text-blue-600">{title}</h3>
        <p className="text-base tracking-wide text-gray-500">{subTitle}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
