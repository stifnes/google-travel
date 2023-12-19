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
import './locationCard.css'

import { Link } from "react-router-dom"


export interface LocationCard {
  _id: string
  name: String,
  country: String,
  description: String,
  image: string,
  price: String,
  rating: String
}

export interface CardProps {
  location: LocationCard
}

const image = 'https://picsum.photos/400'

const LocationCard: React.FC<CardProps> = ({
  location,
  }) => {
    const { dispatch }:any = useLocationContext()
    const { user }: any = useAuthContext()

  return (
    location && (
      <Link to={`/location/${location._id}`}>
        <Card className="flex-col">
          <CardHeader>
            <img src={`data:image/png;base64,${location.image }` || image} className="main-img rounded-xl"/>
          </CardHeader>
          <div className="flex flex-col justify-between">
            <CardContent>
              <CardTitle className="pt-3 pb-2 capitalize">{location.name}</CardTitle>
              { location.country &&
                <CardDescription className="pt-3 pb-1 capitalize">{location.country}</CardDescription>
              }
              {
                location.price &&
                <CardDescription className="pb-2 capitalize">Price: ${location.price}</CardDescription>
              }
              {
                location.rating &&
                <CardDescription className="pb-2 capitalize">Rating: {location.rating}</CardDescription>
              }
              {
                location.description &&
                <CardDescription className="pb-2 capitalize text-ellipsis">{
                  location.description.length > 100 ?
                    location.description.substring(0, 100) + '...'
                  :
                    location.description
                  }</CardDescription>
              }
            </CardContent>
            <CardFooter className="flex justify-between">
            </CardFooter>
          </div>
        </Card>
      </Link>
    )
  )
}

export default LocationCard