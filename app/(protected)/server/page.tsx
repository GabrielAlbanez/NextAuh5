import { currentUser } from "@/components/auth/auth";
import { UserInfo } from "@/components/user-info";

const ServerPage = async () => {
  const user = await currentUser();

  console.log(user)
 
  return ( 
    <UserInfo
      label="💻 Server component"
      user={user}
    />
   );
}
 
export default ServerPage;