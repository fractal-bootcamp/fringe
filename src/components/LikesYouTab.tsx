interface LikesYouTabProps {
  name: string;
  profilePhoto: string;
}

const LikesYouTab = ({ name }: LikesYouTabProps) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default LikesYouTab;
