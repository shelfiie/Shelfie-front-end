const filterDescription = (description: string) => {
    if (!description) return 'Descrição não fornecida';
    return description.replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '').replace("'", " ").replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<i>/g, '').replace(/<\/i>/g, '');
}

const limitedDescription = (description: string ) => {
    let maxLength = 150;
    if (description.length <= maxLength) {
        return filterDescription(description);
    }
    return filterDescription(description.substring(0, maxLength) + '... ');
}

const filterBookStatus = (c: string | undefined) => {
    if(c) return c.replace(/_/g, ' ');
    else return '';
}

const concatAuthor = (authors: string[]) => {
    return authors.join(', ');
}

const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

export { filterDescription, limitedDescription, filterBookStatus, formatDate, concatAuthor }