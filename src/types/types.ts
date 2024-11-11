import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Applicant {
  id: string;
  nameFirst: string;
  nameLast: string;
}

export interface Company {
  id: string;
  name: string;
}

// Navigation
export interface NavigationItem {
  title: string;
  path: string;
  iconDefinition: IconDefinition;
}
