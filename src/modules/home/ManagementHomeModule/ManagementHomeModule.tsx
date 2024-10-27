import { useState } from "react"
import { Box, Container, Tabs, Tab } from "../../../packages/ui"
import { CustomTabPanel, TasksHistory, TasksList } from "./partials"
import { useGetProfileRole } from "../../../packages/api";


export const ManagementHomeModule = () => {
    const [tabvalue, setTabValue] = useState(0);

    const { isSupervisor, isPending } = useGetProfileRole()

    if (isSupervisor || isPending) return (<Container>
        <TasksHistory />
    </Container>)


    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    return (
        <Container maxWidth="sm">
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs sx={{
                        '& button': {
                            color: t => t.palette.common.white
                        }
                    }} value={tabvalue} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="لیست ماموریت ها" value={0} />
                        <Tab label="تاریخچه ماموریت ها" value={1} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabvalue} index={0}>
                    <TasksList />
                </CustomTabPanel>
                <CustomTabPanel value={tabvalue} index={1}>
                    <TasksHistory />
                </CustomTabPanel>
            </Box>


        </Container>
    )
}

