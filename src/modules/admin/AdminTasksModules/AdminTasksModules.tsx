import { Box, Button, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "../../../packages";
import { CreateTaskPayload, useCreateTask, useGetAllTasks } from "../../../packages/api";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const TASK_SCHEMA = z.object({
    title: z.string().min(2, "این فیلد ضروری است"),
    key: z.string().min(2, "این فیلد ضروری است"),
    category: z.any(),
    permissionIds: z.any(),
    fieldIds: z.any(),
});

type TaskSchemaType = z.infer<typeof TASK_SCHEMA>;

export const AdminTasksModules = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm<TaskSchemaType>({
        resolver: zodResolver(TASK_SCHEMA),
    });

    const { data } = useGetAllTasks();

    const { mutate } = useCreateTask()

    const {
        field: { onChange: categoryOnChange, value: categoryValue },
    } = useController({
        name: "category",
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
        mutate(data)
    }

    return (
        <Box sx={{
            p: 1,
            minHeight: '100vh',
            backgroundColor: 'background.paper'
        }}>
            <Box component="form"
                onSubmit={handleSubmit(handleCreateNewTask)}>
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
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{
                    minWidth: 650,
                    '& .MuiTableCell-root': { color: t => t.palette.common.white }
                }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>تایتل</TableCell>
                            <TableCell >کلید</TableCell>
                            <TableCell >دسترسی</TableCell>
                            <TableCell >دسته بندی</TableCell>
                            <TableCell >فیلد ها</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row: any) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell >{row.key}</TableCell>
                                <TableCell >{row.permissions?.map((permission: any) => permission.name + ',')}</TableCell>
                                <TableCell >{row.category?.name}</TableCell>
                                <TableCell >{row.fields?.map((field: any) => field.title + ',')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
