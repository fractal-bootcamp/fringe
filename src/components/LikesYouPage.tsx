import LikesYouTab from "./LikesYouTab";

interface LikesYouPageProps {
  likesYouUsers: { name: string; profilePhoto: string }[];
}

const LikesYouPage = ({ likesYouUsers }: LikesYouPageProps) => {
  return (
    <div>
      <div>Likes You</div>
      <div>
        {likesYouUsers.map((user, key) => (
          <LikesYouTab key={key} name={user.name} profilePhoto={user.profilePhoto} />
        ))}
      </div>
    </div>
  );
};

export default LikesYouPage;
