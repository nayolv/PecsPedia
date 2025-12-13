import { CustomHeader } from '@/app/src/components/Layout/Header/CustomHeader'

interface HeaderUserProps {
    title: string
}
export const HeaderUser = ({ title }: HeaderUserProps) => {
    return <CustomHeader title={title} containerStyle={{ backgroundColor: '#81B3DB' }} />
}
