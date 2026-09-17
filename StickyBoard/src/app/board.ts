export interface Board {     //this is for each to-do board
    id: string;
    title: string;
    createdAt: Date | { toDate(): Date };
}
