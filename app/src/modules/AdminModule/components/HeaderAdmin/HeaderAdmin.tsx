import { CustomHeader } from '@/app/src/components/Layout/Header/CustomHeader'

interface HeaderAdminProps {
    title: string
}

export const HeaderAdmin = ({ title }: HeaderAdminProps) => {
    return <CustomHeader title={title} containerStyle={{ backgroundColor: '#6BAABB' }} backIconName="logout" />
}
