export const getBaseUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_BASE_URL || "https://job-portal-production-1812.up.railway.app" as string;
}