import { ICategory, IPictogram } from "@/app/src/types/PyctogramTypes"

interface BaseManagementProps {
    pictograms: IPictogram[]
    categories: ICategory[]
    onDelete: CallableFunction
}

export interface PictoParams {
    picto: string
    categories: string
    pictograms: string
}

export interface CatParams {
    category: string
    categories: string
    pictograms: string
}

export interface PictogramManagementProps extends BaseManagementProps { }
export interface CategoryManagementProps extends BaseManagementProps { }
