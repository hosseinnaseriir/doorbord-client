import React, { ReactNode } from "react"
import { ButtonBase, Typography, Divider } from "../../../../packages/ui"
import { Link } from "react-router-dom";


type TaskListItemProps = {
    icon?: ReactNode;
    title: ReactNode;
    link: string;

}

export const TaskListItem: React.FC<TaskListItemProps> = (props) => {
    return (
        <Link to={props.link}>
            <ButtonBase LinkComponent="ul" sx={{
                width: '100%',
                py: 2,
                px: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                border: t => `1px solid ${t.palette.secondary.main}`,
                borderRadius: '90px'
            }}>
                {props.icon}

                <Divider orientation="vertical" flexItem sx={{
                    alignSelf: 'center',
                    height: 20,
                    backgroundColor: t => t.palette.secondary.main
                }} />
                <Typography sx={{ flex: 1, textAlign: 'start' }} variant="body2">
                    {props.title}
                </Typography>

                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5415 3.9001L7.1082 9.33343C6.46654 9.9751 6.46654 11.0251 7.1082 11.6668L12.5415 17.1001" stroke="#A9A9A9" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </ButtonBase>
        </Link>
    )
}