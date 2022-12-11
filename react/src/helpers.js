export const getErrors = (error) => {
    const { response } = error;
    if(response && response.status === 422) {
        const output = {} 

        const errors = response.data.errors;
        Object.keys(errors).forEach(key => {
            output[key] = errors[key][0];
        });
        
        return output;
    }
}

export const getValidationErrors = (error) => getErrors(error);