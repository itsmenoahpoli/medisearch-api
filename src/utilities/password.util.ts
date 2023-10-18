import bcrypt from "bcrypt";

export const hashPassword = async (rawPassword: string): Promise<string> => {
	return await bcrypt.hash(rawPassword, 15);
};

export const verifyPassword = async (rawPassword: string, hashedPassword: string): Promise<boolean> => {
	return await bcrypt.compare(rawPassword, hashedPassword);
};