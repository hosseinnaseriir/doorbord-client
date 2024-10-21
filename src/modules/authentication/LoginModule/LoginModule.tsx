import { Container, Box, Button, TextField } from "../../../packages/ui"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../../../packages/api";
import { AuthenticationLayout } from "../AuthenticationLayout/AuthenticationLayout";


const LOGIN_SCHEMA = z.object({
    username: z.string().min(2, "نام کاربری را وارد کنید"),
    password: z.string().min(2, "رمز عبور را وارد کنید"),
});

type LoginSchemaType = z.infer<typeof LOGIN_SCHEMA>;

export const LoginModule = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(LOGIN_SCHEMA),
    });
    const { mutate, isPending } = useLogin()

    const onSubmit = (data: LoginSchemaType) => {
        mutate(data)
    };

    return (
        <>
            <AuthenticationLayout>
                <Container
                    onSubmit={handleSubmit(onSubmit)}
                    component="form"
                    sx={{
                        marginTop: -2
                    }} maxWidth="sm">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <TextField
                            error={!!errors.username?.message}
                            helperText={errors.username?.message}
                            {...register("username")} label="نام کاربری" />
                        <TextField
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                            {...register("password")} label=" رمز عبور" />
                    </Box>
                    <Button disabled={isPending} type="submit" fullWidth sx={{ mt: 5, mb: 7 }}>ورود</Button>
                </Container>
            </AuthenticationLayout>
        </>
    )
}

