export interface ICategory {
    id: string
    name: string
    color: string
    imageUri?: string;
}

export interface IPictogram {
    id: string
    imageUri: string
    text: string
    categoryIds: string[]
    audioUri?: string
}

export interface IPhraseItem extends IPictogram { }