import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";

type FormWrapperProps<T extends FieldValues> = {
    methods: UseFormReturn<T>,
    onSubmit: SubmitHandler<T>

};

const FormWrapper = <T extends FieldValues,>({ methods, onSubmit, children }: React.PropsWithChildren<FormWrapperProps<T>>): JSX.Element => {
    return (
        <FormProvider {...methods}>
            <form style={{ width: 'inherit', height: 'inherit' }} noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    );
};

export default FormWrapper;
