import { useParams } from "react-router-dom"
import { useGetTaskFieldByTaskId } from "../../../packages/api"
import { Box, Button, Container, Select, TextField } from "../../../packages/ui"
import React, { useMemo } from "react"
import { useForm } from "react-hook-form"

export const FormGeneratorModule: React.FC<any> = (props) => {
    const { id } = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm<any>();
    const { data } = useGetTaskFieldByTaskId(id ?? '');
    console.log({ data });

    const fieldsElements = useMemo(() => {
        const FIELDS = {
            SIMPLE: (field: any) => <TextField key={field?.id} label={field?.title} {...register(field?.key)} />,
            CHOOSE: (field: any) => <Select key={field?.id} label={field?.title} />,
        }
        return data?.task?.fields?.map?.((field: any) => {
            // @ts-ignore
            return FIELDS[field?.type?.name]?.(field)
        })

    }, [data])
    return (
        <Box>
            <Container sx={{
                pb: 5,
                pt: 1,
            }} maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={handleSubmit(data => {
                        console.log(data)
                    })}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                    {fieldsElements}
                    <Button type="submit">ارسال به سرپرست</Button>
                </Box>
            </Container>
        </Box>
    )
}