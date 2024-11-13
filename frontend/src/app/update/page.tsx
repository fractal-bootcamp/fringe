import UpdateProfile from "@/components/UpdateProfile";
import { useAuth } from "@clerk/nextjs";
const Page = async () => {
  const { getToken } = useAuth();
  if (!getToken) return <div>Loading...</div>;
  
  return (
    <div className="p-2">
      <UpdateProfile getToken={getToken} />
    </div>
  );
};

export default Page;
