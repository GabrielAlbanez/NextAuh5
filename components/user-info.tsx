import { ExtendedUser } from "@/next-auth";
import { 
  Card, 
  CardContent, 
  CardHeader
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
};

export const UserInfo = ({
  user,
  label,
}: UserInfoProps) => {

    console.log(user?.isTwoFactorEnabled)

     

  return (
    <div className="h-full w-full flex items-center justify-center">
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.image !==  null ? (<div className="flex items-center justify-center"><img src={user?.image || ""} alt="" className="rounded-full object-cover w-[150px] h-[150px]" /></div>) : (<></>)}
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            ID
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-transparent rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Name
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-transparent rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Email
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-transparent rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Role
          </p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-transparent rounded-md">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">
            Two Factor Authentication
          </p>
          <Badge 
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
          >
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
    </div>
  )
}