"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const Upgrade = () => {
  const router = useRouter();

  const handleOnClick = async () => {

  try{
      const response=await axios.post('/api/checkout');

      if(response && response.data){
        router.push(response.data.approvalURL);
      }

  }catch(error){
        console.log(error);
      }
  }

  return (
    <div className="mx-5 py-2">
      <div className="mt-5 py-6 px-4 bg-white rounded">
        <h2 className="font-medium">Upgrade Credit</h2>
      </div>
      <div className="mt-5 py-6 px-4 rounded">
        <Card className="w-[350px] flex flex-col mx-auto">
          <CardHeader>
            <CardTitle>10$ One-Time Purchase</CardTitle>
            <CardDescription>10,000 AI Credit</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="flex my-2 gap-2">
                <Check></Check> 100,000 words/purchase
              </p>
              <p className="flex my-2 gap-2">
                <Check></Check> All Template Access
              </p>
              <p className="flex my-2 gap-2">
                <Check></Check> Retain All History
              </p>
            </div>
            <Button className="mt-5" onClick={handleOnClick}>
              Purchase
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upgrade;