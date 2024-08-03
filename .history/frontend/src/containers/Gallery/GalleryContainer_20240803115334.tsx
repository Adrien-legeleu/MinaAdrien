import { IGroupDetailsProps } from "@/app/gallery/page";

type GroupContainerDetailsProps = IGroupDetailsProps;

export const GalleryContainer: React.FC<GroupContainerDetailsProps> = ({
  params,
}) => {
  return <div>{params.id}</div>;
};
