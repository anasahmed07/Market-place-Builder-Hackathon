// 'use client'

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Signup from "@/components/signup";
// import Login from "@/components/login";

// export default function FormTabs() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [defaultTab, setDefaultTab] = useState("login"); // Default to "signup"

//   useEffect(() => {
//     const tabParam = searchParams.get("tab");
//     if (tabParam === "login" || tabParam === "signup") {
//       setDefaultTab(tabParam);
//     } else {
//       setDefaultTab("login");
//     }
//   }, [searchParams]);

//   const handleTabChange = (value: string) => {
//     router.push(`?tab=${value}`);
//   };

//   return (
//     <div className="flex justify-center items-center pt-10 pb-40">
//       <Tabs
//         value={defaultTab}
//         className="w-[500px]"
//         onValueChange={handleTabChange}
//       >
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="login">Login</TabsTrigger>
//           <TabsTrigger value="signup">Signup</TabsTrigger>
//         </TabsList>
//         <TabsContent value="login">
//           <Login />
//         </TabsContent>
//         <TabsContent value="signup">
//           <Signup />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

'use client'

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Signup from "@/components/signup";
import Login from "@/components/login";

export default function FormTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [defaultTab, setDefaultTab] = useState("signup"); // Default to "signup"

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "login" || tabParam === "signup") {
      setDefaultTab(tabParam);
    } else {
      setDefaultTab("signup");
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    router.push(`?tab=${value}`);
  };

  return (
    <div className="flex justify-center items-center pt-10 pb-40">
      <Tabs
        value={defaultTab}
        className="w-[500px]"
        onValueChange={handleTabChange}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}