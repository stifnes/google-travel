import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "../ui/textarea";
import { useLocationContext } from "@/hooks/useLocationContext";
import { useAuthContext } from "@/hooks/useAuthContext";

export interface AddLocationCardProp {
  onAddClick: void;
}

const AddLocationSheet: React.FC = ({}) => {
  const { dispatch }: any = useLocationContext();
  const { user }: any = useAuthContext();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const location = { name, description, image };

    const response = await fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(location),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setDescription("");
      setImage("");
      setError("");
      setEmptyFields([]);
      dispatch({ type: "CREATE_LOCATION", payload: json });
    }
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Add Location</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Location</SheetTitle>
          <SheetDescription>
            Add Details of the location. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter the location name"
              className="col-span-3"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter a short description"
              className="col-span-3"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imageUrl" className="text-right">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              placeholder="Enter the image url"
              className="col-span-3"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
        {error && <div className="error">{error}</div>}
      </SheetContent>
    </Sheet>
  );
};

export default AddLocationSheet;
