import React from "react";
import { Box, Button, Container, Drawer, IconButton, Typography } from "../../../../../../../packages/ui";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../../../../app";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useDeleteTaskSubmissionById, useGetAllTaskSubmittions, useGetProfileRole } from "../../../../../../../packages/api";

export const TaskDetails: React.FC<{
    openRequestDrawer: any; setOpenRequestDrawer: any;
}> = (props) => {
    const { isSuperAdmin } = useGetProfileRole()
    const { mutateAsync: deleteTaskSubmittionMutate, isPending } = useDeleteTaskSubmissionById();
    const { refetch } = useGetAllTaskSubmittions()

    return (
        <Drawer anchor="bottom" onClose={() => {
            props.setOpenRequestDrawer(false)
        }} open={!!props.openRequestDrawer}>
            <Container maxWidth="sm" sx={{
                pt: 2,
                pb: 5
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Typography mb={2} variant="h5">فرم {props.openRequestDrawer?.task?.title} </Typography>
                    {isSuperAdmin && <IconButton
                        disabled={isPending}
                        onClick={() => {
                            deleteTaskSubmittionMutate(props.openRequestDrawer?.id).then(() => {
                                refetch();
                                props.setOpenRequestDrawer(false)
                            })
                        }}
                        sx={{
                            color: 'error.main'
                        }}>
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>}
                </Box>
                {
                    props.openRequestDrawer?.fieldValues?.map((field: any) => (
                        <Box sx={{

                            display: 'flex',
                            justifyContent: 'space-between',
                            borderBottom: t => `1px solid ${t.palette.common.white}`,
                            '&>*': {
                                py: 1.5,
                            }
                        }} key={field.id}>
                            <Typography> {field?.field?.title} </Typography>
                            <Typography fontWeight={300}> {field?.value} </Typography>

                        </Box>
                    ))
                }

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    '&>*': {
                        flex: 1,
                    },
                    mt: 3,
                }}>
                    <Link to={ROUTES.SUPERVISOR.ROOT + `/${props.openRequestDrawer?.id}`}>
                        <Button fullWidth>تایید و ادامه</Button>
                    </Link>
                    <Button color="secondary" variant="outlined" onClick={() => {
                        props.setOpenRequestDrawer(false)
                    }} >انصراف</Button>
                </Box>
            </Container>
        </Drawer>)
}