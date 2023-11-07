import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "../ui/button";

export interface IAppProps {}

const header = (props: IAppProps) => {
  const { logout } = useLogout();
  const { user }: any = useAuthContext();

  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav
            className={cn("flex items-center space-x-4 lg:space-x-6")}
            {...props}
          >
            <Link
              to="/examples/dashboard"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Travel Buddy
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <div>
              <Input
                type="search"
                placeholder="Search..."
                className="md:w-[100px] lg:w-[300px]"
              />
            </div>
            {user &&  (
              <div>
                <Button onClick={handleClick}>Log out</Button>
              </div>
            )}
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default header;
