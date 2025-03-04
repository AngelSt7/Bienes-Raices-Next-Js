export const isAdult = (dateString : string) => {
    const [day, month, year] = dateString.split('-').map(Number);
    const birthDate = new Date(year, month - 1, day);

    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (
        today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        return age - 1 >= 18;
    }

    return age >= 18;
};
