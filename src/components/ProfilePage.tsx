interface ProfilePageProps {
  name: string;
  profilePhoto: string;
}

const ProfilePage = ({ name }: ProfilePageProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="rounded-full w-20 h-20 bg-sky-200"></div>
      <p>{name}</p>
    </div>
  );
};

export default ProfilePage;
