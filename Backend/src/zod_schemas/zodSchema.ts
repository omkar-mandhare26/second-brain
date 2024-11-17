import z from "zod";

const userSchema = z.object({
    username: z.string().min(3, "Username should be at least 3 letters").max(10, "Username should be maximum 10 letters"),

    password: z
        .string()
        .min(8, "Password should be at least 8 characters")
        .max(20, "Password should be maximum 20 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppsercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character")
});

export default userSchema;
