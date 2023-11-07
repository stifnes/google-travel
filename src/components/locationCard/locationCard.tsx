import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useAuthContext } from "@/hooks/useAuthContext"
import { useLocationContext } from "@/hooks/useLocationContext"


export interface LocationCard {
  _id: string
  name: String,
  description: String,
  image: string
}

export interface CardProps {
  location: LocationCard
}

const LocationCard: React.FC<CardProps> = ({
  location,
  }) => {
    const { dispatch }:any = useLocationContext()
    const { user }: any = useAuthContext()
  
    const handleClick = async () => {
      if (!user) {
        return
      }
  
      const response = await fetch('http://localhost:3000/' + location._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (response.ok) {
        dispatch({type: 'DELETE_LOCATION', payload: json})
      }
    }
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{location.name}</CardTitle>
        <CardDescription>{location.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={location.image} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleClick}>Delete</Button>
      </CardFooter>
    </Card>
  )
}

export default LocationCard