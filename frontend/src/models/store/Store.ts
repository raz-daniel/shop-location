import Draft from "./Draft";

export default interface Store extends Draft {
    id: string
    createdAt: Date
    updatedAt: Date
}