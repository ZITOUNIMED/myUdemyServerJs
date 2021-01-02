export interface NodeModel{
    id?: number;
    name: string;
    children?: NodeModel[],
    ext?: string,
}