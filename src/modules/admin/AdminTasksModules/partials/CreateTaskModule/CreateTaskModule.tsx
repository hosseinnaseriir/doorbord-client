import { Box, Button, Drawer, MenuItem, Select, TextField, Typography } from "../../../../../packages";
import { useCreateTask, useGetAllTaskFields, useGetAllTasks, useUpdateTask } from "../../../../../packages/api";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";

const TASK_SCHEMA = z.object({
    title: z.string().min(2, "این فیلد ضروری است"),
    key: z.string().min(2, "این فیلد ضروری است"),
    categoryIds: z.any(),
    permissionIds: z.any(),
    fieldIds: z.any(),
});

type TaskSchemaType = z.infer<typeof TASK_SCHEMA>;

export const CreateTaskModule: React.FC<{ title: string, openCreateTask: any; setOpenCreateTask: any; }> = (props) => {

    const { register, handleSubmit, reset, control } = useForm<TaskSchemaType>({
        resolver: zodResolver(TASK_SCHEMA),
    });
    const taskId = props.openCreateTask?.id;
    const { refetch } = useGetAllTasks();
    const { data: taskFields } = useGetAllTaskFields();

    const { mutateAsync: createTaskMutate } = useCreateTask()
    const { mutateAsync: updateTaskMutate } = useUpdateTask()
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

    const handleCreateNewTask = (taskData: any) => {
        if (taskId) {
            return updateTaskMutate({
                taskId,
                taskData
            }).then(() => {
                refetch();
                props.setOpenCreateTask(false);
            })
        }
        createTaskMutate(taskData).then(() => {
            refetch();
            props.setOpenCreateTask(false);
        })
    };

    useEffect(() => {
        if (taskId) {
            reset({
                title: props.openCreateTask?.title,
                key: props.openCreateTask?.key,
                categoryIds: props.openCreateTask?.categories?.map((cat: any) => cat.id),
                fieldIds: props.openCreateTask?.fields?.map((field: any) => field.id),
                permissionIds: props.openCreateTask?.permissions?.map((permission: any) => permission.id),
            })
        } else {
            reset({})
        }
    }, [props.openCreateTask])



    return (
        <Drawer onClose={() => {
            props.setOpenCreateTask(false)
        }} anchor="bottom" open={props.openCreateTask}>
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
                        flex: 1,
                        width: '50%'
                    }}>
                        <TextField {...register("title")} label="تایتل" />
                        <TextField {...register("key")} label="کلید" placeholder="حروف کوچک انگلیسی بدون فاصله" />
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
                        flex: 1,
                        width: '50%'
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
                            {
                                taskFields?.map(
                                    (field: any) => (
                                        <MenuItem key={field.id} value={field.id}>
                                            {field.title}
                                            ({field.type?.name})
                                            {field.options?.length > 0 ? <>[{field?.options?.map((opt: any) => opt?.title + ',')}] </> : null}
                                        </MenuItem>
                                    ))
                            }
                        </Select>
                    </Box>
                </Box>
                <Button type="submit" sx={{ mt: 2 }} fullWidth>
                    {taskId ? "ویرایش ماموریت" : "ایجاد ماموریت"}
                </Button>
            </Box>
        </Drawer>
    )
}