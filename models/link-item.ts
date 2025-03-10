export interface LinkItem {
    id:        number;
    title:     string;
    target?:   string;
    children?: LinkItem[];
    visible?:  boolean;
}