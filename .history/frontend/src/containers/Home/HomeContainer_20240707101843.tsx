import { IGroupDetailsProps } from "@/app/home/[id]/page";
import { HeaderParams } from "@/components/Header";
type GroupContainerDetailsProps = IGroupDetailsProps;
export const HomeContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  return (
    <div className="py-8 px-12">
      <HeaderParams />
      App MinaLegeleux
      <div>{params.id}</div>
    </div>
  );
};
