import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface OptionTabProps {
  title: string;
  icon: IconDefinition;
  href: string;
}

const OptionTab = ({ title, icon, href }: OptionTabProps) => {
  return (
    <Link
      href={href}
      className="flex space-x-2 items-center border-[1px] border-gray-200 p-3 rounded-lg"
    >
      <div className="min-w-6">
        <FontAwesomeIcon icon={icon} />
      </div>
      <p>{title}</p>
    </Link>
  );
};

export default OptionTab;
