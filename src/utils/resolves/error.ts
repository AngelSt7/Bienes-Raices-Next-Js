import { isAxiosError } from "axios";

export const errorHttp = (error : unknown) => {
    if (isAxiosError(error) && error.response) {
        console.log(error.response.data.error);
        throw new Error(error.response.data.error);
    }
}