export const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    return formattedDate;
};

export const formatDateAndTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
         ${date.toLocaleString('en-US', {
             hour: 'numeric',
             minute: 'numeric',
             second: 'numeric',
             hour12: true,
         })}`;
    return formattedDate;
};
