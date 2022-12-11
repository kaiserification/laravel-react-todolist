export const getErrors = (error) => {
    const { response } = error;
    if(response && response.status === 422) {
        const errors = response.data.errors;
        const output = {} 

        Object.keys(errors).forEach(key => {
            output[key] = errors[key][0];
        });
        
        return output;
    }
}

export const getValidationErrors = (error) => getErrors(error);