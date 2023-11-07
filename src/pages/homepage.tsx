import Header from "@/components/header/header";
import LocationCard from "@/components/locationCard/locationCard";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useLocationContext } from "@/hooks/useLocationContext";
import './homepage.css'
import AddLocationSheet from "@/components/locationCard/addLocationSheet";
import { useEffect } from "react";

export interface IAppProps {}

const HomePage = (props: IAppProps) => {
  const {locations}: any = useLocationContext()
  const {dispatch}: any = useLocationContext()

  const { user }: any = useAuthContext();

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('http://localhost:3000', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_LOCATIONS', payload: json})
      }
    }

    if (user) {
      fetchLocations()
    }
  }, [dispatch, user])
  return (
    <div>
      <Header />

      <div className="container mt-5">
        <div className="my-5 flex align-center justify-between">
          {user && (
            <h2 className="text-xl font-bold">Welcome! {user.user.fullname}</h2>
            )}
            <AddLocationSheet />
          </div>

        <h3 className="text-lg mb-5"> Recommended Places for you</h3>
        <div className="grid locations-grid gap-6">
        {locations && locations.map((location: any) => (
          <LocationCard key={location._id} location={location} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
