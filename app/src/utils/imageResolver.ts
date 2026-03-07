/**
 * Mapa de imágenes locales disponibles en assets
 */
const LOCAL_IMAGES = {
    'default_img': require('../assets/png/default_img.png'),
    'default_cat': require('../assets/png/default_cat.png'),
} as const;

export type LocalImageKey = keyof typeof LOCAL_IMAGES;

/**
 * Resuelve una imagen URI a su source correspondiente
 * Maneja tanto imágenes locales (LOCAL:key) como remotas
 */
export const getImageSource = (imageUri: string | undefined) => {
    if (!imageUri) {
        return LOCAL_IMAGES['default_img'];
    }

    if (imageUri.startsWith('LOCAL:')) {
        const key = imageUri.replace('LOCAL:', '') as LocalImageKey;
        return LOCAL_IMAGES[key] || LOCAL_IMAGES['default_img'];
    }

    if (imageUri === 'default_img.png') {
        return LOCAL_IMAGES['default_img'];
    }

    return { uri: imageUri };
};

/**
 * Prefijo para imágenes locales que se guardarán en la BD
 */
export const LOCAL_IMAGE_PREFIX = 'LOCAL:';

/**
 * Identifica si una URI es una imagen local
 */
export const isLocalImage = (imageUri: string | undefined): boolean => {
    return Boolean(imageUri?.startsWith(LOCAL_IMAGE_PREFIX) || imageUri === 'default_img.png');
};
