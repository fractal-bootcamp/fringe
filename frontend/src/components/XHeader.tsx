interface XHeaderProps {
  title: string;
}

const XHeader = ({ title }: XHeaderProps) => {
  return (
    <div className="border-b-[0.5px] border-black text-left p-2 font-bold fixed top-0 z-10 bg-white w-full">
      {title}
    </div>
  );
};

export default XHeader;
