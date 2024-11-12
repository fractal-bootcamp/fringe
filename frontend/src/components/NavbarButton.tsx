"use client";

import { NavigationItem } from "@/types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

interface NavbarButtonProps {
  navigationItem: NavigationItem;
}

const NavbarButton = ({ navigationItem }: NavbarButtonProps) => {
  const { path, iconDefinition } = navigationItem;
  const router = useRouter();
  return (
    <button onClick={() => router.push(path)} className="text-sm p-2">
      <FontAwesomeIcon icon={iconDefinition} />
    </button>
  );
};

export default NavbarButton;
