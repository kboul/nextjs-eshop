const getAdminEmails = () =>
  process.env.NEXT_PUBLIC_ADMIN_EMAILS ? process.env.NEXT_PUBLIC_ADMIN_EMAILS.split(",") : [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getIsAdmin = (isSignedIn: boolean | undefined, user: any | null | undefined, adminEmails: string[]) => {
  return isSignedIn && user?.primaryEmailAddress?.emailAddress
    ? adminEmails.includes(user.primaryEmailAddress.emailAddress)
    : false;
};

export { getAdminEmails, getIsAdmin };
