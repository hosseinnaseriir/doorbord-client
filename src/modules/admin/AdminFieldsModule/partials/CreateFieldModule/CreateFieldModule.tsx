import { Box, Button, MenuItem, Select, TextField, Typography } from "../../../../../packages";
import { useCreateTask, useGetAllTasks } from "../../../../../packages/api";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

const TASK_SCHEMA = z.object({
    title: z.string().min(2, "این فیلد ضروری است"),
    key: z.string().min(2, "این فیلد ضروری است"),
    categoryIds: z.any(),
    permissionIds: z.any(),
    fieldIds: z.any(),
});

type TaskSchemaType = z.infer<typeof TASK_SCHEMA>;

export const CreateFieldModule: React.FC<{ title: string }> = (props) => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<TaskSchemaType>({
        resolver: zodResolver(TASK_SCHEMA),
    });

    const { refetch } = useGetAllTasks();

    const { mutateAsync } = useCreateTask()

    const {
        field: { onChange: categoryOnChange, value: categoryValue },
    } = useController({
        name: "categoryIds",
        control,
        defaultValue: [],
        rules: { required: 'این فیلد ضروری است' },
    });

    const {
        field: { onChange: permissionsOnChange, value: permissionsValue },
    } = useController({
        name: "permissionIds",
        control,
        defaultValue: [],
        rules: { required: 'این فیلد ضروری است' },
    });


    const {
        field: { onChange: fieldsOnChange, value: fieldsValue },
    } = useController({
        name: "fieldIds",
        control,
        defaultValue: [],
        rules: { required: 'این فیلد ضروری است' },
    });

    const handleCreateNewTask = (data: any) => {
        mutateAsync(data).then(() => {
            refetch()
        })
    }

    return (
        <Box sx={{ p: 3, pb: 5 }} component="form"
            onSubmit={handleSubmit(handleCreateNewTask)}>
            <Typography sx={{
                pb: 3,
                color: t => t.palette.common.white
            }} variant="h4">{props.title}</Typography>
            <Box
                sx={{
                    display: 'flex',
                    gap: 2
                }}>
                <Box sx={{
                    gap: 2,
                    flexDirection: 'column',
                    display: 'flex',
                    flex: 1
                }}>
                    <TextField {...register("title")} label="تایتل" />
                    <TextField {...register("key")} label="کلید" />
                    <Select
                        value={categoryValue}
                        onChange={categoryOnChange}
                        multiple label="دسته بندی">
                        <MenuItem value={2}>SITE</MenuItem>
                        <MenuItem value={1}>SUBSCRIBER</MenuItem>
                    </Select>
                </Box>
                <Box sx={{
                    gap: 2,
                    flexDirection: 'column',
                    display: 'flex',
                    flex: 1
                }}>
                    <Select
                        value={permissionsValue}
                        onChange={permissionsOnChange}
                        multiple label="دسترسی">
                        <MenuItem value={1}>SALES</MenuItem>
                        <MenuItem value={2}>ADMIN</MenuItem>
                        <MenuItem value={3}>TECH</MenuItem>
                    </Select>
                    <Select
                        value={fieldsValue}
                        onChange={fieldsOnChange}
                        multiple label="فیلد ها">
                        <MenuItem value={1}>نام مشترک(SIMPLE)</MenuItem>
                        <MenuItem value={2}>نوع مشترک(CHOOSE)[share,dedicate]</MenuItem>
                        <MenuItem value={3}>تاریخ مراجعه(DATE)</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Button type="submit" sx={{ mt: 2 }} fullWidth>ایجاد ماموریت</Button>
        </Box>)
}