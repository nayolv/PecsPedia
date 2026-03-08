import { MenuItem } from '@/app/src/components/Navigation/BurgerMenu/BurgerMenu'
import { useRouter } from 'expo-router'
import { useEffect, useRef } from 'react'
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'

interface HeaderAdminProps {
    title: string
    menuItems?: MenuItem[]
    activeItem?: string
    onSelectItem?: (key: string) => void
    isMenuOpen?: boolean
    onMenuToggle?: (isOpen: boolean) => void
}

export const HeaderAdmin = ({
    title,
    menuItems = [],
    activeItem = '',
    onSelectItem,
    isMenuOpen = false,
    onMenuToggle
}: HeaderAdminProps) => {
    const router = useRouter()
    const { height } = useWindowDimensions()
    const translateX = useRef(new Animated.Value(-280)).current

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isMenuOpen ? 0 : -280,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }, [isMenuOpen, translateX])

    const toggleDrawer = () => {
        onMenuToggle?.(!isMenuOpen)
    }

    const handleSelectItem = (key: string) => {
        onSelectItem?.(key)
        onMenuToggle?.(false)
    }

    const handleBackdropPress = () => {
        onMenuToggle?.(false)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{title}</Text>

                    {menuItems.length > 0 && (
                        <TouchableOpacity
                            style={styles.burgerButton}
                            onPress={toggleDrawer}
                            activeOpacity={0.7}
                        >
                            <View style={styles.burgerIcon}>
                                <View style={styles.burgerLine} />
                                <View style={styles.burgerLine} />
                                <View style={styles.burgerLine} />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>

            {menuItems.length > 0 && (
                <Animated.View
                    style={[
                        styles.drawer,
                        {
                            transform: [{ translateX }],
                            height: height,
                        },
                    ]}
                >
                    <View style={styles.drawerHeader}>
                        <Text style={styles.drawerTitle}>Menú</Text>
                    </View>

                    <View style={styles.menuItems}>
                        {menuItems.map((item) => (
                            <TouchableOpacity
                                key={item.key}
                                style={[
                                    styles.menuItem,
                                    activeItem === item.key && styles.activeMenuItem,
                                ]}
                                onPress={() => handleSelectItem(item.key)}
                                activeOpacity={0.7}
                            >
                                {item.icon && (
                                    <Text style={styles.menuIcon}>{item.icon}</Text>
                                )}
                                <Text
                                    style={[
                                        styles.menuLabel,
                                        activeItem === item.key && styles.activeMenuLabel,
                                    ]}
                                >
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Animated.View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    safeArea: {
        backgroundColor: '#6BAABB',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6BAABB',
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#5A99A5',
        zIndex: 15,
        paddingTop: 30,
        height: 81,
    },

    burgerButton: {
        padding: 8,
        marginLeft: 'auto',
    },
    burgerIcon: {
        width: 28,
        height: 24,
        justifyContent: 'space-around',
    },
    burgerLine: {
        height: 3,
        width: 28,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    spacer: {
        width: 44,
    },
    drawer: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 280,
        backgroundColor: '#FFFFFF',
        zIndex: 20,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    drawerHeader: {
        paddingTop: 35,
        height: 82,
        // paddingVertical: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        backgroundColor: '#6BAABB',
    },
    drawerTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    menuItems: {
        paddingVertical: 8,
        backgroundColor: '#FFFFFF',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    activeMenuItem: {
        backgroundColor: '#E8F1F3',
    },
    menuIcon: {
        fontSize: 20,
        marginRight: 12,
        width: 28,
        textAlign: 'center',
    },
    menuLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333333',
        flex: 1,
    },
    activeMenuLabel: {
        color: '#6BAABB',
        fontWeight: '700',
    },
})
