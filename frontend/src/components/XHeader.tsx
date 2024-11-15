interface XHeaderProps {
  title: string;
}

const XHeader = ({ title }: XHeaderProps) => {
  return <div>{title}</div>;
};

export default XHeader;
