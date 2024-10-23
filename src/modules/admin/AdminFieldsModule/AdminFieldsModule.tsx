import { useState } from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "../../../packages";
import { useGetAllTaskFields } from "../../../packages/api";
import { CreateFieldModule, DeleteFieldModule } from "./partials";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';

export const AdminFieldsModule = () => {

    const [openCreateTaskField, setOpenCreateTaskField] = useState<boolean>(false)
    const [openDeleteTask, setOpenDeleteTask] = useState<string>('')
    const { data } = useGetAllTaskFields();
    return (
        <Box sx={{
            p: 1,
            minHeight: '100vh',
            backgroundColor: 'background.paper'
        }}>

            <CreateFieldModule
                setOpenCreateTaskField={setOpenCreateTaskField}
                openCreateTaskField={openCreateTaskField}
                title="ایجاد فیلد جدید" />

            <DeleteFieldModule openDeleteTask={openDeleteTask} setOpenDeleteTask={setOpenDeleteTask} />

            <Box>
                <Button onClick={() => setOpenCreateTaskField(true)}>ایجاد فیلد جدید</Button>
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
                            <TableCell>نوع فیلد </TableCell>
                            <TableCell>الزامی</TableCell>
                            <TableCell>گزینه ها</TableCell>
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
                                <TableCell>{row.type?.name}</TableCell>
                                <TableCell>{row.required ? "+" : "-"}</TableCell>
                                <TableCell>{row.options?.map((opt: any) => opt.title + ',')}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => setOpenDeleteTask(row.id)}>
                                        <DeleteOutlineOutlinedIcon color="error" />
                                    </IconButton>
                                    <IconButton onClick={() => setOpenCreateTaskField(row)}>
                                        <CreateRoundedIcon color="info"  />
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
