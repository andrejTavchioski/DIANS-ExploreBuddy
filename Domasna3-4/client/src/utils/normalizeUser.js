export const normalizeUser = (data) => ({
    email: data.sub,
    role: data.roles[0] ?? 'ROLE_USER',
    exp: data.exp
});