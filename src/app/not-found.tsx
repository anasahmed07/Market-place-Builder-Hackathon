'use server';
import { redirect } from "next/navigation";


export default async function NotFound(){
    return(
      redirect("/not-found")
    )
}