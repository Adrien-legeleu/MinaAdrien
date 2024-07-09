import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { HeaderParams } from "@/components/Header";
import { useDescriptionContext } from "@/context/DescriptionContext";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  const { description } = useDescriptionContext();

  return (
    <div className="py-8 px-12">
      <HeaderParams />
      <div>
        <p>{description[0]}</p>
      </div>
    </div>
  );
};
