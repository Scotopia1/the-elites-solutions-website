import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'admin' | 'editor';
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'editor';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'admin' | 'editor';
  }
}
