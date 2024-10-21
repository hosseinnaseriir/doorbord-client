import { useGetAllTasks } from "../../../packages/api"
import { Box } from "../../../packages/ui"
import { TaskListItem } from "../widgets"

export const ManagementHomeModule = () => {

    const { data } = useGetAllTasks()
    console.log(data)
    return (
        <Box component='ul' sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2
        }}>
            {
                data?.map(task => (
                    <TaskListItem
                        icon={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.333 6.5415H13.333C12.9913 6.5415 12.708 6.25817 12.708 5.9165C12.708 5.57484 12.9913 5.2915 13.333 5.2915H18.333C18.6747 5.2915 18.958 5.57484 18.958 5.9165C18.958 6.25817 18.6747 6.5415 18.333 6.5415Z" fill="#FF6000" />
                            <path d="M5.00033 6.5415H1.66699C1.32533 6.5415 1.04199 6.25817 1.04199 5.9165C1.04199 5.57484 1.32533 5.2915 1.66699 5.2915H5.00033C5.34199 5.2915 5.62533 5.57484 5.62533 5.9165C5.62533 6.25817 5.34199 6.5415 5.00033 6.5415Z" fill="#FF6000" />
                            <path d="M8.33366 9.45833C6.38366 9.45833 4.79199 7.86667 4.79199 5.91667C4.79199 3.96667 6.38366 2.375 8.33366 2.375C10.2837 2.375 11.8753 3.96667 11.8753 5.91667C11.8753 7.86667 10.2837 9.45833 8.33366 9.45833ZM8.33366 3.625C7.06699 3.625 6.04199 4.65 6.04199 5.91667C6.04199 7.18333 7.06699 8.20833 8.33366 8.20833C9.60033 8.20833 10.6253 7.18333 10.6253 5.91667C10.6253 4.65 9.60033 3.625 8.33366 3.625Z" fill="#FF6000" />
                            <path d="M18.3333 15.7085H15C14.6583 15.7085 14.375 15.4252 14.375 15.0835C14.375 14.7418 14.6583 14.4585 15 14.4585H18.3333C18.675 14.4585 18.9583 14.7418 18.9583 15.0835C18.9583 15.4252 18.675 15.7085 18.3333 15.7085Z" fill="#FF6000" />
                            <path d="M6.66699 15.7085H1.66699C1.32533 15.7085 1.04199 15.4252 1.04199 15.0835C1.04199 14.7418 1.32533 14.4585 1.66699 14.4585H6.66699C7.00866 14.4585 7.29199 14.7418 7.29199 15.0835C7.29199 15.4252 7.00866 15.7085 6.66699 15.7085Z" fill="#FF6000" />
                            <path d="M11.6667 18.6248C9.71667 18.6248 8.125 17.0332 8.125 15.0832C8.125 13.1332 9.71667 11.5415 11.6667 11.5415C13.6167 11.5415 15.2083 13.1332 15.2083 15.0832C15.2083 17.0332 13.6167 18.6248 11.6667 18.6248ZM11.6667 12.7915C10.4 12.7915 9.375 13.8165 9.375 15.0832C9.375 16.3498 10.4 17.3748 11.6667 17.3748C12.9333 17.3748 13.9583 16.3498 13.9583 15.0832C13.9583 13.8165 12.9333 12.7915 11.6667 12.7915Z" fill="#FF6000" />
                        </svg>}
                        title={task?.title} />
                ))
            }
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A corrupti quia eum nam vero veniam, eius assumenda illo quis nobis earum animi itaque suscipit cumque ipsum quidem quam facere magni.
        </Box>
    )
}

