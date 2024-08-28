"use client";
interface IParamsProps {
  isParams: boolean;
  closeParams: () => void;
}

export const Params: React.FC<IParamsProps> = ({ closeParams, isParams }) => {
  return (
    <div className="grid grid-cols-40/60">
      <div></div>
    </div>
  );
};
