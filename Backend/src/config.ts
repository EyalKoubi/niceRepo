import env from 'env-var';
export const PORT = env.get('SERVER_PORT').default(9000).asPortNumber();