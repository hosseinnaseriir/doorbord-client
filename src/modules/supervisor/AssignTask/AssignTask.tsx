import { Box, Button, Checkbox, Container, FormControlLabel, FormGroup, TextField } from "../../../packages/ui"
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterMomentJalaali } from '@mui/x-date-pickers/AdapterMomentJalaali';
import moment from 'moment-jalaali';
import { useState } from "react";
import { useCreateMission, useGetTechnicians } from "../../../packages/api";
import { useController, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const MISSION_SCHEMA = z.object({
    additionalTechnicianUsername: z.string().optional(),
    description: z.string(),
    missionDateTime: z.string().transform((value) => {
        const gregorianDate = moment(value, 'jYYYY/jMM/jDD').format('YYYY-MM-DDTHH:mm:ss');
        return gregorianDate;
    }),
    technicianIds: z.array(z.string().or(z.number())).optional(),
});

type MissionSchemaType = z.infer<typeof MISSION_SCHEMA>;

export const AssignTask = () => {
    const { id: submissionId } = useParams()
    const [other, setOther] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, control } = useForm<MissionSchemaType>({
        resolver: zodResolver(MISSION_SCHEMA),
    });
    const { data } = useGetTechnicians()
    const { mutateAsync } = useCreateMission()

    const {
        field: { onChange: techniciansOnChange, value: techniciansValue },
    } = useController({
        name: "technicianIds",
        control,
        defaultValue: [],
        rules: { required: 'این فیلد ضروری است' },
    });

    const handleTechnicianChange = (techId: string) => {
        if (!techniciansValue) return;
        const currentIndex = techniciansValue?.indexOf(techId);
        const newTechnicianIds = [...(techniciansValue ?? [])];

        if (currentIndex === -1) {
            newTechnicianIds.push(techId);
        } else {
            newTechnicianIds.splice(currentIndex, 1);
        }

        techniciansOnChange(newTechnicianIds);
    };

    return (
        <Container onSubmit={handleSubmit((data) => {
            console.log({ data });
            mutateAsync({
                ...data,
                submissionId,
            }).then(()=>{
                toast.success("ماموریت با موفقیت ارسال شد")
            })
        })} component="form" sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
        }}>
            <FormGroup>
                {
                    data?.technicians?.map((tech: any) => (
                        <FormControlLabel key={tech.id} control={
                            <Checkbox
                                checked={techniciansValue?.includes(tech.id)}
                                onChange={() => handleTechnicianChange(tech.id)}
                            />
                        } label={tech.firstName + " " + tech.lastName} />
                    ))
                }
                <FormControlLabel control={<Checkbox value={other} onChange={(_event) => {
                    <FormControlLabel control={<Checkbox />} label="تکنسین3" />
                    setOther(_event.target.checked)
                }} />} label="دیگر" />
            </FormGroup>
            {other &&
                <TextField {...register("additionalTechnicianUsername")} label="نام کاربری" />}
            <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
                {/* @ts-ignore */}
                <DateTimePicker
                    sx={{
                        '& *': {
                            color: t => t.palette.common.white
                        }
                    }}
                    label="تاریخ و ساعت مراجعه"
                    {...register("missionDateTime")}
                    defaultValue={moment(new Date())}
                />
            </LocalizationProvider>
            <TextField
                {...register("description")}
                multiline rows={4} label="توضیحات تکمیلی ماموریت" />
            <Box>
                <Button type="submit" fullWidth>
                    ارسال به تکنسین
                </Button>
            </Box>
        </Container>
    )
}