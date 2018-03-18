export interface Wish {
  id: number;
  caption: string;
  description: string;
  link: string;
  donor: string;
  priority: number; // higher is better
  invisible: boolean;
}
