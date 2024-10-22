import { Button } from "../../../../../packages";
import React from "react";
import { Dialog, DialogTitle, DialogActions } from "../../../../../packages";
import { useDestroyTask, useGetAllTasks } from "../../../../../packages/api";


export const DeleteTaskModule: React.FC<{ openDeleteTask: any; setOpenDeleteTask: any }> = (props) => {
    const { mutateAsync: destroyTaskMutate, isPending } = useDestroyTask()
    const { refetch: refetchAllTasks } = useGetAllTasks();

    return (

        <Dialog
            open={!!props.openDeleteTask}
            onClose={() => props.setOpenDeleteTask('null')}
        >
            <DialogTitle sx={{
                color: t => t.palette.common.white
            }}>
                آیا از حذف این موزد اطمینان دارید؟
            </DialogTitle>

            <DialogActions sx={{
                display: 'flex',
                gap: 2
            }}>
                <Button color="secondary" variant="outlined" onClick={() => props.setOpenDeleteTask('')}>انصراف</Button>
                <Button disabled={isPending} onClick={() => {
                    destroyTaskMutate(props.openDeleteTask).then(() => {
                        refetchAllTasks()
                        props.setOpenDeleteTask('')
                    })
                }} autoFocus>
                    بله
                </Button>
            </DialogActions>
        </Dialog>
    )
}