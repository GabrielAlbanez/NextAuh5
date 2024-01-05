"use client";

import { UserInfo } from "@/components/user-info";
import { userCurrentUser } from "@/hooks/user-current-user";

const ClientPage = () => {
  const user = userCurrentUser();

  return ( 
    <UserInfo
      label="📱 Client component"
      user={user}
    />
   );
}
 
export default ClientPage;