import { Box, Button, Drawer, IconButton, MenuItem, Select, TextField, Typography } from "../../../../../packages";
import { useCreateTaskField, useGetAllTaskFields, useUpdateTaskField } from "../../../../../packages/api";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
const TASK_SCHEMA = z.object({
    title: z.string().min(2, "این فیلد ضروری است"),
    key: z.string().min(2, "این فیلد ضروری است"),
    type: z.any(),
    required: z.any(),
});

type TaskSchemaType = z.infer<typeof TASK_SCHEMA>;

export const CreateFieldModule: React.FC<{ title: string, openCreateTaskField: any, setOpenCreateTaskField: any }> = (props) => {

    const [optionFields, setOptionFields] = useState([
        {
            title: '',
            value: '',
            id: Date.now()
        }
    ])
    const taskFieldId = props.openCreateTaskField?.id;

    const { register, reset, handleSubmit, control } = useForm<TaskSchemaType>({
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



    const handleCreateNewTask = (data: any) => {
        if (taskFieldId) {
            return updateTaskFieldMutate({
                fieldId: taskFieldId,
                taskFieldData: {
                    ...data,
                    options: optionFields,
                    required: Boolean(+data?.required)
                }
            }).then(() => {
                refetch();
                props.setOpenCreateTaskField(false);
            })
        }
        mutateAsync({ ...data, options: optionFields, required: Boolean(+data?.required) }).then(() => {
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
                type: props.openCreateTaskField?.type?.id,

            });
            if (props.openCreateTaskField?.options?.length > 0) {
                setOptionFields(props.openCreateTaskField?.options)
            }
        } else {
            reset({});
            setOptionFields([{
                id: Date.now(),
                title: '',
                value: ""
            }])
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
                        <TextField {...register("key")} label="کلید" placeholder="حروف کوچک انگلیسی بدون فاصله" />
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

                        {categoryValue === 2 && optionFields?.map((opt, index) => {
                            return <Box key={index} sx={{
                                gap: 2,
                                display: 'flex',
                                alignItems: 'end'
                            }}>
                                <TextField value={optionFields.find(i => i.id === opt.id)?.value} onChange={(_event) => {
                                    setOptionFields(prev => prev.map(i => {
                                        if (i.id === opt.id) {
                                            return {
                                                id: i.id,
                                                value: _event.target.value,
                                                title: _event.target.value
                                            }
                                        }
                                        return i
                                    }))
                                }} label={index === 0 && "گزینه ها"} />
                                {
                                    index === optionFields.length - 1 &&
                                    (
                                        <IconButton onClick={() => {
                                            setOptionFields(prev => [...prev, {
                                                id: Date.now(),
                                                title: '',
                                                value: ''
                                            }])
                                        }} sx={{
                                            color: 'common.white'
                                        }}>
                                            <AddRoundedIcon />
                                        </IconButton>
                                    )

                                }
                                <IconButton onClick={() => {
                                    if (optionFields.length === 1) setOptionFields([{
                                        id: Date.now(),
                                        title: '',
                                        value: ""
                                    }])
                                    setOptionFields(prev => prev.filter(i => i.id !== opt.id))
                                }} sx={{
                                    color: 'common.white'
                                }}>
                                    <DeleteOutlineRoundedIcon />
                                </IconButton>
                            </Box>
                        })}
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