import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { useLocationContext } from "@/hooks/useLocationContext";
import "./header.css";

export interface HeaderProps {
  locations: Location[];
}

interface Location {
  _id: number;
  name: string;
  country: string;
}

const header = (props: HeaderProps) => {
  const { locations }: any = useLocationContext();
  const { logout } = useLogout();
  const { user }: any = useAuthContext();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 12, 12),
    to: addDays(new Date(2024, 1, 10), 20),
  });

  // const [locations, setallLocations] = useState<Location[]>(props.locations); // Your locations array from API
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showList, setShowList] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<Location>();

  // Function to handle the search input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // Function to toggle display of the list
  const toggleListDisplay = () => {
    setShowList((prevShowList) => !prevShowList);
  };

  // Filtered locations based on search query
  const filteredLocations = locations
    ? locations.filter((location: Location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleLocationSelection = (location: Location) => {
    setSelectedLocation(location);
    setSearchQuery(location.name); // Update the input value with the selected location
    setShowList(false); // Hide the list after selection
  };

  const submitSearch = () => {
    selectedLocation &&
      window.location.replace(`/location/${selectedLocation._id}`);
  };

  const handleClick = () => {
    logout();
  };
  return (
    <div>
      <div className="border-b">
        <div className="flex h-16 justify-between items-center px-4">
          <nav
            className={cn("flex items-center space-x-4 lg:space-x-6")}
            {...props}
          >
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Travel Buddy
            </Link>
          </nav>
          <div className="flex gap-5">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Find your destination!</Button>
              </PopoverTrigger>
              <PopoverContent className="flex flex-col gap-5 md:flex-row w-100">
                <div className="flex flex-col">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="md:w-[100px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onClick={toggleListDisplay}
                  />
                  {showList && (
                    <ul className="search-list">
                      {filteredLocations
                        ? filteredLocations.map((location: Location) => (
                            <li
                              key={location._id}
                              onClick={() => {
                                handleLocationSelection(location);
                              }}
                            >
                              {location.name}
                            </li>
                          ))
                        : "No locations found"}
                    </ul>
                  )}
                </div>
                <div className={cn("grid gap-2")}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                          "w-[300px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "LLL dd, y")} -{" "}
                              {format(date.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(date.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <Input type="number" placeholder="People" />
                </div>
                <Button onClick={() => submitSearch()} type="submit">
                  Search
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center space-x-4">
            <div className="max-[768px]:hidden"></div>
            {user && (
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
