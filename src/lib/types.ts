export type GradeCompany = "PSA" | "CGC" | "BGS" | "PCG" | "Beckett";

export type ProductCategory =
  | "Pokemon"
  | "Yu-Gi-Oh"
  | "Magic the Gathering"
  | "TCG Accessories"
  | "Books"
  | "Stationery"
  | "Art";

export type Availability = "InStock" | "OutOfStock";

export interface ProductImage {
  url: string;
  localPath: string;
  width: number;
  height: number;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  sku: string;

  price: number;
  currency: "ZAR";
  priceValidUntil: string;

  availability: Availability;
  condition: "NewCondition";

  category: ProductCategory;
  subcategory?: string;

  gradeCompany?: GradeCompany | null;
  gradeScore?: number;
  era?: string;
  edition?: string;

  images: ProductImage[];

  datePublished: string;
  dateModified: string;
  tags?: string[];
}

export interface ServiceInfo {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  steps?: { title: string; description: string }[];
}
