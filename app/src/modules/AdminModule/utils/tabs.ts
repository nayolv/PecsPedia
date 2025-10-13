import { FC } from "react";
import { CategoryManagement } from "../components/CategoryManagement";
import { PictogramManagement } from "../components/PictogramManagement";

export type TabKey = 'pictograms' | 'categories'

export const tabsViews: Record<TabKey, FC<any>> = {
    pictograms: PictogramManagement,
    categories: CategoryManagement
}

export const tabs = [
    {
        key: 'pictograms',
        label: 'Pictogramas',
    },
    {
        key: 'categories',
        label: 'Categorías',
    }
]