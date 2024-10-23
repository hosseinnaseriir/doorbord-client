import { Box, Button, Drawer, MenuItem, Select, TextField, Typography } from "../../../../../packages";
import { useCreateTaskField, useGetAllTaskFields, useUpdateTaskField } from "../../../../../packages/api";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";

const TASK_SCHEMA = z.object({
    title: z.string().min(2, "این فیلد ضروری است"),
    key: z.string().min(2, "این فیلد ضروری است"),
    type: z.any(),
    required: z.any(),
    options: z.any(),
});

type TaskSchemaType = z.infer<typeof TASK_SCHEMA>;

export const CreateFieldModule: React.FC<{ title: string, openCreateTaskField: any, setOpenCreateTaskField: any }> = (props) => {

    const taskFieldId = props.openCreateTaskField?.id;

    const { register, reset, handleSubmit, control, formState: { errors } } = useForm<TaskSchemaType>({
        resolver: zodResolver(TASK_SCHEMA),
    });

    const { refetch } = useGetAllTaskFields();

    const { mutateAsync } = useCreateTaskField();
    const { mutateAsync: updateTaskFieldMutate } = useUpdateTaskField()

    const {
        field: { onChange: categoryOnChange, value: categoryValue },
    } = useController({
        name: "type",
        control,
        defaultValue: 1,
        rules: { required: 'این فیلد ضروری است' },
    });

    const {
        field: { onChange: requiredOnChange, value: requiredValue },
    } = useController({
        name: "required",
        control,
        defaultValue: 0,
    });


    const {
        field: { onChange: optionsOnChange, value: optionsValue },
    } = useController({
        name: "options",
        control,
        defaultValue: [],
        rules: { required: 'این فیلد ضروری است' },
    });

    const handleCreateNewTask = (data: any) => {
        if (taskFieldId) {
            return updateTaskFieldMutate({
                fieldId: taskFieldId,
                taskFieldData: data
            }).then(() => {
                refetch();
                props.setOpenCreateTaskField(false);
            })
        }
        mutateAsync({ ...data, options: [], required: Boolean(+data?.required) }).then(() => {
            refetch();
            props.setOpenCreateTaskField(false);

        })
    }

    useEffect(() => {
        if (taskFieldId) {
            reset({
                title: props.openCreateTaskField?.title,
                key: props.openCreateTaskField?.key,
                required: +props.openCreateTaskField?.required,
                type: props.openCreateTaskField?.type?.id
            })
        } else {
            reset({})
        }
    }, [props.openCreateTaskField])



    return (
        <Drawer onClose={() => props.setOpenCreateTaskField(false)} anchor="bottom" open={props.openCreateTaskField}>
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
                            label="نوع فیلد">
                            <MenuItem value={2}>CHOOSE</MenuItem>
                            <MenuItem value={3}>DATE</MenuItem>
                            <MenuItem value={1}>SIMPLE</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{
                        gap: 2,
                        flexDirection: 'column',
                        display: 'flex',
                        flex: 1
                    }}>
                        <Select
                            value={optionsValue}
                            onChange={optionsOnChange}
                            multiple label="گزینه ها">
                            <MenuItem value={1}>نام مشترک(SIMPLE)</MenuItem>
                            <MenuItem value={2}>نوع مشترک(CHOOSE)[share,dedicate]</MenuItem>
                            <MenuItem value={3}>تاریخ مراجعه(DATE)</MenuItem>
                        </Select>
                        <Select
                            value={requiredValue}
                            onChange={requiredOnChange}
                            label="الزامی">
                            <MenuItem value={0}>نیست</MenuItem>
                            <MenuItem value={1}>هست</MenuItem>
                        </Select>
                    </Box>
                </Box>
                <Button type="submit" sx={{ mt: 2 }} fullWidth>
                    {taskFieldId ? "ویرایش فیلد" : "ایجاد فیلد"}
                </Button>
            </Box>
        </Drawer>

    )
}