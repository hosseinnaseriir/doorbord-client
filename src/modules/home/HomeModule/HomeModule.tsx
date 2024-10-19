import { useGetAllTasks } from "../../../packages/api"
import { Box } from "../../../packages/ui"

export const HomeModule = () => {

    const { data } = useGetAllTasks()
    console.log({ data })
    return (
        <Box sx={{
            p: 1,
            backgroundColor: 'background.default'
        }}>

        </Box>
    )
}

