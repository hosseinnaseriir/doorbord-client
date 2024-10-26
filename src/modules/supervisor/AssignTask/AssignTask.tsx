import { Box, Button, TextField } from "../../../packages/ui"
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import moment from 'moment-jalaali';

export const AssignTask = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,

        }}>

            <TextField label="نام کاربری" />
            <TextField label="تاریخ مراجعه" />
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                <DateTimePicker
                    sx={{
                        '& *': {
                            color: t => t.palette.common.white
                        }
                    }}
                    label="تاریخ و ساعت مراجعه"
                    defaultValue={moment(new Date())}
                />
            </LocalizationProvider>
            <TextField multiline rows={4} label="توضیحات تکمیلی ماموریت" />
            <Box>
                <Button fullWidth>
                    ارسال به تکنسین
                </Button>
            </Box>
        </Box>
    )
}