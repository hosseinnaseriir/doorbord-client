import { Button } from "../../../../../packages";
import React from "react";
import { Dialog, DialogTitle, DialogActions } from "../../../../../packages";
import { useDeleteTaskField, useGetAllTaskFields } from "../../../../../packages/api";

export const DeleteFieldModule: React.FC<{ openDeleteTask: any; setOpenDeleteTask: any }> = (props) => {
    const { mutateAsync: destroyTaskFieldMutate, isPending } = useDeleteTaskField()
    const { refetch: refetchAllTaskFields } = useGetAllTaskFields();

    return (

        <Dialog
            open={!!props.openDeleteTask}
            onClose={() => props.setOpenDeleteTask('null')}
        >
            <DialogTitle sx={{
                color: t => t.palette.common.white
            }}>
                آیا از حذف این مورد اطمینان دارید؟
            </DialogTitle>

            <DialogActions sx={{
                display: 'flex',
                gap: 2
            }}>
                <Button color="secondary" variant="outlined" onClick={() => props.setOpenDeleteTask('')}>انصراف</Button>
                <Button disabled={isPending} onClick={() => {
                    destroyTaskFieldMutate(props.openDeleteTask).then(() => {
                        refetchAllTaskFields()
                        props.setOpenDeleteTask('')
                    })
                }} autoFocus>
                    بله
                </Button>
            </DialogActions>
        </Dialog>
    )
}