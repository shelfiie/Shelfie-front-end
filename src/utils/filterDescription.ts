const filterDescription = (description: string) => {
    if (!description) return 'Descrição não fornecida';
    return description.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '').replace("'", " ").replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<i>/g, '').replace(/<\/i>/g, '');
}

const limitedDescription = (description: string) => {
    let maxLength = 350;
    if (description.length <= maxLength) {
        return filterDescription(description);
    }
    return filterDescription(description.substring(0, maxLength) + '...');
}
export { filterDescription, limitedDescription }