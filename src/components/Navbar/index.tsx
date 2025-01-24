import Link from "next/link";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { NavMenu } from "@/lib/types";
import { MenuList } from "./MenuList";
import {NavigationMenu, NavigationMenuList} from "@/components/ui/navigationMenu";
import { MenuItem } from "./MenuItem";
import InputGroup from "@/components/ui/inputgroup";
import ResponsiveTopNavbar from "@/components/Navbar/ResponsiveTopNavbar";
import { Search,CircleUserRound } from "lucide-react";
import CartBtn from "./CartBtn";

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

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-white z-20 px-2 ">
      <div className="flex relative max-w-[2000px] mx-auto items-center justify-between  py-5 md:py-6 px-4 ">
        <div className="flex">
          <div className="flex items-center">
            <div className="block md:hidden mr-4 ">
              <ResponsiveTopNavbar/>
            </div>
            <Link
              href="/"
              className={cn([
                integralCF.className,
                "text-2xl lg:text-[32px] mb-2 mr-3 lg:mr-10",
              ])}
            >
              SHOP.CO
            </Link>
          </div>
          <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
            <NavigationMenuList>
              {data.map((item) => (
                <div key={item.id}>
                  {item.type === "MenuItem" && (
                    <MenuItem label={item.label} url={item.url} />
                  )}
                  {item.type === "MenuList" && (
                    <MenuList data={item.children} label={item.label} />
                  )}
                </div>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex">
          <InputGroup className="hidden md:flex 2xl:w-[45rem] xl:w-96 w-auto bg-[#F0F0F0] mr-3 lg:mr-10">
            <InputGroup.Text>
              <Search/>
            </InputGroup.Text>
            <InputGroup.Input
              type="search"
              name="search"
              placeholder="Search for products..."
              className="bg-transparent placeholder:text-black/40"
            />
          </InputGroup>
          <div className="flex  items-center">
            <Link href="#" className="block md:hidden mr-[14px] p-1">
              <Search/>
            </Link>
            <CartBtn/>
            <Link href="/#signin" className="p-1">
              <CircleUserRound className=""/>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
