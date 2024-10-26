import { Box, ButtonBase, Typography } from "../../../../../packages/ui";
import { useGetAllTaskSubmittions } from "../../../../../packages/api"
import { format } from "date-fns-jalali";
import { useState } from "react";
import { TaskDetails } from "./partials";

export const TasksHistory = () => {
    const { data } = useGetAllTaskSubmittions();

    const [openRequestDrawer, setOpenRequestDrawer] = useState<any>(false)

    return (<>
        <Typography variant="body1">
            درخواست های ثبت شده
        </Typography>
        <TaskDetails openRequestDrawer={openRequestDrawer} setOpenRequestDrawer={setOpenRequestDrawer} />
        <Box sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            listStyle: 'none'
        }} component="ul">
            {
                data?.map((task: any) => (
                    <Box
                        onClick={() => {
                            setOpenRequestDrawer(task)
                        }}
                        sx={{
                            p: 1.5,
                            backgroundColor: 'secondary.dark',
                            borderRadius: 2,
                            borderInlineStart: t => `3px solid ${t.palette.primary.main}`
                        }} key={task.id} component="li">
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1
                        }}>
                            <Typography>فرم {task?.task?.title}</Typography>
                            <Box>
                                <ButtonBase>
                                    <Typography color="primary">جزییات</Typography>
                                </ButtonBase>
                            </Box>
                        </Box>
                        <Box sx={{
                            pt: 1,
                            display: 'flex',
                            gap: 1,
                            alignItems: 'start'
                        }}>
                            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.33398 1.8335V3.8335" stroke="#F0EBD8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M10.666 1.8335V3.8335" stroke="#F0EBD8" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M2.33398 6.56006H13.6673" stroke="#F0EBD8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 6.16683V11.8335C14 13.8335 13 15.1668 10.6667 15.1668H5.33333C3 15.1668 2 13.8335 2 11.8335V6.16683C2 4.16683 3 2.8335 5.33333 2.8335H10.6667C13 2.8335 14 4.16683 14 6.16683Z" stroke="#F0EBD8" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.99764 9.63314H8.00363" stroke="#F0EBD8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.52889 9.63314H5.53488" stroke="#F0EBD8" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M5.52889 11.6331H5.53488" stroke="#F0EBD8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>
                                <Typography variant="caption">{
                                    format(new Date(task?.submittedAt ?? null), "yyyy MMMM d")
                                }</Typography>
                                <Typography sx={{ display: 'block' }} variant="caption" >
                                    {task?.status === "BACKLOG" ? 'در انتظار انجام' : "درحال رسیدگی"}
                                </Typography>
                            </Box>
                        </Box>

                    </Box>
                ))
            }

        </Box>
    </>)
}