import { useState } from "react";
import { Box, Button, Drawer, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "../../../packages";
import { useGetAllTasks } from "../../../packages/api";
import { CreateTaskModule, DeleteTaskModule } from "./partials";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export const AdminTasksModules = () => {

    const [openCreateTask, setOpenCreateTask] = useState<boolean>(false)
    const [openDeleteTask, setOpenDeleteTask] = useState<string>('')
    const { data } = useGetAllTasks();

    return (
        <Box sx={{
            p: 1,
            minHeight: '100vh',
            backgroundColor: 'background.paper'
        }}>
            <Drawer onClose={() => setOpenCreateTask(false)} anchor="bottom" open={openCreateTask}>
                <CreateTaskModule title="ایجاد ماموریت جدید" />
            </Drawer>

            <DeleteTaskModule openDeleteTask={openDeleteTask} setOpenDeleteTask={setOpenDeleteTask} />

            <Box>
                <Button onClick={() => setOpenCreateTask(true)}>ایجاد ماموریت جدید</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{
                    minWidth: 650,
                    '& .MuiTableCell-root': { color: t => t.palette.common.white }
                }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>تایتل</TableCell>
                            <TableCell>کلید</TableCell>
                            <TableCell>دسترسی</TableCell>
                            <TableCell>دسته بندی</TableCell>
                            <TableCell>فیلد ها</TableCell>
                            <TableCell> عملیات</TableCell>
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
                                <TableCell>{row.key}</TableCell>
                                <TableCell>{row.permissions?.map((permission: any) => permission.name + ',')}</TableCell>
                                <TableCell>{row.categories?.map((category: any) => category.name + ',')}</TableCell>
                                <TableCell>{row.fields?.map((field: any) => field.title + ',')}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setOpenDeleteTask(row.id)}>
                                        <DeleteOutlineOutlinedIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
