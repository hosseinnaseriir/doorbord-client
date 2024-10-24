import { useParams } from "react-router-dom"
import { useGetTaskFieldByTaskId, useSubmitTask } from "../../../packages/api"
import { Box, Button, Container, MenuItem, Select, TextField } from "../../../packages/ui"
import React, { useMemo } from "react"
import { useForm } from "react-hook-form"

export const FormGeneratorModule: React.FC<any> = () => {
    const { id } = useParams()
    const { register, handleSubmit } = useForm<any>();
    const { data } = useGetTaskFieldByTaskId(id ?? '');

    const { mutateAsync } = useSubmitTask()
    const fieldsElements = useMemo(() => {
        const FIELDS = {
            SIMPLE: (field: any) => <TextField key={field?.id} label={field?.title} {...register(`${field?.key}-${field?.id}`, {
                required: field?.required
            })} />,
            CHOOSE: (field: any) => {
                return <Select
                    key={field?.id} label={field?.title}
                    {...register(`${field?.key}-${field?.id}`, {
                        required: field?.required
                    })}
                    defaultValue=""
                >
                    {
                        field?.options?.map((opt: any) => (<MenuItem value={opt.value} key={opt.id}>{opt.title}</MenuItem>))
                    }
                </Select>
            },
        }
        return data?.task?.fields?.map?.((field: any) => {
            // @ts-ignore
            return FIELDS[field?.type?.name]?.(field)
        })
    }, [data]);

    return (
        <Box>
            <Container sx={{
                pb: 5,
                pt: 1,
            }} maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={handleSubmit(data => {
                        const fields: Array<{
                            fieldId: number;
                            value: string;
                        }> = [];
                        Object.entries(data).forEach(([key, value]) => {
                            const fieldId = key.split("-")[1];
                            fields.push({
                                fieldId: +fieldId,
                                // @ts-ignore
                                value
                            })
                        });
                        mutateAsync({
                            taskId: +(id ?? ''),
                            taskSubmission: {
                                fields,
                            }
                        })
                    })}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                    {fieldsElements}
                    <Button type="submit">ارسال به سرپرست</Button>
                </Box>
            </Container >
        </Box >
    )
}