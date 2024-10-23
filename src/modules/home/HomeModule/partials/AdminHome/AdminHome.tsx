import { ROUTES } from "../../../../../app"
import { Box, Button } from "../../../../../packages/ui"

export const AdminHome = () => {

    return (
        <Box sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box sx={{
                p: 2,
                px: 4,
                borderRadius: 2,
                border: t => `1px dashed ${t.palette.primary.main}`
            }}>
                <Button href={ROUTES.HOME.MANAGEMENT()}>ایجاد ماموریت</Button>
            </Box>
        </Box>
    )
}

