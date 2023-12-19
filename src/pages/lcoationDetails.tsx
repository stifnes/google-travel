import Header from "@/components/header/header";
import LocationCard from "@/components/locationCard/locationCard";
import { useLocationContext } from "@/hooks/useLocationContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./homepage.css";

import { Button } from "react-day-picker";

interface PlaceCard {
  _id: string;
  name: String;
  description: String;
  image: string;
  placeType: String;
}

interface LocationDetails {
  _id: string;
  name: String;
  description: String;
  image: string;
  place: PlaceCard[];
}

export interface locationProps {
  location: LocationDetails;
}

const LocationDetails = (props: locationProps) => {
  const { locations, dispatch }: any = useLocationContext();
  const [singleLocation, setSingleLocation]: any = useState();
  const [placeType, setPlaceType] = useState<String>("all");

  // const { user }: any = useAuthContext();

  let { id } = useParams();
  useEffect(() => {
    const fetchOneLocations = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/public/v1/location/" + id
        );
        const json = await response.json();
        setSingleLocation(json);
        if (response.ok) {
          dispatch({ type: "GET_ONE_LOCATION", payload: json });
        }
      } catch (e) {
        console.log("error found", e);
      }
    };

    fetchOneLocations();
  }, [dispatch]);
  return (
    <div>
      <Header locations={locations} />
      <div className="container">
        <h2 className="text-5xl my-3 capitalize">
          {singleLocation && singleLocation.name}
        </h2>
        <h2 className="text-xl mb-5 text-slate-500 capitalize">
          {singleLocation && singleLocation.country}
        </h2>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 w-[300px]">
            <TabsTrigger value="all">
              All Places
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              
            >
              Activities
            </TabsTrigger>
            <TabsTrigger value="hotel">
              Hotels
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="my-4">
            <p className="my-2">All Places</p>
            <div className="grid locations-grid gap-6">
              {singleLocation &&
                singleLocation.places.map((place: any) => (
                  <LocationCard key={place._id} location={place} />
                ))}
            </div>
          </TabsContent>
          <TabsContent value="activity" className="my-4">
            <p className="my-2">Activities</p>
            <div className="grid locations-grid gap-6">
              {singleLocation &&
                singleLocation.places
                  .filter((place: any) => place.placeType == "activity")
                  .map((place: any) => (
                    <LocationCard key={place._id} location={place} />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="hotel" className="my-4">
            <p className="my-2">Hotels</p>
            <div className="grid locations-grid gap-6">
              {singleLocation &&
                singleLocation.places
                  .filter((place: any) => place.placeType == "hotel")
                  .map((place: any) => (
                    <LocationCard key={place._id} location={place} />
                  ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LocationDetails;
