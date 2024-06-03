'use client'

import { Button } from "@/components/ui/button";
import { signOutAccount } from "@/lib/firebase";



const Dashboard = () => {
    return ( 
        <>

        <h1>Bienvenido </h1>
            <Button onClick={() => signOutAccount() } >Sign Out</Button>
        </>
     );
}
 
export default Dashboard;