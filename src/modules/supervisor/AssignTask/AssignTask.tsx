import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, TextField } from "../../../packages/ui"
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import moment from 'moment-jalaali';
import { useState } from "react";

export const AssignTask = () => {


    const [other, setOther] = useState<boolean>(false)

    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,

        }}>

            <FormGroup>
                <FormControlLabel control={<Checkbox />} label="تکنسین1" />
                <FormControlLabel control={<Checkbox />} label="تکنسین2" />
                <FormControlLabel control={<Checkbox />} label="تکنسین3" />
                <FormControlLabel control={<Checkbox value={other} onChange={(_event) => {
                    setOther(_event.target.checked)
                }} />} label="دیگر" />
            </FormGroup>
            {other &&
                <TextField label="نام کاربری" />}
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
        </Container>
    )
}