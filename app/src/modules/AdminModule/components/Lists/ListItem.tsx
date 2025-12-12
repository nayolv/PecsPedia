import { RoundedButton } from "@/app/src/components/Buttons/RoundedButton/RoundedButton";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native";

interface PictoListItemProps {
    columns?: number
    imageUri?: string
    color?: string
    subText?: string
    text: string
    onUpdate?: CallableFunction
    onDelete?: CallableFunction
}

const defaultBtnStyle: ViewStyle = {
    width: 35,
    height: 35,
    right: 30,
    top: -15,
    marginHorizontal: 5
}

const deletBtn: ViewStyle = {
    ...defaultBtnStyle,
    backgroundColor: '#EA5B4C'
}

const iconStyle: TextStyle = {
    fontSize: 25,
}

export const ListItem = ({
    imageUri,
    text,
    color = '#3BBAB1',
    subText = '',
    columns = 2,
    onUpdate,
    onDelete,
}: PictoListItemProps) => {
    const { width } = useWindowDimensions()
    const CARD_SIZE = (width / columns) - 20

    return (
        <View style={[styles.listItem, { width: CARD_SIZE }]}>
            <View style={styles.infoContainer}>
                <View style={[styles.imgWrapper, { borderColor: color }]}>
                    {imageUri ?
                        <Image style={styles.image} source={{ uri: imageUri }} contentFit="contain" />
                        :
                        <Text style={styles.noImageIcon}>🖼️</Text>
                    }
                </View>
                <View>
                    <Text style={styles.listText}> {text}</Text>
                    <Text style={styles.subText}>{subText}</Text>
                </View>
            </View>
            <View style={styles.actionWrapper}>
                <RoundedButton
                    icon='pencil'
                    iconStyle={iconStyle}
                    btnStyle={defaultBtnStyle}
                    onPress={() => onUpdate && onUpdate()}
                />
                <RoundedButton
                    icon='trash-can'
                    iconStyle={iconStyle}
                    btnStyle={deletBtn}
                    onPress={() => onDelete && onDelete()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        borderRadius: 10,
        margin: 10,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgWrapper: {
        borderWidth: 3,
        borderRadius: 5,
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noImageIcon: {
        fontSize: 35
    },
    image: {
        height: '100%',
        width: '100%',
    },
    listText: {
        fontSize: 18,
        fontWeight: '600',
    },
    subText: {
        fontSize: 14,
        marginLeft: 10,
        color: '#AAAAAA'
    },
    actionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 50
    }

})