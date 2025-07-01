/* 
  Parallel routes need default.tsx files as fallbacks
  When you don't have default.tsx, Next.js can't resolve what to
  render for unmatched routes
  The layout introduction changed the routing resolution order  
*/

export default function Default() {
  return null;
}
