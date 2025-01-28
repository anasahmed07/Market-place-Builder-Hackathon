import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "@/lib/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Menu } from "lucide-react";

const data:NavMenu = [
  {
    id: 1,
    label: "Shop",
    type: "MenuList",
    children: [
      {
        id: 11,
        label: "Formal clothes",
        url: "/shop#formal",
        description: "In attractive and spectacular colors and designs",
      },
      {
        id: 12,
        label: "Party Dersses",
        url: "/shop#party",
        description: "Ladies, your style and tastes are important to us",
      },
      {
        id: 13,
        label: "Gym clothes",
        url: "/shop#gym",
        description: "For all ages, with happy and beautiful colors",
      },
      {
        id: 14,
        label: "Casual Clothes",
        url: "/shop#casual",
        description: "Suitable for men, women and all tastes and styles",
      },
    ],
  },
  {
    id: 2,
    type: "MenuItem",
    label: "On Sale",
    url: "/shop#on-sale",
    children: [],
  },
  {
    id: 3,
    type: "MenuItem",
    label: "New Arrivals",
    url: "/shop#new-arrivals",
    children: [],
  },
  {
    id: 4,
    type: "MenuItem",
    label: "Brands",
    url: "/shop#brands",
    children: [],
  },
];

const ResponsiveTopNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer">
          <Menu/>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto bg-white">
        <SheetHeader className="mb-10">
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className={`${integralCF.className} text-2xl`}>
                SHOP.CO
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start">
          {data.map((item) => (
            <div key={item.id}>
              {item.type === "MenuItem" && (
                <SheetClose asChild>
                  <Link href={item.url ?? "/"} className="mb-4">
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === "MenuList" && (
                <div className="w-full">
                  <Accordion type="single" collapsible>
                    <AccordionItem value={item.label} className="border-none">
                      <AccordionTrigger className="text-left p-0 py-0.5 font-normal text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="p-4 pb-0 border-l flex flex-col">
                        {item.children.map((itemChild, idx) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className={`w-fit py-2 text-base ${idx % 2 === 0 ? 'bg-grey-100' : ''}`} 
                          >
                            <Link href={itemChild.url ?? "/"}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveTopNavbar;
