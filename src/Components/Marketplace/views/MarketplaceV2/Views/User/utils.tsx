export const getRarity = (attributes: any[]) => {
    if (attributes.find(attr => attr.trait_type === '1/1')) {
        return 'Legendary';
    }

    switch (attributes.find(attr => attr.trait_type === 'Class').value) {
        case 'Archer':
            return 'Common';
        case 'Artillery':
            return 'Rare';
        case 'Berserker':
            return 'Uncommon';
        case 'Dark Knight':
            return 'Epic';
        case 'Elemental':
            return 'Rare';
        case 'Engineer':
            return 'Uncommon';
        case 'Knight':
            return 'Common';
        case 'Magitek':
            return 'Epic';
        case 'Musketeer':
            return 'Common';
        case 'Plague Doctor':
            return 'Uncommon';
        case 'Vicar':
            return 'Uncommon';
        case 'Wizard':
            return 'Common';
        default:
            return 'Unknown';
    }
};

export const getRarityBorder = (rarity: string) => {
    switch (rarity) {
        case 'Common':
            return('border-[#C2C2C2] text-[#C2C2C2]');
        case 'Uncommon':
            return('border-[#94FF88] text-[#94FF88]');
        case 'Rare':
            return('border-[#4BDEFD] text-[#4BDEFD]');
        case 'Epic':
            return('border-[#EB88FF] text-[#EB88FF]');
        default:
            return('border-[#C2C2C2] text-[#C2C2C2]');
    }
}

export const getHashId = (str: string): string => {
    const parts = str.split('#');
    return parts.length > 1 ? parts[1] : '';
};

export const getName = (data: any) => {
    if (data.attributes.find((attr: any) => attr.trait_type === '1/1')) {
        return data.attributes.find((attr: any) => attr.trait_type === '1/1')
            .value;
    }

    return data.name;
};

export const getClassName = (data: any) => {
    return data.attributes.find((attr: any) => attr.trait_type === 'Class').value;
};