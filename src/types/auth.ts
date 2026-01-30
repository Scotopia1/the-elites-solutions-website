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

// Note: JWT types in next-auth v5 beta may have different module paths
// Commenting out to avoid build errors - update when next-auth v5 is stable
// declare module 'next-auth/jwt' {
//   interface JWT {
//     id: string;
//     role: 'admin' | 'editor';
//   }
// }
